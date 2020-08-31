/*
 * Version 1
 *
 * 2020-07-01
 * 
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A Allergy Model & Schema 
 * 
 * @author Shaquille Lynch
 */

// Declare variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const AllergySchema = new Schema({
    "name" : String
});

const Allergy = mongoose.model('allergy', AllergySchema);

// Exporting Allergy Model
module.exports = Allergy;