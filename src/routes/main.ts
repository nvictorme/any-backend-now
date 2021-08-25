import {Request, Response, Router} from "express";

const MainRoutes: Router = Router();

MainRoutes.get("/", (req: Request, res: Response) => {
    const message = `Welcome to ${process.env.APP_NAME}`;
    const now = new Date().toLocaleString();
    res.status(200).json({message, now});
});

export {MainRoutes};
