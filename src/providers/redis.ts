import ioredis from "ioredis";

enum IPFamily {
    IPv4 = 4,
    IPv6 = 6
}

const {REDIS_HOST, REDIS_PORT, REDIS_PASSWORD} = process.env;

const redis = new ioredis({
    port: parseInt(REDIS_PORT ?? "6379"), // Redis port, default 6379
    host: REDIS_HOST, // Redis host
    family: IPFamily.IPv4, // 4 (IPv4) or 6 (IPv6)
    password: REDIS_PASSWORD,
    db: 0, // positive integer number, default 0
});

export {redis};
