/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * Auth API Routes
 *
 * @author Shaquille Lynch
 */

// Declare Variables
const express = require('express');
const router = express.Router();
const passport = require('passport');





router.post('/login', passport.authenticate('local', { 
    successRedirect: '/products',                 
    failureRedirect: '/login',
    successFlash: 'Welcome to Iron Phoenix Kitchen' ,
    failureFlash: 'Invalid username or password.'  
}));
/*
router.get('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/products'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/products' + user.username);
      });
    })(req, res, next);
  });

// auth login
router.get('/login', function (req, res) {
    res.render('login');
});    */

// auth logout
router.get('/logout', function (req, res) {
    // handle with passport
    res.send('logging out');
});    

// auth with google
router.get('/google', passport.authenticate('google', { 
    scope: ['profile'] 
}));

// callback route for google to redirect too
router.get('/google/redirect', function (req, res) {
    res.send("You're logged in!");
});    

module.exports = router;