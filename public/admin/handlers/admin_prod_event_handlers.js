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

// event listener
document
  .querySelector("#admin-category-list")
  .addEventListener("click", (e) => {
    let targetElement = e.target
    let catId, productList, productForm
  if (targetElement.classList.contains("confirm-btn")) {
    // create variables to contain product info
    let prodPrice, prodTitle, prodDesc;
    // capture category list element 
    productForm = targetElement.closest("#product-form")
    // capture category id
    catId = productForm.getAttribute("data-id")
    // capture product input 
    productList = targetElement.closest("ul")
    console.log(productForm)
    // loop through all inputs set their input values to variables
    Object.keys(productForm.children).forEach((key) => {
    let inputs = productForm.children;
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
