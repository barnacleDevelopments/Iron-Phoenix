/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * Product API Routes
 *
 * @author Shaquille Lynch
 */

// Declare Variables
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create Product
router.post('/product', function (req, res, next) {
  Product.create(req.body).then(function (data) {
      res.send(data);
    })
    .catch(next);
});

// Read Product
router.get('/:catId/product/:id', function (req, res, next) {
  Product.find({ catId: req.params.catId })
    .then(function () {
      Product.findOne({ _id: req.params.id }).then(function (data) {
          res.send(data);
        })
        .catch(next);
    })
    .catch(next);
});

router.get('/:catId/product', function (req, res, next) {
  Product.find({ catId: req.params.catId }).then(function (data) {
        res.send(data);
    }).catch(next);
});

// Update Product
router.put('/product/:id', function (req, res, next) {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      Product.findOne({ _id: req.params.id })
        .then(function (data) {
          res.send(data);
        })
        .catch(next);
    })
    .catch(next);
});

router.put('/product/:id/allergy', function (req, res, next) {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      Product.findOne({ _id: req.params.id })
        .then(function (data) {
          res.send(data);
        })
        .catch(next);
    })
    .catch(next);
});

// Delete Product
router.delete('/product/:id', function (req, res, next) {
  Product.findByIdAndRemove({ _id: req.params.id })
    .then(function (data) {
      res.send(data);
    })
    .catch(next);
});

// Exporting the routers
module.exports = router;
