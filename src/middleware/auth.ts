import Passport from "passport";
import {Strategy as LocalStrategy, IStrategyOptions as LocalOptions, VerifyFunctionWithRequest} from "passport-local";
import {
    Strategy as JwtStrategy,
    ExtractJwt,
    StrategyOptions as JwtOptions,
    VerifyCallbackWithRequest
} from "passport-jwt";

// Local Strategy
const localOptions: LocalOptions = {
    usernameField: "email",
    passwordField: "password",
};

Passport.use(new LocalStrategy(localOptions, (req => {
    // TODO: Verify user credentials
})));

// JWT Strategy
const jwtOptions: JwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.HOST,
};

Passport.use(new JwtStrategy(jwtOptions, ((payload, done) => {
    // TODO: Verify token
})));

export default Passport;
