/*
 * Version 1
 *
 * 2020-07-01
 * 
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A CustomizedProduct Model & Schema 
 * 
 * @author Shaquille Lynch
 */

// Declare variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const CustomizedProductSchema = new Schema({
    "productId" : String,
    "userId" : String,
    "Addon" : Array,
    "price" : Number
});

const CustomizedProduct = mongoose.model('customizedProduct', CustomizedProductSchema);

// Exporting Cart Model
module.exports = CustomizedProduct;