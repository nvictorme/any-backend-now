import jwt from "jsonwebtoken";
import {createHmac, createHash} from "crypto";

export const isValidPassword = (password: string) => {
    return /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i.test(password);
}

export const encryptPassword = (pwd: string): string => {
    return createHmac("sha256", pwd).digest("hex");
}

export const hashWithMD5 = (value: string): string => {
    return createHash("md5").update(value).digest("hex");
}

export const deriveAccessToken = (payload: any) => {
    // Expires in 10 minutes "10m"
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET ?? "super_secret", {expiresIn: "10m"});
}

export const deriveRefreshToken = (payload: any) => {
    // Refresh tokens do NOT expire
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET ?? "super_secret");
}

export const deriveResetToken = (payload: any) => {
    // Expires in 15 minutes "15m"
    return jwt.sign(payload, process.env.JWT_RESET_SECRET ?? "super_secret", {expiresIn: "15m"});
}

export const decodeToken = (token: string) => {
    return jwt.decode(token)
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET ?? "super_secret");
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET ?? "super_secret");
}

export const verifyResetToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_RESET_SECRET ?? "super_secret");
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
