/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * User API Routes
 *
 * @author Shaquille Lynch
 */

// Declare Variables
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create User
router.post('/user', function (req, res, next) {
    User.create(req.body).then(function (data) {
      res.send(data);
    })
    .catch(next);
});

// Read User
router.get('/user/:id', function (req, res, next) {
    User.findById({ _id: req.params.id}).then(function (data) {
    res.send(data);
  }).catch(next);
});

router.get('/user', function (req, res, next) {
    User.find().then(function (data) {
      res.send(data);
    }).catch(next);
});

router.get('/user/:id/allergy', function (req, res, next) {
  User.findById({_id: req.params.id}).then(function (data) {
        res.send(data.Allergy);
    }).catch(next);
});

// Update User
router.put('/user/:id', function (req, res, next) {
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
        User.findOne({_id: req.params.id}).then(function (data) {
            res.send(data);
        }).catch(next);
    }).catch(next);
});


router.put('/user/:id/allergy', function (req, res, next) {
  User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
      User.findOne({_id: req.params.id}).then(function (data) {
          res.send(data.Allergy);
        }).catch(next);
    }).catch(next);
});

// Delete User
router.delete('/user/:id', function (req, res, next) {
    User.findByIdAndRemove({ _id: req.params.id }).then(function (data) {
      res.send(data);
    }).catch(next);
});

// Exporting the routers
module.exports = router;
