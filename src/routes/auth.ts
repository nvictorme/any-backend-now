import {Request, Response, Router} from "express";
import Auth from "../middleware/auth";
import {
    deriveResetToken,
    deriveTokens, encryptPassword,
    hashWithMD5, isValidPassword,
    ITokens,
    verifyRefreshToken, verifyResetToken
} from "../providers/encryption";
import {User} from "../orm/entity/user";
import {redis} from "../providers/redis";
import {emailPasswordResetLink} from "../providers/email";
import {AppDataSource} from "../orm";

const AuthRoutes: Router = Router();

const login = async (user: any, res: Response) => {
    const {accessToken, refreshToken}: ITokens = deriveTokens(user);
    // store refreshToken in redis
    await redis.set(user.id, refreshToken);
    res.status(200).json({accessToken, refreshToken});
}

const logout = async (user: any, res: Response) => {
    // delete refreshToken from redis
    await redis.del(user.id);
    res.status(204).json({message: "goodbye!"});
}

AuthRoutes.post("/register", async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({message: "invalid params"});
        const user: User = new User();
        user.email = email.toLowerCase();
        user.password = password;
        const newUser = await AppDataSource.getRepository(User).save(user);
        await login(newUser, res);
    } catch (e: any) {
        console.error(e.message);
        if (e["code"] === "ER_DUP_ENTRY") {
            return res.status(500).json({error: `An account with the email ${req.body.email} already exists.`});
        }
        res.status(500).json({error: e.message});
    }
});

AuthRoutes.post("/login", Auth.authenticate("local", {session: false}), async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        await login(user, res);
    } catch (e: any) {
        console.error(e.message);
        res.status(403).json({error: e.message});
    }
});

AuthRoutes.post("/logout", async (req: Request, res: Response) => {
    try {
        const {refreshToken} = req.body;
        // if there's no token, return 401
        if (!refreshToken) return res.status(401).json({message: "missing params"});
        // verify signature
        const verified: any = verifyRefreshToken(refreshToken);
        const {user} = verified;
        // compare user.id && tokens
        const storedRefreshToken = await redis.get(user.id);
        if (refreshToken !== storedRefreshToken) return res.status(403).json({message: "invalid token"});
        // logout user
        await logout(user, res);
    } catch (e: any) {
        console.error(e.message);
        res.status(403).json({error: e.message});
    }
});

AuthRoutes.post("/token", async (req: Request, res: Response) => {
    try {
        const {refreshToken} = req.body;
        // if there's no token, return 401
        if (!refreshToken) return res.status(401).json({message: "missing params"});
        // verify signature
        const verified: any = verifyRefreshToken(refreshToken);
        const {user} = verified;
        // compare user.id && tokens
        const storedRefreshToken = await redis.get(user.id);
        if (refreshToken !== storedRefreshToken) return res.status(403).json({message: "invalid token"});
        // otherwise, login to refresh both tokens
        await login(user, res);
    } catch (e: any) {
        console.error(e.message);
        res.status(403).json({error: e.message});
    }
});

AuthRoutes.put("/self", Auth.authenticate("jwt", {session: false}), async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const {profile} = req.body;
        const {displayName, firstName, lastName, bio, avatar, phone, country} = profile;
        const newData = {
            displayName,
            firstName,
            lastName,
            bio,
            avatar,
            phone,
            country,
        }
        const repo = AppDataSource.getRepository(User);
        await repo.update(user.id, newData);
        const current = await repo.findOneBy({id: user.id});
        res.status(200).json({profile: {...current, password: null}});
    } catch (e: any) {
        console.error(e.message);
        if (e.code === 'ER_DUP_ENTRY') {
            return res.status(500).json({error: e.message.split('for')[0] + ", display name is taken."});
        }
        res.status(500).json({error: e.message});
    }
});

AuthRoutes.post("/forgot", async (req: Request, res: Response) => {
    try {
        const {email} = req.body;
        if (!email) return res.status(400).json({error: "invalid params"});
        // find a user account
        const user = await AppDataSource.getRepository(User).findOneBy({email});
        if (!user) return res.status(404).json({error: "invalid params"});
        const resetToken = deriveResetToken({email});
        const hash = hashWithMD5(email);
        await redis.set(hash, resetToken);
        await emailPasswordResetLink(email, hash, resetToken);
        return res.status(200).json({message: `An email with a password reset link was sent to ${email}`});
    } catch (e: any) {
        console.error(e.message);
        res.status(500).json({error: e.message});
    }
});

AuthRoutes.post("/reset/:hash/:resetToken", async (req: Request, res: Response) => {
    try {
        const {hash, resetToken} = req.params;
        const {password, confirmation} = req.body;
        const storedToken = await redis.get(hash);
        const verified: any = verifyResetToken(resetToken);
        const {email} = verified;
        const emailHashConfirmation = hashWithMD5(email);
        // compare resetToken to the one stored in redis(hash)
        // also, compare the email hash
        if (
            resetToken !== storedToken
            || emailHashConfirmation !== hash
        ) return res.status(400).render("plain-message", {message: "There's an imposter among us!."});
        // check password and confirmation match
        if (password !== confirmation) return res.status(400).render("plain-message", {message: "Passwords don't match."});
        // check if password is secure enough
        if (!isValidPassword(password)) return res.status(400).render("plain-message", {message: "Password must be 8 characters long, contain AT LEAST 1 number, 1 uppercase letter and 1 lowercase letter."});
        // find a user with this email
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOneBy({email});
        // if there's no user, then return 404
        if (!user) return res.status(404).render("plain-message", {message: "User not found."});
        // otherwise, update the password
        await repo.update(user.id, {password: encryptPassword(password)});
        // and delete the resetToken from redis
        await redis.del(hash);
        return res.status(200).render("plain-message", {message: "Password updated successfully."});
    } catch (e: any) {
        console.error(e.message);
        await redis.del(req.params.hash);
        res.status(500).render("plain-message", {message: "This link expired. Please, request a new one."});
    }
});

export {AuthRoutes};
