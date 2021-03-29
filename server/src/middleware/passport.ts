import { User } from '../models/User';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import bcrypt from 'bcryptjs';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth20';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email: string, password: string, done) => {
            const user = await User.findOne({ email: email });
            if (!user) return done(null, false, { message: 'Użytkownik/czka o podanym identyfikatorze nie istnieje' });

            bcrypt.compare(password, user.password, (error, isValid) => {
                if (error) throw error;
                if (!isValid) {
                    return done(null, false, { message: 'Nieprawidłowy email lub hasło' });
                } else {
                    return done(null, user);
                }
            });
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: (req) => req.cookies.jwt,
            secretOrKey: process.env.JWT_PRIVATE_KEY || 'privateKey'
        },
        async (jwt_payload, done) => {
            const userById = await User.findById(jwt_payload._id);
            if (userById) return done(null, userById);
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_API_CLIENT || 'google_client',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'google_secret',
            callbackURL: '/api/google/redirect'
        },
        async (accessToken, refreshToken, profile, done) => {
            const userGoogle = await User.findOne({ googleId: profile.id });
            if (userGoogle) {
                done(null, userGoogle);
            } else {
                const newUser = await new User({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id
                }).save();
                done(null, newUser);
            }
        }
    )
);
