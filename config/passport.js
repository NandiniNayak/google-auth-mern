var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const keys = require("./keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = function (passport){
  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    proxy: true
  },
  // function(accessToken, refreshToken, profile, done) {
  //   console.log("----PASSPORT GOOGLE----", profile)
  //     User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //       console.log("USER is ------ ",user )
  //       return done(err, user);
  //     });
  // }
    (accessToken, refreshToken, profile, done) => {
      // console.log(accessToken);
      // console.log(profile);
      // use substring to end the photo at jpeg
      console.log("PROFILE", profile)
      const image = profile.photos[0].value.substring(
        0,
        profile.photos[0].value.indexOf("?")
      );
      console.log(image);
      // create user with info coming from google profile
      const newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      };
      // check for existing user
      User.findOne({
        googleID: profile.id
      }).then(user => {
        if (user) {
          // return the user already created
          done(null, user);
        } else {
          // create user and return it
          new User(newUser).save().then(user => done(null, user));
        }
      });
    }
  ));

  passport.serializeUser(function(user, done) {
  done(null, user);
  });

  passport.deserializeUser(function(user, done) {
  done(null, user);
  });
}