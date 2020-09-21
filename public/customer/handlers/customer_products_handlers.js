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
FUNCTION ELEMENTS 
===================================
*/

// Material Elements
function createBigPreloader() {
  return `  
    <div style="width: 100%; margin: 0 auto;">
    <div class="preloader-wrapper big active" style="margin: 0 auto;">
      <div class="spinner-layer spinner-green-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
    </div>`;
}

// Component Elements
function createProductCard(id, name, price, imgPath, description) {
  return `  
    <div class="card category-card">
        <div class="card-image waves-effect waves-block waves-light product-img">
        <img src="${imgPath}">
        <i class="image-expand-button fas fa-expand-alt" data-productid="${id}"></i>
        </div>
        <div class="card-content category-card-content">
        <div class="category-card-title">
            <h2 class="product-card-title card-title activator grey-text text-darken-4">${name}</h2>
            <p class="product-price">$${price}</p>
        </div>
        <div class="card-btns">
            <div>
            <i class="fas fa-angle-up activator"></i>
            </div>
            <div>
            <a class="waves-effect waves-light btn-small">Add To Cart</a>
            </div>

        </div>
        </div>
        <div class="card-reveal">
        <div class="product-reveal">
            <div>
            <div>
                <span class="card-title grey-text 
                text-darken-4">
                <div>
                    <i class="material-icons right">close</i>
                </div>
                <h2>${name}</h2>
                </span>
                <p>${description}</p>
            </div>
            </div>
            <div class="card-reveal-btns">
            <a class="waves-effect waves-light btn-small">Add to Cart</a>
            <a class="waves-effect waves-light btn-small customize-btn" data-productid="${id}"">Customize</a>
            </div>
        </div>
    </div>
  </div>
  `;
}

function createImgInspect(img) {
  let inspectElement = document.createElement("div");
  inspectElement.addEventListener("click", () => {
    inspectElement.remove();
  });
  inspectElement.innerHTML = ` <div class="floating-product-img" style="  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.473);
  position: absolute;
  z-index: 10;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;"><img src="${img}" style=" height: 80%;"></div>`;
  return inspectElement;
}

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
