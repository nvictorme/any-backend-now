import express, {Request, Response} from "express";
import cors from "cors";
import {config as environment} from "dotenv";
import Auth from "./middleware/auth";

// Environment set-up
environment({path: __dirname + '/.env'});

// Initialize express application
const app = express();

// CORS
const corsHandler = cors({origin: true});
app.use(corsHandler);

// Auth
// app.use(Auth.initialize());

// Routes
app.get("/", (req: Request, res: Response) => {
    const now = new Date().toLocaleString();
    res.status(200).json({now});
});

// Lift server
const APP_NAME = process.env.APP_NAME;
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`${APP_NAME} started listening on port ${PORT}`);
});
