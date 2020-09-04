/*
 * Version 1
 *
 * 2020-07-01
 * 
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A Product Model & Schema 
 * 
 * @author Shaquille Lynch
 */

// Declare variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const ProductSchema = new Schema({
    "catId" : String,
    "name" : String, 
    "description" : String,
    "price" : Number,
    "Allergy" : Array
});

const Product = mongoose.model('product', ProductSchema);

// Exporting Product Model
module.exports = Product;