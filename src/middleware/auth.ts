import Passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {
    Strategy as JwtStrategy,
    ExtractJwt,
} from "passport-jwt";
import {AppDataSource} from "../orm";
import {User} from "../orm/entity/user";
import {encryptPassword} from "../providers/encryption";

Passport.serializeUser(((user: any, done) => {
    done(null, user.id)
}))

Passport.deserializeUser((async (id: string, done) => {
    const user = await AppDataSource.getRepository(User).findOne({where: {id}, relations: ["privileges"]});
    done(null, user)
}))

// Local Strategy
Passport.use("local",

    new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
        },

        async (username, password, done) => {
            try {
                const user = await AppDataSource.getRepository(User).findOne({
                    where: {email: username},
                    relations: ["privileges"]
                });
                if (!user) return done(null, false, {message: "invalid params"});

                const hash = encryptPassword(password);
                if (hash !== user?.password) return done(null, false, {message: "invalid params"});
                // hide password from user dto
                return done(null, {...user, password: null});
            } catch (e) {
                return done(e);
            }

        })
);

// JWT Strategy - accessToken
Passport.use("jwt",

    new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_SECRET ?? "super_secret",
        },

        async (token, done) => {
            try {
                const user = await AppDataSource.getRepository(User).findOne({
                    where: {id: token.user.id},
                    relations: ["privileges"]
                });
                if (!user) return done(null, false);
                // hide password from user dto
                return done(null, {...user, password: null});
            } catch (e) {
                console.error(e);
                return done(e, false);
            }

        })
);

export default Passport;
