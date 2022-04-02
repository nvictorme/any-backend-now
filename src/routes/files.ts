import {Request, Response, Router} from "express";
import Auth from "../middleware/auth";
import {generateUploadUrl} from "../providers/aws";

const FilesRoutes: Router = Router();

FilesRoutes.get('/signed-url/:filename',
    Auth.authenticate("jwt", {session: false}),
    async (req: Request, res: Response) => {
        try {
            const {filename} = req.params;
            const uploadUrl: string|null = await generateUploadUrl(filename);
            if (!uploadUrl) throw new Error("Couldn't generate signed-url.")
            res.status(200).json({uploadUrl});
        } catch (e) {
            console.error(e);
            res.status(500).json({error: e.message});
        }
    })

export {FilesRoutes};
