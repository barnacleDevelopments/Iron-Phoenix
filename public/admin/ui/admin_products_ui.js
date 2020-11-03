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

// =========================================
// PRODUCT MANAGEMENT CONTAINER EVENT LISTENERS
// =========================================

document
  .querySelector(".content-container")
  .addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;

    // get add category input
    let categoryInput = document.querySelector(".add-category-form");
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
  .querySelector(".content-list")
  .addEventListener("click", (e) => {
   let catid
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
      // get category id
      catId = $(targetElement)
        .closest(".edit-category-btn")
        .attr("data-catid");
      // create edit form
      let categoryForm = new Form(catId, "cat-edit-form", "confirm", true);
      let formBody = categoryForm.textInputForm(
        $(`#${catId}`).find("h1").text(),
      );
      document.body.append(formBody);
      // once open - focus first input
      formBody.firstElementChild.focus();
    }
    // open category delete menu and add data-attribute to editor menu
    if (targetElement.closest(".delete-category-btn")) {
      // get category id
      catId = $(targetElement)
        .closest(".delete-category-btn")
        .attr("data-catid");
      let deleteForm = new Form(catId, "cat-del-form", "delete", true);
      // get product count for category
      product.count(catId).then((procCount) => {
        if (!procCount.err) {
          let formBody = deleteForm.promptForm(`This category contains ${procCount.count} products. Are you sure you want to delete it?`);
          document.body.append(formBody);
        } else {
          console.log(procCount.errMessage);
        }
      });
    }

    // ++++++++++++++++++++++++++++++++++
    // Product Edit Menu Open & Close
    // ++++++++++++++++++++++++++++++++++

    // if add product button is pressed - open product input
    if (targetElement.classList.contains("add-product-btn")) {
      // capture cateory id 
      catId = targetElement.closest(".category-header-container").getAttribute("data-id")
      // capture cateory product list 
      let productList = targetElement.closest(".admin-product-list")
      let productBtn = targetElement
      .closest(".add-product-btn")
      // remove add product btn
      productBtn.style.display = "none"
      // create form element 
      let form = new Form(catId, "product-form", "Create", false)
      let prodForm = form.textInputForm("name", "description", "price")
      productList.insertBefore(
        prodForm, 
        form.firstElementChild
      )
      Object.keys(form.btns).forEach(key => {
        form.btns[key].addEventListener("click", () => {
          productBtn.style.display = "block"
          prodForm.remove()
        })
      })
    
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
      let prodId = $(targetElement)
        .closest(".product-dropdown")
        .attr("data-procid")
 
      switch (menuSelection) {
        case "Addons":
          let prodAddForm = new Form(prodId, "prod-edit-form", "add", true)
          // create product allergies form element
         let addFormBody = prodAddForm.chipForm("addon-form-list", updateAddons)
         appendAddons(prodId, addFormBody.firstElementChild.firstElementChild)
          // append the element to form container
          document.body.append(addFormBody);
      
          break;
        case "Edit":  
        let prodEditForm = new Form(prodId, "prod-edit-form", "edit", true);
        let prod =  $(`#${prodId}`) 
          // get name
          let name = prod.find(".prod-name").text()
          // get price
          let price = prod.find(".prod-price").text()
          // get description
          let desc = prod.find(".prod-desc").text()
          // create edit form
          let editFormBody = prodEditForm.textInputForm(name, price, desc);
          document.body.append(editFormBody);
        
          // once open - focus first input
          editFormBody.firstElementChild.focus();
          break;
        case "Alergies":
          let prodAllForm = new Form(prodId, "prod-allergy-form", "add", true)
          // create product allergies form element
          let allergyFormBody = prodAllForm.chipForm("allergy-form-list", updateAllergies)
          appendAllergies(prodId, allergyFormBody.firstElementChild.firstElementChild)
          // append the element to form container
          document.body.append(allergyFormBody);
       
          break;
        case "Delete":
          //create new element
          let prodDelForm = new Form(prodId, "prod-del-form", "delete", true);
          let deleteFormBody = prodDelForm.promptForm("Are you sure you want to delte this product?");
          // append the element to form container
          document.body.append(deleteFormBody);
          // once open - focus first input
          deleteFormBody.firstElementChild.focus();
          break;
      }
    }
  });