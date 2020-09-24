const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./keys");
const User = require("../server/models/user");

passport.serializeUser(function(user, done) {
    done(null, user.uuid);
});

passport.deserializeUser(function(uuid, done) {
    User.findById(uuid).then(function(user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
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
        where: {
            email: req.body.email 
        }
    }).then(function(user, err) {
        (!user.validPassword(req.body.account_key));
        if (!user){
            console.log("no user found");
            return done(null, false, req.flash('loginMessage', 'No user found.')); 
        }
        if (user && !user.validPassword(req.body.account_key)){
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
            where: {
                email: email
            }
        }).then(function(user, err){
            if(err) {
                console.log("err",err)
                return done(err);
            } 
            if (user) {
                console.log('signupMessage', 'That email is already taken.');
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                User.create({
                            firstName:req.body.first_name,
                            lastName:req.body.last_name,
                            address: req.body.address,
                            email: req.body.email,
                            contactNo: req.body.contactNo,
                            account_key: User.generateHash(account_key)
                }).then(function(dbUser) {
                    return done(null, dbUser);
                }).catch(function(err) { 
                    console.log(err);
                }); 
            }
        });   
    });
}));
