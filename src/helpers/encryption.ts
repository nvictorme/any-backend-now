import jwt from "jsonwebtoken";
import {createHmac} from "crypto";

export const encryptPassword = (pwd: string): string => {
    return createHmac("sha256", pwd).digest("hex");
}

export const deriveJWT = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET ?? "super_secret");
}
