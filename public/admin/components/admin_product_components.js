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
//=================================
// ADMIN DYNAMIC COMPONENTS 
//=================================

@ AUTHOR DEVIN S. DAVIS
*/

/*
===============================
DISPLAY COMPONENTS
===============================
*/
// ---------------------------------------
// INDIVIDUAL CATEGORY ELEMENT
// ---------------------------------------
class CategoryElement {
  constructor(catId, catName) {
    this.catId = catId
    this.catName = catName
    this.catProdList 
  }

  createCategory(dropDownFunc) {
    // create category element
    let element = document.createElement("li");
    element.setAttribute("data-id", this.catId)
    element.classList.add("category-header-container");
    let productList = document.createElement("ul");
    productList.classList.add("admin-product-list")
    this.catProdList = productList
    element.innerHTML = `
    <div class="collapsible-header" onclick="${dropDownFunc(this.catId, productList)}">
        <div class="admin-category-img">
          <img src="/cake_1.jpg">
        </div>
          <h1>${this.catName}</h1>
        <div class="category-dropdown-container">
        <a class="category-dropdown-trigger">
            <i class="material-icons ">more_vert</i>
        </a>
        <ul class="category-dropdown" style="display: none;">
            <li data-catid="${this.catId}" class="edit-category-btn">edit</li>
            <li data-catid="${this.catId}" class="delete-category-btn">delete</li>
        </ul>
      </div>
    </div>
   `

    // create cateory product list
    let collapsibleBody = document.createElement("div");
    collapsibleBody.classList.add("collapsible-body");
    productList.innerHTML = `<a class="waves-effect waves-light btn add-product-btn">Add Product</a>`
    collapsibleBody.append(productList);
    element.append(collapsibleBody)

    return element
  }

  createCatProduct(id, name, price, desc) {
    let element = document.createElement("li")
        element.setAttribute("id", id);
        element.setAttribute("class", "admin-product");
        element.innerHTML = `
        <div>
            <div class="admin-product-img">
                <img src="/cake_1.jpg">
            </div>
            <div class="admin-product-description">
                <h2 class="prod-name">${name}</h2>
                <p class="prod-desc">${desc}</p>
            </div>
        </div>
        
        <div class="product-dropdown-container">
          <a class="product-dropdown-trigger edit-drop-trigger" href="#" data-target="dropdown2"><i class="material-icons">more_vert</i></a>
          <ul data-procid="${id}" class="product-dropdown" style="display: none">
            <li class="add-product-addon-btn" data-procid="${id}">Addons</li>
            <li class="add-product-allergy-btn" data-procid="${id}">Alergies</li>
            <li class="edit-product-btn" data-procid="${id}">Edit</li>
            <li class="delete-product-btn" data-procid="${id}">Delete</li>
          </ul>
          <div class="product-price">
            <h3 class="prod-price">$${price}</h3>
          </div>
        </div>
      `;
        return element;
  }
}

// ---------------------------------------
// INDIVIDUAL PRODUCT ELEMENT
// ---------------------------------------
function createProductElement(id, name, price, desc) {
  // create element
  let element = document.createElement("li");
  element.innerHTML = `
  <div>
      <div class="admin-product-img">
          <img src="/cake_1.jpg">
      </div>
      <div class="admin-product-description">
          <h2 class="prod-name">${name}</h2>
          <p class="prod-desc">${desc}</p>
      </div>
  </div>
  
<div class="product-dropdown-container">
  <a class="product-dropdown-trigger edit-drop-trigger" href="#" data-target="dropdown2"><i class="material-icons">more_vert</i></a>
  <ul data-procid="${id}" class="product-dropdown" style="display: none">
    <li class="add-product-addon-btn" data-procid="${id}">Addons</li>
    <li class="add-product-allergy-btn" data-procid="${id}">Alergies</li>
    <li class="edit-product-btn" data-procid="${id}">Edit</li>
    <li class="delete-product-btn" data-procid="${id}">Delete</li>
  </ul>
  <div class="product-price">
  <h3 class="prod-price">$${price}</h3>
  </div>
`;
  return element;
}
