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

/*
======================================
GLOBAL PAGE ELEMENTS
======================================
*/

let formContainer = document.querySelector("#form-container");

/*
===========================
FUNCTIONAL FUNCTIONS
===========================
*/

// ---------------------------------------
//  CONVERTS STRING TO NUMBER
// ---------------------------------------
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

// ---------------------------------------
//  CLOSES OPEN DROPDOWN MENUES (prodide an array of elements)
// ---------------------------------------
function closeOpenDropdowns(arr) {
  arr.forEach((el) => {
    el.setAttribute("style", "display: none;");
  });
}

// ---------------------------------------
//  DISPLAYS FORM CONTAINER
// ---------------------------------------
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
      targetElement.id === "category-save-btn" ||
      targetElement.id === "category-cancel-btn"
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
      let formBody = createCategoryEditForm(catId);
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
          let formBody = createCategoryDeleteForm(catId, procCount.count);
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
          // create product allergies form element
          let addonFormBody = createChipform(procId);
          // append the element to form container
          formContainer.append(addonFormBody);
          // display form container
          displayFormContainer();
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
          let editFormBody = createProductEditForm(procId, name, price, desc);
          formContainer.append(editFormBody);

          let nameLength = name.length * 2;

          // move cursor to the end of input value
          editFormBody.firstElementChild.setSelectionRange(
            nameLength,
            nameLength
          );
          // display form container
          displayFormContainer();
          // once open - focus first input
          editFormBody.firstElementChild.focus();
          break;
        case "Alergies":
          // create product allergies form element
          let allergyFormBody = createChipform(procId);
          // append the element to form container
          formContainer.append(allergyFormBody);
          // display form container
          displayFormContainer();
          break;
        case "Delete":
          //create new element
          let deleteFormBody = createProductDeleteForm(procId);
          // append the element to form container
          formContainer.append(deleteFormBody);
          // display form container
          displayFormContainer();

          // once open - focus first input
          deleteFormBody.firstElementChild.focus();
          break;
      }
    }
  });

/*
===================================
FIELD TYPING EVENT LISTENERS
==================================
*/
