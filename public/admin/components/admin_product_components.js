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
          <h2>${name}</h2>
          <p >${desc}</p>
      </div>
  </div>
  
<div class="product-dropdown-container">
  <a class="product-dropdown-trigger edit-drop-trigger" href="#" data-target="dropdown2"><i class="material-icons">more_vert</i></a>
  <ul data-procid="${id}" class="product-dropdown" style="display: none">
    <li class="add-product-allergies-btn">Addons</li>
    <li class="add-product-allergies-btn" data-procid="${id}">Alergies</li>
    <li class="edit-product-btn" data-procid="${id}">Edit</li>
    <li class="delete-product-btn" data-procid="${id}">Delete</li>
  </ul>
  <div class="product-price">
  <h3>$${price}</h3>
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
// DELETE PRODUCT FORM
// ---------------------------------------
function createProductDeleteForm(procId) {
  // create element
  let element = document.createElement("div");
  element.setAttribute("data-procid", procId);
  element.setAttribute("class", "form-body");

  element.innerHTML = `
      <h3>Are you sure want to delete this item?</h3>
      <a id="delete-product-btn" class="waves-effect waves-light btn confirm-btn">Confirm</a>
      <a class="waves-effect waves-light btn cancel-btn">Cancel</a>`;

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
//  CREATE ALLERGY FORM
// ---------------------------------------

function createChipform(procId) {
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
//  CATEOGRY EDIT FORM
// ---------------------------------------

function createCategoryEditForm(catId) {
  // create element
  let element = document.createElement("div");
  element.setAttribute("class", "form-body");
  element.setAttribute("data-catid", catId);

  element.innerHTML = `
        <input id="edit-category-input" type="text" placeholder="add category title here...">
        <a id="save-edit-category-btn" class="waves-effect waves-light btn confirm-btn">save</a>
        <a class="waves-effect waves-light btn cancel-btn">cancle</a>
  `;
  // add closing event listener
  element.addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    // if target element save button or cancel button - close the menu
    if (
      targetElement.classList.contains("confirm-btn") ||
      targetElement.classList.contains("cancel-btn")
    ) {
      element.remove();
      formContainer.setAttribute("style", "display: none");
      // remove tip if exists
      // get tip element
      let tipMenu = document.getElementById("tip-menu");
      if (tipMenu) {
        tipMenu.remove();
      }
    }
  });

  // add input event listener
  element.firstElementChild.addEventListener("input", (e) => {
    // get target element
    let targetElement = e.target;
    // get inputed string
    let String = new StringValidater(targetElement.value);

    // if inputed text includes too many charecters prompt the user
    if (
      String.seperatedExeeds(10) &&
      !document.querySelector("[data-tipnum='1']")
    ) {
      // create new tip element
      let tipElement = createFormTip(
        "warning",
        "Your words are too long!",
        "Shorter titles capture the users attention more easily online"
      );
      // give tip a number attribute
      tipElement.setAttribute("data-tipnum", "1");
      // get tip color
      let tipColor = tipElement.getAttribute("data-tipcolor");
      tipElement.setAttribute(
        "style",
        `position: relative; top: 0px; animation: openTipMenu .3s ease-in forwards; background-color: ${tipColor}`
      );
      // append tip to form container
      document.getElementById("form-tip-container").append(tipElement);
    } else if (
      !String.seperatedExeeds(10) &&
      document.querySelector("[data-tipnum='1']")
    ) {
      // if tip already exists & does not exeed limit remove from container
      document.querySelector("[data-tipnum='1']").remove();
    }

    if (
      String.isBiggerThen(20) &&
      !document.querySelector("[data-tipnum='2']")
    ) {
      let tipElement = createFormTip(
        "recomend",
        "Your title is too long!",
        "Shorter titles capture the users attention more easily online"
      );
      tipElement.setAttribute("data-tipnum", "2");
      console.log(document.querySelector("[data-tipnum]"));
      // get tip color
      let tipColor = tipElement.getAttribute("data-tipcolor");
      tipElement.setAttribute(
        "style",
        `position: relative; top: 0px; animation: openTipMenu .3s ease-in forwards; background-color: ${tipColor}`
      );
      document.getElementById("form-tip-container").append(tipElement);
    } else if (
      !String.isBiggerThen(20) &&
      document.querySelector("[data-tipnum='2']")
    ) {
      document.querySelector("[data-tipnum='2']").remove();
    }
  });

  return element;
}

// ---------------------------------------
//  PRODUCT EDIT FORM
// ---------------------------------------

function createProductEditForm(procId, name, price, desc) {
  // create elemet
  let element = document.createElement("div");
  // set element class
  element.setAttribute("class", "form-body");
  // set element data attribute
  element.setAttribute("data-procid", procId);
  element.innerHTML = `
      <input id="product-title-input" type="text" value="${name}"placeholder="add product title here...">
      <input id="product-price-input" type="text" value="${price}" placeholder="add price...">
      <input type="text" id="product-description-input" value="${desc}" placeholder="add description...">
      <a id="edit-product-save-btn" class="waves-effect waves-light btn confirm-btn">save</a>
      <a class="waves-effect waves-light btn cancel-btn">cancle</a>
  `;
  // add closing event listeners
  element.addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    // if target element save button or cancel button - close the menu
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
//  CATEOGRY DELETE FORM
// ---------------------------------------

function createCategoryDeleteForm(catId, procCount) {
  let element = document.createElement("div");
  // set element class
  element.setAttribute("class", "form-body");
  // set element data attribute
  element.setAttribute("data-catid", catId);
  element.innerHTML = `
    <h3>This category has ${procCount} items are you sure you want to delete it?</h3>
      <a id="delete-confirm-btn" class="waves-effect waves-light btn confirm-btn">Confirm</a>
      <a class="waves-effect waves-light btn cancel-btn cancel-btn">Cancel</a>
  `;
  // add closing event listeners
  element.addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    // if target element save button or cancel button - close the menu
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
