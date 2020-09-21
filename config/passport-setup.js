const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../server/models/user");

passport.use(new GoogleStrategy({
    //options for the Google Strategy
    callbackURL: '/auth/google/redirect',
    clientId: keys.google.clientId,
    clientSecret: keys.google.clientSecret
}),(accessToken, refreshToken, profile, done)=> {
    // passport callback function
    console.log(profile);
});


/*Task 1 Monday =conncet with team member


2:30-3:00. Zoom Setup
All we can do right now really

*/