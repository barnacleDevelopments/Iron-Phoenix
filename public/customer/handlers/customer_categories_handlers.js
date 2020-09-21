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
function createCategoryCard(id, name, imgPath, productCount) {
  return `   
    <div id="${id}" class="card categories-card">
    <a href="/product/${name}/${id}">
      <div class="card-image waves-effect waves-block waves-light product-img">
        <img src="${imgPath}">
      </div>
    </a>
    <a href="">
      <div class="card-content">
        <h2 class="card-title grey-text text-darken-4">${name}</h2>
        <p class="category-subtitle">${productCount} Items </p>
      </div>
    </a>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div>
    `;
}

/*
===================================
CATEGORY LIST EVENT HANDLERS
===================================
*/

let Cat = new Category();
let Proc = new Product();
// Get All Categories From Database
(() => {
  // Get Categories List
  const categoriesList = document.getElementById("categories-list");
  Cat.getAll().then((categories) => {
    // Append Preloader While Categories Are Retrieved
    categoriesList.insertAdjacentHTML("afterbegin", createBigPreloader());
    // If No Errors apend to Categories List
    if (!categories.data.err) {
      categoriesList.innerHTML = "";
      // iterate over all categories
      categories.data.forEach((category) => {
        Proc.count(category._id).then((procCount) => {
          if (!procCount.err) {
            categoriesList.insertAdjacentHTML(
              "afterbegin",
              createCategoryCard(
                category._id,
                category.name,
                category.img,
                procCount.count
              )
            );
          } else {
            console.log(procCount.errMessage);
          }
        });
      });
    } else {
      console.log(categories.data.errMessage);
    }
  });
})();
