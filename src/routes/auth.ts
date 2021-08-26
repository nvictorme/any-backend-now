import {Request, Response, Router} from "express";
import Auth from "../middleware/auth";

const AuthRoutes: Router = Router();

AuthRoutes.post("/login", Auth.authenticate('local'), (req: Request, res: Response) => {
    try {
        const {body} = req;
        res.status(200).json(body);
    } catch (error: any) {
        console.error(error);
        res.status(403).json({error: error.message});
    }
});

export {AuthRoutes};
