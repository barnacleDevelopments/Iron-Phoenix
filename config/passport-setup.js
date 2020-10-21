const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./keys");
const User = require("../server/models/user");
import bcrypt from "bcrypt";
const saltRounds = 10;

// passport serialize User
passport.serializeUser(function(user, done) {
    done(null, user);
});

// passport deserialize User
passport.deserializeUser(function(user, done) {
    done(null, JSON.stringify(user));
});

// passport google auth 
passport.use(new GoogleStrategy( {
    //options for the Google Strategy
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret,
    callbackURL: 'http://localhost:5000/auth/google/redirect'
}, function(accessToken, refreshToken, profile, done){
    // passport callback function
    console.log(profile);
}));

// passport local-login
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField : 'password',
    passReqToCallback : true 
},function(req, email, password, done) {
    User.findOne({
            email: email 
    }).then(async function(user, err) {
        
        let isMatch = await bcrypt.compare(password, user.password);

        if (!user){
            console.log("no user found");
            return done(null, false, req.flash('loginMessage', 'No user found.')); 
        }

        if(user && isMatch){
            return done(null, user);
        }else{
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }    
    });
}));

// passport signup for users
passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField : 'password',
    passReqToCallback : true
}, function(req, email, password, done) {
    process.nextTick(function() {
        User.findOne({
                email: email
        }).then(async function(user, err){
            if(err) {
                console.log("err",err)
                return done(err);
            } 
            
            if (user) {
                console.log('signupMessage', 'That email is already taken.');
                return done(null, false, {'message': 'That email is already taken.'});
            } else {

                password = await bcrypt.hash(password, saltRounds);

                User.create({
                            firstName:req.body.firstName,
                            lastName:req.body.lastName,
                            address: req.body.address,
                            email: email,
                            contactNumber: req.body.contactNumber,
                            role: "user", 
                            password: password
                }).then(function(data) {
                    return done(null, data, {'message': 'Sign up was successful!!'});
                }).catch(function(err) { 
                    console.log(err);
                }); 
                
            }
        });   
    });
}));
