import jwt from "jsonwebtoken";
import {createHmac} from "crypto";

export const encryptPassword = (pwd: string): string => {
    return createHmac("sha256", pwd).digest("hex");
}

export const deriveAccessToken = (payload: any) => {
    // Expires in 15 minutes "15m"
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET ?? "super_secret", {expiresIn: "15m"});
}

export const deriveRefreshToken = (payload: any) => {
    // Refresh tokens do NOT expire
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET ?? "super_secret");
}

export const decodeToken = (token: string) => {
    return jwt.decode(token)
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token,process.env.JWT_ACCESS_SECRET ?? "super_secret");
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token,process.env.JWT_REFRESH_SECRET ?? "super_secret");
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export const deriveTokens = (user: any): ITokens => {
    if (!user) throw new Error("missing user");
    if (user.password) delete user.password;
    const accessToken = deriveAccessToken({user});
    const refreshToken = deriveRefreshToken({user});
    return {accessToken, refreshToken};
}
