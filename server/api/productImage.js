/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * Product Image API Routes
 *
 * @author Shaquille Lynch
 */

// Declare Variables
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage
});

// Upload Product Image
router.post('/upload/productImg', upload.single('productImage'), (req, res) => {
    var productImage = fs.readFileSync(req.file.path);
    var encode_productImage = productImage.toString('base64');

    // Define a JSON object for the product image
    
});    