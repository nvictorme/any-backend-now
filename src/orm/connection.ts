import {getConnectionManager, ConnectionManager, Connection} from "typeorm";
import {config as environment} from "dotenv";
import {User} from "./entity/user";
import {Address} from "./entity/address";
// Environment set-up
environment({path: __dirname + '/../.env'});

const connectionManager: ConnectionManager = getConnectionManager();

export const connection: Connection = connectionManager.create({
    name: "default",
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        __dirname + "/entity/*.js"
    ],
    migrations: [
        __dirname + "/migration/*.js"
    ],
    subscribers: [
        __dirname + "/subscriber/*.js"
    ]
});
