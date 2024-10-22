/*
 * Version 1
 *
 * 2020-07-01
 * 
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A Cart Model & Schema 
 * 
 * @author Shaquille Lynch
 */

// Declare variables
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const CartSchema = new Schema({
    "userId" : String,
    "productId" : String,
    "customizedProductId" : String,
    "qty" : Number
});

const Cart = mongoose.model('cart', CartSchema);

// Exporting Cart Model
module.exports = Cart;