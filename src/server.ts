import express from "express";
import cors from "cors";
import {config as environment} from "dotenv";
import {AuthRoutes, UsersRoutes} from "./routes";
import {connection} from "./orm/connection";

// Environment set-up
environment({path: __dirname + '/.env'});

// Initialize express application
const app = express();

// CORS
const corsHandler = cors({origin: true});
app.use(corsHandler);

// Auth
// app.use(Auth.initialize());

// API Routes
app.use('/auth', AuthRoutes);
app.use('/users', UsersRoutes);

// Lift server
const APP_NAME = process.env.APP_NAME;
const PORT = process.env.PORT;
app.listen(PORT, async () => {
    try {
        // connect to database
        await connection.connect();
        // server started
        console.log(`${APP_NAME} started listening on port ${PORT}`);
    } catch (error) {
        console.error(error);
    }
});
