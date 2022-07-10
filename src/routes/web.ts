import {Request, Response, Router} from "express";

const WebRoutes: Router = Router();

WebRoutes.get("/", (req: Request, res: Response) => {
    const message = `Welcome to ${process.env.APP_NAME}`;
    res.status(200).render("home", {message});
});

WebRoutes.get("/users", (req: Request, res: Response) => {
    const message = `List of users`;
    res.status(200).render("home", {message});
});

export {WebRoutes};
