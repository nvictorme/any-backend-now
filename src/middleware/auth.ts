import Passport from "passport";
import {Strategy as LocalStrategy, IStrategyOptions as LocalOptions, VerifyFunctionWithRequest} from "passport-local";
import {
    Strategy as JwtStrategy,
    ExtractJwt,
    StrategyOptions as JwtOptions,
    VerifyCallbackWithRequest
} from "passport-jwt";
import {getRepository} from "typeorm";
import {User} from "../orm/entity/user";
import {encryptPassword} from "../helpers/encryption";

Passport.serializeUser(((user: any, done) => {
    done(null, user.id)
}))

Passport.deserializeUser((async (id: string, done) => {
    const user = await getRepository(User).findOne(id)
    done(null, user)
}))

// Local Strategy
const localOptions: LocalOptions = {
    usernameField: "email",
    passwordField: "password",
};

Passport.use(
    new LocalStrategy(localOptions,

        async (username, password, done) => {
            try {
                const user = await getRepository(User).findOne({email: username});
                if (!user) return done(null, false, {message: "invalid params"});

                const hash = encryptPassword(password);
                if (hash !== user?.password) return done(null, false, {message: "invalid params"});

                return done(null, user);
            } catch (error) {
                return done(error);
            }

        })
);

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
