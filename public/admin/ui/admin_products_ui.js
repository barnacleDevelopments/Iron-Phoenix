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
ADMIN PRODUCTS UI
==============================

@ AUTHOR DEVIN S. DAVIS
*/

let formContainer = document.querySelector("#form-container");
// -------------------------------------
// FUNCTION ELEMENTS
// ------------------------------------
function createProductDeleteElement(procId) {
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

function createProductAllergiesElement(procId) {
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
function createCategoryEditElement(catId) {
  // create element
  let element = document.createElement("div");
  element.setAttribute("class", "form-body");
  element.setAttribute("data-catid", catId);

  element.innerHTML = `
    <input id="edit-category-input" type="text" placeholder="add category title here...">
      <a id="save-edit-category-btn" class="waves-effect waves-light btn confirm-btn">save</a>
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

function createProductEditElement(procId, name, price, desc) {
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

function createCategoryDeleteElement(catId, procCount) {
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

/*
===========================
FUNCTIONAL FUNCTIONS
===========================
*/

function stringToNum(string) {
  let lArr = [];
  let arr = [...string];
  arr.forEach((l) => {
    if (Number(l)) {
      lArr.push(parseInt(l));
    }
  });

  return Number(lArr.join(""));
}

function closeOpenDropdowns(arr) {
  arr.forEach((el) => {
    el.setAttribute("style", "display: none;");
  });
}

// close all open dropdown menus
function closeMenu(e, btns, parent) {
  let targetElement = e.target;
  let validBtns = [...btns];
  validBtns.forEach((btn) => {
    if (targetElement.classList.contains(btn)) {
      document
        .querySelector("#form-container")
        .setAttribute("style", "display: none");
      parent.setAttribute("style", "display: none");
    }
  });
}

// displays menu container
function displayFormContainer() {
  document
    .querySelector("#form-container")
    .setAttribute("style", "display: flex");
}

// =========================================
// PRODUCT MANAGEMENT CONTAINER EVENT LISTENERS
// =========================================

document
  .querySelector(".admin-products-container")
  .addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;

    // get add category input
    let categoryInput = document.querySelector(".category-input");
    // get add category button
    let categoryBtn = document.getElementById("add-category-btn");
    // open add category menu if add cetegory button is clicked
    if (targetElement.id === "add-category-btn") {
      categoryInput.setAttribute("style", "display: flex");
      categoryBtn.setAttribute("style", "display: none");
      // once open - focus first input
      categoryInput.firstElementChild.focus();
    }

    // close add category menu if save or cancle are clicked
    if (
      targetElement.classList.contains("category-save-btn") ||
      targetElement.classList.contains("category-cancel-btn")
    ) {
      categoryInput.setAttribute("style", "display: none");
      categoryBtn.setAttribute("style", "display: block");
    }
  });

// =========================================
// PRODUCT MANAGEMENT LIST EVENT LISTENERS
// =========================================

document
  .querySelector(".admin-category-list")
  .addEventListener("click", (e) => {
    //get target element
    let targetElement = e.target;

    // hide all currently open dropdowns
    const allCatDropdowns = document.querySelectorAll(".category-dropdown");
    const allProductDropdowns = document.querySelectorAll(".product-dropdown");

    // add class to varaible
    let product = new Product();
    closeOpenDropdowns(allCatDropdowns);
    closeOpenDropdowns(allProductDropdowns);

    // ++++++++++++++++++++++++++++++++++
    // Category Dropdown Event Managers
    // ++++++++++++++++++++++++++++++++++

    // open category dropdown
    if (targetElement.closest(".category-dropdown-trigger")) {
      targetElement
        .closest(".category-dropdown-trigger")
        .nextElementSibling.setAttribute("style", "display: block");
    }

    // open category edit menu, add data-attribute to editor menu & input current title in input value
    if (targetElement.closest(".edit-category-btn")) {
      // display form container
      displayFormContainer();
      // get category id
      let catId = targetElement
        .closest(".edit-category-btn")
        .getAttribute("data-catid");
      // create edit form
      let formBody = createCategoryEditElement(catId);
      formContainer.append(formBody);
      // set input value to previous name
      formBody.firstElementChild.value = document.getElementById(
        catId
      ).firstElementChild.firstElementChild.firstElementChild.lastElementChild.firstElementChild.textContent;
      // once open - focus first input
      formBody.firstElementChild.focus();
    }

    // open category delete menu and add data-attribute to editor menu
    if (targetElement.closest(".delete-category-btn")) {
      displayFormContainer();

      // get category id
      let catId = targetElement
        .closest(".delete-category-btn")
        .getAttribute("data-catid");

      // get product count for category
      product.count(catId).then((procCount) => {
        if (!procCount.err) {
          let formBody = createCategoryDeleteElement(catId, procCount.count);
          formContainer.append(formBody);
        } else {
          console.log(procCount.errMessage);
        }
      });
    }

    // ++++++++++++++++++++++++++++++++++
    // Product Edit Menu Open & Close
    // ++++++++++++++++++++++++++++++++++

    // if add product button is pressed - open product input
    if (targetElement.closest(".add-product-btn")) {
      let productInput = targetElement.previousElementSibling;
      if (productInput.style.display === "none") {
        targetElement.previousElementSibling.setAttribute(
          "style",
          "display: block"
        );
        targetElement
          .closest(".add-product-btn")
          .setAttribute("style", "display:none");
      }
    }

    // if save or cancel is pressed - close product input
    if (
      targetElement.classList.contains("product-save-btn") ||
      targetElement.classList.contains("product-cancel-btn")
    ) {
      targetElement
        .closest(".product-input")
        .setAttribute("style", "display: none");
      targetElement
        .closest(".product-input")
        .nextElementSibling.setAttribute("style", "display: block");
    }

    // ++++++++++++++++++++++++++++++++++
    // Product Dropdown Event Managers
    // ++++++++++++++++++++++++++++++++++

    // open product dropdown
    if (targetElement.closest(".product-dropdown-trigger")) {
      targetElement
        .closest(".product-dropdown-trigger")
        .nextElementSibling.setAttribute("style", "display: block");
    }

    // open edit menu, addon menu, allergy menu or delete prompt
    if (targetElement.closest(".product-dropdown")) {
      let menuSelection = targetElement.textContent;
      let procId = targetElement
        .closest(".product-dropdown")
        .getAttribute("data-procid");
      switch (menuSelection) {
        case "Addons":
          break;
        case "Edit":
          // get curent product element
          procEl = document.getElementById(procId);
          // get current product values
          let name, price, desc;
          // get name
          name =
            procEl.firstElementChild.lastElementChild.firstElementChild
              .textContent;
          // get price
          price =
            procEl.lastElementChild.lastElementChild.firstElementChild
              .textContent;

          price = stringToNum(price);

          // get description
          desc =
            procEl.firstElementChild.lastElementChild.lastElementChild
              .textContent;

          // create edit form
          let editFormBody = createProductEditElement(
            procId,
            name,
            price,
            desc
          );
          formContainer.append(editFormBody);
          formContainer.setAttribute("style", "display: flex");

          let nameLength = name.length * 2;
          // once open - focus first input
          editFormBody.firstElementChild.focus();
          // move cursor to the end of input value
          editFormBody.firstElementChild.setSelectionRange(
            nameLength,
            nameLength
          );

          break;
        case "Alergies":
          //  open product allergy menu

          // create product allergies form element
          let allergyFormBody = createProductAllergiesElement(procId);
          formContainer.append(allergyFormBody);
          formContainer.setAttribute("style", "display: flex");

          break;
        case "Delete":
          //create new element
          let deleteFormBody = createProductDeleteElement(procId);
          // append the element to form container
          formContainer.append(deleteFormBody);
          // display form container
          formContainer.setAttribute("style", "display: flex");

          // once open - focus first input
          deleteFormBody.firstElementChild.focus();
          break;
      }
    }
  });
