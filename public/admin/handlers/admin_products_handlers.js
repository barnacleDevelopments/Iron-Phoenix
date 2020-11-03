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

// event listener
document
  .querySelector("#admin-category-list")
  .addEventListener("click", (e) => {
    let targetElement = e.target
    let catId, categoryElement, productList, productInput
    
  if (targetElement.classList.contains("product-save-btn")) {
    // create variables to contain product info
    let prodPrice, prodTitle, prodDesc;
    // capture category list element 
    categoryElement = targetElement.closest(".category-list-element")
    // capture category id
    catId = categoryElement.getAttribute("data-id")
    // capture product input 
    productInput = targetElement.closest(".product-input")
    productList = targetElement.closest("#admin-product-list");
    // loop through all inputs set their input values to variables
    Object.keys(productInput.children).forEach((key) => {
    let inputs = productInput.children;
    let inputNames = inputs[key].className;
      switch (inputNames) {
        case "category-title-input":
          productTitle = inputs[key].value;
        break;
        case "category-price-input":
          productPrice = inputs[key].value;
        break;
        case "category-description-input":
          productDescription = inputs[key].value;
        break;
      }
    });
    addProduct(catId, productList, prodPrice, prodTitle, prodDesc)
  }
});

/*
  =======================================
  FLOATING MENU CONTAINER EVENT HANDLERS
  =======================================
  */
document.querySelector("body").addEventListener("click", (e) => {
  // get target element
  let targetElement = e.target;
  let product = new Product();
  // ++++++++++++++++++++++++++++++++++++++++
  // Update product inside selected category
  // ++++++++++++++++++++++++++++++++++++++++
  // if edit menu save button is pressed
  if (targetElement.classList.contains("confirm-btn") && targetElement.closest("#prod-edit-form")) {
    // get form body
    let formBody = targetElement.closest("#prod-edit-form");
    // get product id
    let prodId = formBody.getAttribute("data-id");
    // get edit menu input field values
     let name = formBody.children[0] .value
     let price = formBody.children[1].value
     let desc = formBody.children[2].value
 
  }

  // delete product handler
  if (targetElement.classList.contains("confirm-btn") && targetElement.closest("#prod-del-form")) {
    // get target element
    let targetElement = e.target;
    let formBody = targetElement.closest("#prod-del-form");
    let prodId = formBody.getAttribute("data-id");
    product.remove(prodId).then((data) => {
      if (!data.data.err) {
        $(`#${prodId}`).remove()
        proc.remove();
      } else {
        console.log(data.data.errMessage);
      }
    });
  }

});
