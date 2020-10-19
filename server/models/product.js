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
    "Allergy" : Array,
    "Addon" : Array
});

/*const ProductImgSchema = new Schema({ 
    "productId" : 
    "img" : {
        data: Buffer, 
        contentType: String 
    }
});*/

const Product = mongoose.model('product', ProductSchema);
//const ProductImg = mongoose.model('Clothes', ProductImgSchema);

// Exporting Product Model
module.exports = Product;