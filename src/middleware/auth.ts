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
    secretOrKey: "MY_SUPER_SECRET_KEY",
    issuer: "NEUTRONIX.LLC",
    audience: "MY_HOST_URL",
};

Passport.use(new JwtStrategy(jwtOptions, ((payload, done) => {
    // TODO: Verify token
})));

export default Passport;
