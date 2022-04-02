// Top-Level Environment set-up
import {config as environment} from "dotenv";
environment({path: `${__dirname}/../.env.${process.env.ENV}`});
// DO NOT EDIT ABOVE THIS LINE

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "./swagger.json";

import Auth from "./middleware/auth";
import {AuthRoutes, UsersRoutes, FilesRoutes} from "./routes";
import {connection} from "./orm/connection";

// Initialize express application
const app = express();

// CORS, JSON, Headers & Logger
const corsHandler = cors({origin: true});
app.use(corsHandler)
    .use(express.urlencoded({extended: true})) // Support for Form URL Encoded Body
    .use(express.json()) // Support for JSON Body
    .use(helmet())
    .use(morgan("combined"));

// Auth
app.use(Auth.initialize());

// View engine
app.set("views", "./src/views");
app.set("view engine", "pug");

// API Routes
app.use('/auth', AuthRoutes);
app.use('/users', UsersRoutes);
app.use('/files', FilesRoutes);

// Swagger Route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Lift server
const {APP_NAME, PORT} = process.env;
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
