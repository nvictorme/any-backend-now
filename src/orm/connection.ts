import {getConnectionManager, ConnectionManager, Connection} from "typeorm";

const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD
} = process.env;

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
    cache: {
        type: 'ioredis',
        options: {
            host: REDIS_HOST,
            port: parseInt(REDIS_PORT ?? "6379"),
            password: REDIS_PASSWORD
        },
        ignoreErrors: true
    },
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
