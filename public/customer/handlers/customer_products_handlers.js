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
==============================
CUSTOMER CATEGORY HANDLERS 
==============================

@ AUTHOR DEVIN S. DAVIS
*/

/*
  ===================================
  CATEGORY LIST EVENT HANDLERS
  ===================================
*/

let Proc = new Product();
// Get Category Inclosure Element
const categoryInclosure = document.getElementById("category-enclosure");
// Get Category Product List Element
const productsList = document.getElementById("products-list");

// Get All Categories From Database
(() => {
  Proc.getAll(productsList.getAttribute("data-categoryid")).then((products) => {
    console.log(products);
    // While Products Are Retrieved - Append Preloader
    productsList.insertAdjacentHTML("afterbegin", createBigPreloader());
    // If No Errors - Apend to Products List
    if (!products.data.err) {
      productsList.innerHTML = "";
      // iterate over all products
      products.data.forEach((product) => {
        productsList.insertAdjacentHTML(
          "afterbegin",
          createProductCard(
            product._id,
            product.name,
            product.price,
            product.img,
            product.description,
            1
          )
        );
      });
    } else {
      console.log(products.data.errMessage);
    }
  });
})();

/*
  ===================================
  CATEGORY LIST EVENT HANDLERS
  ===================================
*/

// Add Event Listener to Product List
productsList.addEventListener("click", (e) => {
  // Get Target Element
  let targetElement = e.target;
  console.log(targetElement);
  // If Target Element is Expand Button - Append Img Inspect Element
  if (targetElement.classList.contains("image-expand-button")) {
    categoryInclosure.append(createImgInspect("/cake_1.jpg"));
  }
});
