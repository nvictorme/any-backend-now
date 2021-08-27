import {Request, Response, Router} from "express";
import Auth from "../middleware/auth";
import {decodeToken, deriveTokens, ITokens, verifyRefreshToken} from "../providers/encryption";
import {User} from "../orm/entity/user";
import {getRepository} from "typeorm";
import {redis} from "../providers/redis";

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

    res.status(200).json({message: "goodbye!"});
}

AuthRoutes.post("/register", async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({message: "invalid params"});
        const user: User = new User();
        user.email = email;
        user.password = password;
        const newUser = await getRepository(User).save(user);
        await login(newUser, res);
    } catch (e) {
        console.error(e.message);
        if (e["code"] === "ER_DUP_ENTRY") {
            return res.status(400).json({error: `user with email ${req.body.email} already exists`});
        }
        res.status(403).json({error: e.message});
    }
});

AuthRoutes.post("/login", Auth.authenticate("local", {session: false}), async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        await login(user, res);
    } catch (e) {
        console.error(e.message);
        res.status(403).json({error: e.message});
    }
});

AuthRoutes.post("/logout", Auth.authenticate("jwt", {session: false}), async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        await logout(user, res);
    } catch (e) {
        console.error(e.message);
        res.status(403).json({error: e.message});
    }
});

AuthRoutes.post("/token", Auth.authenticate("jwt", {session: false}), async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const {refreshToken} = req.body;
        // if there's no token, return 401
        if (!refreshToken) return res.status(401).json({message: "missing params"});

        // verify signature
        const verified: any = verifyRefreshToken(refreshToken);

        // compare user.id && tokens
        const storedRefreshToken = await redis.get(user.id);
        if (user.id !== verified.user.id || refreshToken !== storedRefreshToken) return res.status(403).json({message: "invalid token"});

        // otherwise, login to refresh both tokens
        await login(user, res);
    } catch (e) {
        console.error(e.message);
        res.status(403).json({error: e.message});
    }
});

export {AuthRoutes};
