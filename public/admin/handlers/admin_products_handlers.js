/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
=================================
ADMIN PRODUCT HANDLERS
=================================

@ AUTHOR DEVIN S. DAVIS
*/

// gets all the products and appends them to category list
const getProducts = (catId, container) => {
  let product = new Product();
  let element = new CategoryElement()
  if (container.children.length <= 2 ) {
    product.getAll(catId).then((data) => {
      if (!data.err) {
        data.data.forEach((product) => {
          container.insertBefore(
            element.createCatProduct(
              product._id,
              product.name,
              product.price,
              product.description
            ),
            container.firstElementChild
          );
        });
      } else {
        console.log(product.errMessage);
      }
    });
  }
}

// takes input from user and adds a new product to the categoy list 
const addProduct = (catId, container, prodPrice, prodName, prodDesc) => {
  let product = new Product();
  let element = new CategoryElement()
  // send a create request to the routes
  product.create(catId, prodName, prodDesc, prodPrice)
  .then((product) => {
      if (!product.data.err) {
        // append new element to the product list of specified category
        const newProduct =  element.createCatProduct(
          product.data._id,
          prodName,
          prodPrice,
          prodDesc
        )
        // inset new product into DOM
        container.insertBefore(newProduct, container.firstElementChild);
      } else {
        console.log(product.data.errMessage);
      }
  });
}
    
// update and replace product element
const updateProduct = (prodId, name, desc, price) => {
  let product = new Product();
  let element = new CategoryElement()
   product.update(prodId, name, desc, price ).then((product) => {
    if (!product.data.err) {
      // get old product element
      let oldProduct = document.getElementById(prodId);
     // create updated product
      const updatedProduct = element.createCatProduct(
        product.data._id,
        product.data.name,
        product.data.price,
        product.data.description
      );
    // replace old product from DOM
      document.getElementById(prodId).parentElement.replaceChild(updatedProduct, oldProduct);
    } else {
      console.log(product.data.errMessage);
    }
  });
}
