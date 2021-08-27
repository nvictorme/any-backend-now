import {getConnectionManager, ConnectionManager, Connection} from "typeorm";

const {MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE} = process.env;

const connectionManager: ConnectionManager = getConnectionManager();

export const connection: Connection = connectionManager.create({
    name: "default",
    type: "mysql",
    host: MYSQL_HOST,
    port: parseInt(MYSQL_PORT ?? "3306"),
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
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
