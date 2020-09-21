/*
 * Version 1
 *
 * 2020-07-01
 * 
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A User Model & Schema 
 * 
 * @author Shaquille Lynch
 */

// Declare variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const UserSchema = new Schema({
    "firstName" : String,
    "lastName" : String,
    "address" : String,
    "email" : String,
    "contactNumber" : String,
    "Allergies" : Array,
    "cart" : Object,
    "googleId" : String
});

const User = mongoose.model('user', UserSchema);

// Exporting User Model
module.exports = User;