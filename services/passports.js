const passport = require('passport');
const GoogleStratgey = require('passport-google-oauth20').Strategy;
const LinkedInStratgey = require('passport-linkedin-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwtSecretKey;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);

// passport.use(
//   new LinkedInStratgey(
//     {
//       clientID: keys.linkedInClientID,
//       clientSecret: keys.linkedInClientSecret,
//       callbackURL: '/auth/linkedin/callback',
//       scope: ['r_emailaddress', 'r_basicprofile'],
//       state: true,
//       proxy: true
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const existingUser = await User.findOne({ linkedinId: profile.id });
//       if (existingUser) {
//         return done(null, existingUser);
//       }
//
//       const user = await new User({ linkedinId: profile.id }).save();
//       done(null, user);
//     }
//   )
// );

passport.use(
  new GoogleStratgey(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
