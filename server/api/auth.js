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

// auth with google
router.get('/google', passport.authenticate('google', { 
    scope: ['profile'] 
}));

// callback route for google to redirect too
router.get('/google/redirect', function (req, res) {
    res.send("You're logged in!");
});    

module.exports = router;