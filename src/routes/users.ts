import {Request, Response, Router} from "express";
import Auth from "../middleware/auth";
import {AppDataSource} from "../orm";
import {User, userHasRole} from "../orm/entity/user";

const UsersRoutes: Router = Router();

UsersRoutes.get("/", Auth.authenticate("jwt", {session: false}), async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        if (!userHasRole(user, ["admin"])) {
            return res.status(403).json({message: "You have no power here!"});
        }
        const [users, count] = await AppDataSource.getRepository(User).findAndCount();
        res.status(200).json({count, users});
    } catch (e) {
        console.error(e);
    }
});

UsersRoutes.get("/:userId", Auth.authenticate("jwt", {session: false}), async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const user = await AppDataSource.getRepository(User).findOneBy({id: userId})
        if (!user) return res.status(404).json({message: `User not found.`});
        return res.status(200).json({user});
    } catch (e) {
        console.error(e);
        return res.status(500).json({error: "Upstream server error."});
    }
});

export {UsersRoutes};
