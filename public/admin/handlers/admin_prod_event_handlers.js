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
ADMIN EVENT PRODUCT HANDLERS 
=================================

@ AUTHOR DEVIN S. DAVIS
*/

document
  .querySelector("#admin-category-list")
  .addEventListener("click", (e) => {
    let targetElement = e.target
    let catId, productList, formBody
  if (targetElement.classList.contains("confirm-btn")) {
    // create variables to contain product info
    let prodPrice, prodTitle, prodDesc;
    // capture category list element 
    formBody = targetElement.closest("#product-form")
    // capture category id
    catId = formBody.getAttribute("data-id")
    // capture product list
    productList = document.getElementsByClassName(catId)[1]
    // capture input values
    let inputs = formBody.children
    prodTitle = inputs[0].value;
    prodDesc = inputs[1].value;
    prodPrice = inputs[2].value;

    // add new product
    addProduct(catId, productList, prodPrice, prodTitle, prodDesc)
  }
});

document.body.addEventListener("click", (e) => {
  // get target element
  let targetElement = e.target;
  let product = new Product();
  // update product event handler
  if (targetElement.classList.contains("confirm-btn") && targetElement.closest("#prod-edit-form")) {
    // get form body
    let formBody = targetElement.closest("#prod-edit-form");
    // get product id
    let prodId = formBody.getAttribute("data-id");
    // get edit menu input field values
     let name = formBody.children[0] .value
     let price = formBody.children[1].value
     let desc = formBody.children[2].value
     updateProduct(prodId, name, desc, price)
  }

  // delete product event handler
  if (targetElement.classList.contains("confirm-btn") && targetElement.closest("#prod-del-form")) {
    // get target element
    let targetElement = e.target;
    let formBody = targetElement.closest("#prod-del-form");
    let prodId = formBody.getAttribute("data-id");
    product.remove(prodId).then((data) => {
      if (!data.data.err) {
        document.getElementById(prodId).remove();
      } else {
        console.log(data.data.errMessage);
      }
    });
  }
});
