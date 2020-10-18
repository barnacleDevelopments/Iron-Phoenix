/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * Cart API Routes
 *
 * @author Shaquille Lynch
 */

// Declare Variables
const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const CustomizedProduct = require('../models/customizedProduct');
const Cart = require('../models/cart');

// Add Product to Cart
router.post('/user/:id/cart/product', function (req, res, next) {
    Cart.exists({ productId: req.body.productId }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            if (result) {
                Cart.findOneAndUpdate({ productId: req.body.productId }, { $inc: { qty: 1 } }, { new: true }, function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(data);
                    }
                });
            } else {
                Cart.create(req.body).then(function (data) {
                    res.send(data);
                }).catch(next);
            }
        }
    });
});

// Add Customized Product to Cart
router.post('/user/:id/cart/cuztomizedProduct', function (req, res, next) {
    Cart.exists({ customizedProductId: req.body.customizedProductId }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            if (result) {
                Cart.findOneAndUpdate({ customizedProductId: req.body.customizedProductId }, { $inc: { qty: 1 } }, { new: true }, function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(data);
                    }
                });
            } else {
                Cart.create(req.body).then(function (data) {
                    res.send(data);
                }).catch(next);
            }
        }
    });
});

// Get Products from Cart
router.get('/user/:id/cart/product', function (req, res, next) {
    let productId = [];
    let products = [];
    let quantity = [];

    Cart.find({userId: req.params.id}).then(function (data) {
        data.forEach(function (item, index, array) {

            if (item.productId != null) {
                productId.push(item.productId);
                quantity.push(item.qty);
            }

            if (Object.is(array.length - 1, index)) {
                productId.forEach(function (id, index, array) {
                    Product.findById({ _id: id }).then(function (data) {
                        products = products.concat(data);
                        if (Object.is(array.length - 1, index)) {
                            res.send({"products" : products, "quantity" : quantity});
                        }
                    });
                });    
            }     
        });
    });
});

// Get cuztomizedProducts from Cart
router.get('/user/:id/cart/cuztomizedProduct', function (req, res, next) {
    let customizedProductId = [];
    let products = [];
    let quantity = [];

    Cart.find({userId: req.params.id}).then(function (data) {
        data.forEach(function (item, index, array) {
            
            if (item.customizedProductId != null) {
                customizedProductId.push(item.customizedProductId);
                quantity.push(item.qty);
            }

            if (Object.is(array.length - 1, index)) {
                customizedProductId.forEach(function (id, index, array) {
                    CustomizedProduct.findById({ _id: id}).then(function (data) {
                        let price = data.price;
                        Product.findById({ _id: data.productId}).then(function (data) {
                            data.price = price;
                            products = products.concat(data);
                            if (Object.is(array.length - 1, index)) {
                                res.send({"products" : products, "quantity" : quantity});
                            }
                        });   
                    });
                });    
            }
        });
    });
});

// Exporting the routers
module.exports = router;
