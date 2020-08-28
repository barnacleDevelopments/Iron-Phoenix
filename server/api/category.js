/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * Category API Routes
 *
 * @author Shaquille Lynch
 */

// Declare Variables
const express = require("express");
const router = express.Router();
const Category = require("../../public/js/models/category");

// Creating Category
router.post("/category", function (req, res, next) {
  Category.create(req.body)
    .then(function (data) {
      res.send(data);
    })
    .catch(next);
});

// Reading Category
router.get("/category", function (req, res, next) {
  Category.find().then(function (data) {
    res.send(data);
  });
});

// Updating Category
router.put("/category/:id", function (req, res, next) {
  Category.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      Category.findOne({ _id: req.params.id })
        .then(function (data) {
          res.send(data);
        })
        .catch(next);
    })
    .catch(next);
});

// Deleting Category
router.delete("/category/:id", function (req, res, next) {
  Category.findByIdAndRemove({ _id: req.params.id })
    .then(function (data) {
      res.send(data);
    })
    .catch(next);
});

// Exporting the routers
module.exports = router;
