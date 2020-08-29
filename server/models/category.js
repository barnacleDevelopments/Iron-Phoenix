/*
 * Version 1
 *
 * 2020-07-01
 * 
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A Category Model & Schema 
 * 
 * @author Shaquille Lynch
 */

// Declare variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const CategorySchema = new Schema({
    "name" : String
});

const Category = mongoose.model('category', CategorySchema);

// Exporting Category Model
module.exports = Category;