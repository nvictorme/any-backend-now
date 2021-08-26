import {Request, Response, Router} from "express";
import {getRepository} from "typeorm";
import Auth from "../middleware/auth";
import {User} from "../orm/entity/user";

const AuthRoutes: Router = Router();

AuthRoutes.post("/login", async (req: Request, res: Response) => {
    try {
        const repository = getRepository(User);
        const user = await repository.findOne();
        // TODO: POST AUTH MIDDLEWARE LOGIC HERE
        res.status(200).json({user});
    } catch (e) {
        res.status(403).json({error: "unauthenticated"});
    }
});

export {AuthRoutes};
