/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * Addon API Routes
 *
 * @author Shaquille Lynch
 */

// Declare Variables
const express = require('express');
const router = express.Router();
const Addon = require('../models/addon');

// Create Addon
router.post('/addon', function (req, res, next) {
    Addon.create(req.body).then(function (data) {
      res.send(data);
    }).catch(next);
});

// Read Addon
router.get('/addon/:id', function (req, res, next) {
  Addon.findById({ _id: req.params.id}).then(function (data) {
    res.send(data);
  }).catch(next);
});

router.get('/addon', function (req, res, next) {
    Addon.find().then(function (data) {
      res.send(data);
    }).catch(next);
});

// Update Addon
router.put('/addon/:id', function (req, res, next) {
  Addon.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
    Addon.findOne({_id: req.params.id}).then(function (data) {
        res.send(data);
      }).catch(next);
  }).catch(next);
});

// Delete Addon
router.delete('/addon/:id', function (req, res, next) {
    Addon.findByIdAndRemove({_id: req.params.id}).then(function (data) {
      res.send(data);
    }).catch(next);
});

// Exporting the routers
module.exports = router;
