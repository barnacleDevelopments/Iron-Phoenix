const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./keys");
const User = require("../server/models/user");

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy( {
    //options for the Google Strategy
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret,
    callbackURL: 'http://localhost:5000/auth/google/redirect'
}, function(accessToken, refreshToken, profile, done){
    // passport callback function
    console.log(profile);
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField : 'account_key',
    passReqToCallback : true 
},function(req, email, account_key, done) {
    User.findOne({
            email: email 
    }).then(function(user, err) {
        (user.account_key != account_key);
        if (!user){
            console.log("no user found");
            return done(null, false, req.flash('loginMessage', 'No user found.')); 
        }
        if (user && user.account_key != account_key){
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
        }
        return done(null, user);
    });
}));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField : 'account_key',
    passReqToCallback : true
}, function(req, email, account_key, done) {
    process.nextTick(function() {
        User.findOne({
                email: email
        }).then(function(user, err){
            if(err) {
                console.log("err",err)
                return done(err);
            } 
            
            if (user) {
                console.log('signupMessage', 'That email is already taken.');
                return done(null, false, {'message': 'That email is already taken.'});
            } else {
                User.create({
                            firstName:req.body.firstName,
                            lastName:req.body.lastName,
                            address: req.body.address,
                            email: email,
                            contactNumber: req.body.contactNumber,
                            account_key: account_key
                }).then(function(data) {
                    return done(null, data);
                }).catch(function(err) { 
                    console.log(err);
                }); 
            }
        });   
    });
}));
