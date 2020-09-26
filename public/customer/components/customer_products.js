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
===========================
Product Elements
===========================
*/
// Product Card
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

// Category Card
function createCategoryCard(id, name, imgPath, productCount) {
  return `   
      <div id="${id}" class="card categories-card">
      <a href="/product/${name}/${id}">
        <div class="card-image waves-effect waves-block waves-light product-img">
          <img src="${imgPath}">
        </div>
      </a>
        <div class="card-content">
          <h2 class="card-title grey-text text-darken-4">${name}</h2>
          <p class="category-subtitle">${productCount} Items </p>
        </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
        <p>Here is some more information about this product that is only revealed once clicked on.</p>
      </div>
    </div>
      `;
}

// Floating Image Inspect
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
