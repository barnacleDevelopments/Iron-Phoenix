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
    let totalQty = 0;

    Cart.exists({ productId: req.body.productId }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            if (result) {
                Cart.findOneAndUpdate({ productId: req.body.productId }, { $inc: { qty: 1 } }, { new: true }, function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        Cart.find({userId: req.params.id}).then(function (data) {
                            data.forEach(function (item, index, array) {

                                totalQty+=item.qty;

                                if (Object.is(array.length - 1, index)) {
                                    res.send({"amount" : totalQty});
                                }
                            });    
                        });
                    }
                });
            } else {
                Cart.create(req.body).then(function (data) {
                    Cart.find({userId: req.params.id}).then(function (data) {
                        data.forEach(function (item, index, array) {
                
                            totalQty+=item.qty;
                
                            if (Object.is(array.length - 1, index)) {
                                res.send({"amount" : totalQty});
                            }
                        });    
                    });
                }).catch(next);
            }
        }
    });
});

// Add Customized Product to Cart
router.post('/user/:id/cart/cuztomizedProduct', function (req, res, next) {
    let totalQty = 0;

    Cart.exists({ customizedProductId: req.body.customizedProductId }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            if (result) {
                Cart.findOneAndUpdate({ customizedProductId: req.body.customizedProductId }, { $inc: { qty: 1 } }, { new: true }, function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        Cart.find({userId: req.params.id}).then(function (data) {
                            data.forEach(function (item, index, array) {
                    
                                totalQty+=item.qty;
                    
                                if (Object.is(array.length - 1, index)) {
                                    res.send({"amount" : totalQty});
                                }
                            });    
                        });
                    }
                });
            } else {
                Cart.create(req.body).then(function (data) {
                    Cart.find({userId: req.params.id}).then(function (data) {
                        data.forEach(function (item, index, array) {
                
                            totalQty+=item.qty;
                
                            if (Object.is(array.length - 1, index)) {
                                res.send({"amount" : totalQty});
                            }
                        });    
                    });
                }).catch(next);
            }
        }
    });
});

// Get Products from Cart
router.get('/user/:id/cart/product', function (req, res, next) {
    let cartItemId = [];
    let productId = [];
    let products = [];
    let quantity = [];

    Cart.find({userId: req.params.id}).then(function (data) {
        data.forEach(function (item, index, array) {

            if (item.productId != null) {
                cartItemId.push(item._id);
                productId.push(item.productId);
                quantity.push(item.qty);
            }

            if (Object.is(array.length - 1, index)) {
                productId.forEach(function (id, index, array) {
                    Product.findById({ _id: id }).then(function (data) {
                        data.set("quantity", quantity[index], { strict: false });
                        data._id = cartItemId[index];
                        products = products.concat(data);
                        if (Object.is(array.length - 1, index)) {
                            res.send(products);
                        }
                    });
                });    
            }     
        });
    });
});

// Get cuztomizedProducts from Cart
router.get('/user/:id/cart/cuztomizedProduct', function (req, res, next) {
    let cartItemId = [];
    let customizedProductId = [];
    let products = [];
    let quantity = [];

    Cart.find({userId: req.params.id}).then(function (data) {
        data.forEach(function (item, index, array) {
            
            if (item.customizedProductId != null) {
                cartItemId.push(item._id);
                customizedProductId.push(item.customizedProductId);
                quantity.push(item.qty);
            }

            if (Object.is(array.length - 1, index)) {
                customizedProductId.forEach(function (id, index, array) {
                    CustomizedProduct.findById({ _id: id}).then(function (data) {
                        let price = data.price;
                        Product.findById({ _id: data.productId}).then(function (data) {
                            data.set("quantity", quantity[index], { strict: false });
                            data._id = cartItemId[index];
                            data.price = price;
                            products = products.concat(data);
                            if (Object.is(array.length - 1, index)) {
                                res.send(products);
                            }
                        });   
                    });
                });    
            }
        });
    });
});

// Get the number of items that's in the cart
router.get('/user/:id/cart', function (req, res, next) {
    let totalQty = 0;

    Cart.find({userId: req.params.id}).then(function (data) {
        data.forEach(function (item, index, array) {

            totalQty+=item.qty;

            if (Object.is(array.length - 1, index)) {
                res.send({"amount" : totalQty});
            }
        });    
    });    
});    

// Delete item from Cart
router.delete('/cart/:itemId', function (req, res, next) {
    Cart.findByIdAndDelete({_id: req.params.itemId}).then(function (data) {
        res.send(data);
    });    
});  

// Exporting the routers
module.exports = router;
