import {Request, Response, Router} from "express";
import Auth from "../middleware/auth";
import {deriveJWT} from "../helpers/encryption";

const AuthRoutes: Router = Router();

AuthRoutes.post("/login", Auth.authenticate("local", { session: false }), (req: Request, res: Response) => {
    try {
        const {user} = req;
        const token = deriveJWT({ user });
        res.status(200).json({token});
    } catch (error: any) {
        console.error(error);
        res.status(403).json({error: error.message});
    }
});

export {AuthRoutes};
