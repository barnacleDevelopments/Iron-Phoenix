/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * Allergy API Routes
 *
 * @author Shaquille Lynch
 */

// Declare Variables
const express = require('express');
const router = express.Router();
const Allergy = require('../models/allergy');

// Create Allergy
router.post('/allergy', function (req, res, next) {
    Allergy.create(req.body)
    .then(function (data) {
      res.send(data);
    })
    .catch(next);
});

// Read Allergy
router.get('/allergy/:id', function (req, res, next) {
  Allergy.findById({ _id: req.params.id}).then(function (data) {
    res.send(data);
  }).catch(next);
});

router.get('/allergy', function (req, res, next) {
    Allergy.find().then(function (data) {
      res.send(data);
    }).catch(next);
});

// Delete Allergy
router.delete('/allergy/:id', function (req, res, next) {
    Allergy.findByIdAndRemove({ _id: req.params.id }).then(function (data) {
      res.send(data);
    }).catch(next);
});

// Exporting the routers
module.exports = router;
