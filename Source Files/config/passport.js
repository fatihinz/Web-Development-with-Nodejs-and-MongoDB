import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/User';

const { Strategy, ExtractJwt } = passportJWT;

const secret = process.env.SECRET_OR_KEY || 'alskdjflkasfasdkljfj';
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

const strategy = new Strategy(options, function (payload, next) {
  User.findOne({ _id: payload.id }, function (err, result) {
    if (err) return next(err);

    return next(null, result);
  });
});

passport.use(strategy);

export default passport;
export { secret };
export const auth = passport.authenticate('jwt', { session: false });