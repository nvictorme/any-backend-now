import {createHmac} from "crypto";

export const encryptPassword = (pwd: string): string => {
    return createHmac("sha256", pwd).digest("hex");
}
