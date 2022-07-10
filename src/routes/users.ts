import {Request, Response, Router} from "express";
import Auth from "../middleware/auth";
import {AppDataSource} from "../orm";
import {User, userHasPrivilege} from "../orm/entity/user";

const UsersRoutes: Router = Router();

UsersRoutes.get("/", Auth.authenticate("jwt", {session: false}), async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        if (!userHasPrivilege(user, {entity: User.name, action: "admin", value: true})) {
            return res.status(403).json({message: "You have no power here!"});
        }
        const [users, count] = await AppDataSource.getRepository(User)
            .findAndCount({
                relations: ["privileges"]
            })
        res.status(200).json({
            count, users: users.map(u => {
                const {password, ...safeUser} = u;
                return safeUser;
            })
        });
    } catch (e) {
        console.error(e);
    }
});

UsersRoutes.get("/:userId", Auth.authenticate("jwt", {session: false}), async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const user = await AppDataSource.getRepository(User)
            .findOne({where: {id: userId}, relations: ["privileges"]});
        if (!user) return res.status(404).json({message: `User not found.`});
        const {password, ...safeUser} = user;
        return res.status(200).json({user: safeUser});
    } catch (e) {
        console.error(e);
        return res.status(500).json({error: "Upstream server error."});
    }
});

export {UsersRoutes};
