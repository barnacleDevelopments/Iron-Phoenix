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
const addProduct = (catId, container, prodPrice, prodTitle, prodDesc) => {
  let product = new Product();
  // send a create request to the routes
  product.create(catId, prodTitle, prodDesc, prodPrice)
  .then((product) => {
    // check if fetch request failed
      if (!product.data.err) {
        // append new element to the product list of specified category
        container
        .insertBefore(
          createProductElement(
                product.data._id,
                product.data.name,
                product.data.price,
                product.data.description
              ),
              container.firstElementChild
        );
      } else {
        console.log(product.data.errMessage);
      }
  });
}
    
// update and replace product element
const updateProduct = (prodId, propsArr) => {
  // name description, price
   product.update(prodId, ...propsArr).then((product) => {
    if (!product.data.err) {
      // get old product element
      let oldProduct = document.getElementById(prodId);
     // create updated product
      const updatedProduct = createProductElement(
        product.data._id,
        product.data.name,
        product.data.price,
        product.data.description
      );
    // replace product
      document.getElementById(prodId).parentElement.replaceChild(updatedProduct, oldProduct);
    } else {
      console.log(product.data.errMessage);
    }
  });
}
