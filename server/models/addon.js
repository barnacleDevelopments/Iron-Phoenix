/*
 * Version 1
 *
 * 2020-07-01
 * 
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A Addon Model & Schema 
 * 
 * @author Shaquille Lynch
 */

// Declare variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const AddonSchema = new Schema({
    "name" : String,
    "price" : Number
});

const Addon = mongoose.model('addon', AddonSchema);

// Exporting Allergy Model
module.exports = Addon;