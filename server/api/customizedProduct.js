/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * Customized Product API Routes
 *
 * @author Shaquille Lynch
 */

// Declare Variables
const express = require('express');
const router = express.Router();
const CustomizedProduct = require('../models/customizedProduct');

// Create Customized Product
router.post('/user/:id/customizedproduct', function (req, res, next) {
    CustomizedProduct.create(req.body).then(function (data) {
        res.send(data._id);
    }).catch(next);
});

// Get the User Customized Product
router.get('/user/:id/customizedproduct/:cpId', function (req, res, next) {
    CustomizedProduct.findById({_id: req.params.cpId}).then(function (data) {
        res.send(data);
    }).catch(next);
});

// Get all the User Customized Products
router.get('/user/:id/customizedproduct', function (req, res, next) {
    CustomizedProduct.find({userId: req.params.id}).then(function (data) {
        res.send(data);
    }).catch(next);
});

// Update the User Customized Product
router.put('/user/:id/customizedproduct/:cpId', function (req, res, next) {
    CustomizedProduct.findByIdAndUpdate({_id: req.params.cpId}, req.body).then(function (data) {
        CustomizedProduct.findOne({_id: req.params.cpId}).then(function (data) {
            res.send(data);
        }).catch(next);
    }).catch(next);
});

// Delete the User Customized Product
router.delete('/user/:id/customizedproduct/:cpId', function (req, res, next) {
    CustomizedProduct.findByIdAndRemove({_id: req.params.cpId}).then(function (data) {
        res.send(data);
    }).catch(next);
});

// Exporting the routers
module.exports = router;
