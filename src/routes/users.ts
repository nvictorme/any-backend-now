import {Request, Response, Router} from "express";
import Auth from "../middleware/auth";

const UsersRoutes: Router = Router();

UsersRoutes.get("/", Auth.authenticate("jwt", { session: false }), (req: Request, res: Response) => {
    const message = "You'll find all the users here.";
    res.status(200).json({message});
});

UsersRoutes.get("/:userId", (req: Request, res: Response) => {
    const {userId} = req.params;
    const user = {userId}
    res.status(200).json({user});
});

export {UsersRoutes};
