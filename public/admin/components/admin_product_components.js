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
function createCategoryElement(id, name) {
  // create element
  let element = document.createElement("li");
  // set element id
  element.setAttribute("id", id);
  // add element content
  element.innerHTML = `
  <div class="category-header-container">
      <div class="collapsible-header">
          <div>
              <div class="admin-category-img">
                  <img src="/cake_1.jpg">
              </div>
              <div>
                  <h1>${name}</h1>
              </div>
          </div>
      </div>
      <div class="category-dropdown-container">
      <a class="category-dropdown-trigger">
          <i class="material-icons ">more_vert</i>
      </a>
      <ul class="category-dropdown" style="display: none;">
          <li data-catid="${id}" class="edit-category-btn">edit</li>
          <li data-catid="${id}" class="delete-category-btn">delete</li>
      </ul>
  </div>
  </div>
  <div class="collapsible-body">
      <ul data-catid="${id}" class=" admin-product-list">
      

          <li data-catid="${id}" class="product-input" style="display: none;">
            <input class="category-title-input" type="text" placeholder="add product title here...">
            <input class="category-price-input" type="text" placeholder="add price...">
            <input class="category-description-input" type="text" placeholder="add description...">

              <div class="product-input-btns">
                  <a class="waves-effect waves-light btn product-save-btn confirm-btn">save</a>
                  <a class="waves-effect waves-light btn cancel-btn product-cancel-btn">cancle</a>
              </div>
          </li>

          <a class="waves-effect waves-light btn add-product-btn">Add Product</a>
  </div>
`;
  return element;
}

// ---------------------------------------
// INDIVIDUAL PRODUCT ELEMENT
// ---------------------------------------
function createProductElement(id, name, price, desc) {
  // create element
  let element = document.createElement("li");
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

/*
===============================
FORM COMPONENTS
===============================
*/

// ---------------------------------------
//  CREATE ALLERGY FORM
// ---------------------------------------

function createAllergiesChipform(procId) {
  // create product allergies menu
  let element = document.createElement("div");
  element.setAttribute("style", "background-color: #f5f5f5; width: 90%;");
  element.setAttribute("class", "form-body");
  element.setAttribute("data-procid", procId);
  element.innerHTML = `
      <a id="product-allergies-save-btn" class="waves-effect waves-light btn proc-allergy-save-btn confirm-btn">save</a>
      <a id="product-allergies-cancel-btn" class="waves-effect waves-light btn proc-allergy-cancel-btn cancel-btn" style="background-color: grey">cancel</a>
      `;
  // append preloader while allegies are fetched
  let preLoader = document.createElement("div");
  preLoader.innerHTML = `
      <div class="progress">
      <div class="indeterminate"></div>
      </div>
             `;

  element.insertBefore(preLoader, element.firstElementChild);

  element.addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    if (
      targetElement.classList.contains("confirm-btn") ||
      targetElement.classList.contains("cancel-btn")
    ) {
      element.remove();
      formContainer.setAttribute("style", "display: none");
    }
  });

  return element;
}

// ---------------------------------------
//  CREATE CHIP FORM
// ---------------------------------------

function createChipform(procId, saveBtnId) {
  // create product allergies menu
  let element = document.createElement("div");
  element.id = "form-body";
  element.setAttribute("data-procid", procId);
  element.innerHTML = `
      <a id="${saveBtnId}" class="waves-effect waves-light btn confirm-btn ">save</a>
      <a  class="waves-effect waves-light btn cancel-btn">cancel</a>
      `;
  // append preloader while allegies are fetched
  let preLoader = document.createElement("div");
  preLoader.innerHTML = `
      <div class="progress">
      <div class="indeterminate"></div>
      </div>
             `;

  element.insertBefore(preLoader, element.firstElementChild);

  element.addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    if (
      targetElement.classList.contains("confirm-btn") ||
      targetElement.classList.contains("cancel-btn")
    ) {
      element.remove();
      formContainer.setAttribute("style", "display: none");
    }
  });

  return element;
}




