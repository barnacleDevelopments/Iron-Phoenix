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
=================================
ADMIN PRODUCT HANDLERS
=================================

@ AUTHOR DEVIN S. DAVIS
*/

//=================================
// ELEMENT FUNCTIONS
//=================================
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
    <li>Addons</li>
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

// create allergy chip element
function createChipElement(name, id, chipStatus) {
  let allElement = document.createElement("div");
  allElement.setAttribute("class", "chip");
  allElement.setAttribute("data-allid", id);
  allElement.innerHTML = `${name}`;
  allElement.setAttribute("data-chipstatus", chipStatus);
  if (chipStatus === "active") {
    allElement.setAttribute(
      "style",
      "background-color: #5cb85c; color: white;"
    );
  } else {
    allElement.setAttribute(
      "style",
      "background-color: #e4e4e4; color: #0009;"
    );
  }
  return allElement;
}

/*
=================================
LIST EVENT LISTENERS
=================================
*/
document
  .querySelector(".admin-category-list")
  .addEventListener("click", (e) => {
    e.preventDefault();
    let product = new Product();
    // get target element
    let targetElement = e.target;

    // ++++++++++++++++++++++++++++++++++++++++++++++++
    // Fetch all products for sellected category
    // ++++++++++++++++++++++++++++++++++++++++++++++++

    if (targetElement.closest(".collapsible-header")) {
      let catId = targetElement.closest("li").id;
      // check if elelements exist inside list if so prevent fetch
      if (
        targetElement.closest(".collapsible-header").parentElement
          .nextElementSibling.lastChild.children.length <= 2
      ) {
        // get product list element
        let productList = targetElement.closest(".collapsible-header")
          .parentElement.nextElementSibling.lastChild;
        // append preloader while before promise resolves
        productList.insertAdjacentHTML(
          "afterbegin",
          `
        <div class="preloader-wrapper active">
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
      `
        );
        let products = product.getAll(catId);
        products.then((data) => {
          // check if fetch request failed
          if (!data.err) {
            // remove preloader on promise resolve
            productList.firstElementChild.remove();
            // loop through all products and append them to specfied product list
            data.data.forEach((product) => {
              productList.insertBefore(
                createProductElement(
                  product._id,
                  product.name,
                  product.price,
                  product.description
                ),
                productList.firstElementChild
              );
            });
          } else {
            console.log(product.errMessage);
          }
        });
      }
    }
    // +++++++++++++++++++++++++++++++++++++++++
    // Create product inside selected category
    // ++++++++++++++++++++++++++++++++++++++++
    if (targetElement.classList.contains("product-save-btn")) {
      // get target elements
      let productInput = targetElement.closest(".product-input"),
        productList = targetElement.closest(".admin-product-list");
      // get category id
      let catId = targetElement
        .closest(".product-input")
        .getAttribute("data-catid");
      // create variables to contain product info
      let productPrice, productTitle, productDescription;

      // loop through all inputs set their input values to variables
      Object.keys(productInput.children).forEach((key) => {
        let inputs = productInput.children;
        let inputNames = inputs[key].className;
        switch (inputNames) {
          case "category-title-input":
            productTitle = inputs[key].value;
            break;
          case "category-price-input":
            productPrice = inputs[key].value;
            break;
          case "category-description-input":
            productDescription = inputs[key].value;
            break;
          default:
            return;
        }
      });
      // send a create request to the routes
      product
        .create(catId, productTitle, productDescription, productPrice)
        .then((product) => {
          // check if fetch request failed
          if (!product.data.err) {
            // append new element to the product list of specified category
            productList.insertBefore(
              createProductElement(
                product.data._id,
                product.data.name,
                product.data.price,
                product.data.description
              ),
              productList.firstElementChild
            );
          } else {
            console.log(product.data.errMessage);
          }
        });
    }

    // +++++++++++++++++++++++++++++++++++++++++++++
    // append all allergies to product allergy menu
    // +++++++++++++++++++++++++++++++++++++++++++++
    if (targetElement.closest(".add-product-allergies-btn")) {
      let allergy = new Allergy();
      let product = new Product();
      let procId = targetElement
        .closest(".add-product-allergies-btn")
        .getAttribute("data-procid");

      // create chip container
      const chipContainer = document.createElement("div");
      chipContainer.setAttribute("id", "chip-container");

      product.getProductAllergy(procId).then((procAllergies) => {
        if (!procAllergies.data.err) {
          // remove preloader once allergies are fetched
          document.querySelector(".progress").remove();
          allergy.getAll().then((allergies) => {
            if (!allergies.data.err) {
              allergies.data.forEach((all) => {
                let chip = createChipElement(all.name, all._id, "inactive");
                chipContainer.append(chip);
              });

              // set chip allergies as active or inactive on click
              chipContainer.addEventListener("click", (e) => {
                let targetElement = e.target;
                targetElement.getAttribute("data-chipstatus");
                if (e.target.classList.contains("chip")) {
                  switch (targetElement.getAttribute("data-chipstatus")) {
                    case "inactive":
                      targetElement.setAttribute(
                        "style",
                        "background-color: #5cb85c; color: white;"
                      );
                      targetElement.setAttribute("data-chipstatus", "active");
                      allergiesArr.push(
                        targetElement.getAttribute("data-allid")
                      );
                      break;
                    case "active":
                      targetElement.setAttribute(
                        "style",
                        "background-color: #e4e4e4; color: #0009;"
                      );
                      targetElement.setAttribute("data-chipstatus", "inactive");
                  }
                }
              });

              // append allergy container to allergy menu
              let formBody = document.querySelector(".form-body");
              formBody.insertBefore(chipContainer, formBody.firstElementChild);

              let allergyElements = formBody.firstElementChild.children;

              Object.keys(allergyElements).forEach((key) => {
                procAllergies.data.forEach((procAll) => {
                  if (
                    allergyElements[key].getAttribute("data-allid") === procAll
                  ) {
                    allergyElements[key].setAttribute(
                      "data-chipstatus",
                      "active"
                    );
                    allergyElements[key].setAttribute(
                      "style",
                      "background-color: #5cb85c; color: white"
                    );
                  }
                });
              });
            } else {
              console.log(allergies.data.errMessage);
            }
          });
        } else {
          console.log(procAllergies.data.errMessage);
        }
      });
    }
  });

/*
  =======================================
  FLOATING MENU CONTAINER EVENT HANDLERS
  =======================================
  */
document.querySelector("#form-container").addEventListener("click", (e) => {
  // get target element
  let targetElement = e.target;
  // get edit menu input values
  let title, price, description;

  let product = new Product();

  // ++++++++++++++++++++++++++++++++++++++++
  // Update product inside selected category
  // ++++++++++++++++++++++++++++++++++++++++
  // if edit menu save button is pressed
  if (targetElement.id === "edit-product-save-btn") {
    // get form body
    let formBody = targetElement.closest(".form-body");
    // get product id
    let procId = formBody.getAttribute("data-procid");

    // get edit menu input field values
    Object.keys(formBody.children).forEach((el) => {
      let input = formBody.children[el];

      switch (input.id) {
        case "product-title-input":
          title = input.value;
          break;
        case "product-price-input":
          price = input.value;
          break;
        case "product-description-input":
          description = input.value;
          break;
        default:
          null;
      }
    });
    console.log(price);
    // update and replace product element
    product.update(procId, title, description, price).then((product) => {
      if (!product.data.err) {
        // get old product element
        let oldProduct = document.getElementById(procId);

        // get product list for category
        let productList = document.getElementById(product.data.catId)
          .lastElementChild.firstElementChild;

        // create updated product
        const updatedProduct = createProductElement(
          product.data._id,
          product.data.name,
          product.data.price,
          product.data.description
        );

        console.log(updatedProduct);
        console.log(productList);
        productList.replaceChild(updatedProduct, oldProduct);
      } else {
        console.log(product.data.errMessage);
      }
    });
  }

  // delete product handler
  if (targetElement.id === "delete-product-btn") {
    // get target element
    let targetElement = e.target;
    let formBody = targetElement.closest(".form-body");
    let procId = formBody.getAttribute("data-procid");
    product.remove(procId).then((data) => {
      if (!data.data.err) {
        let proc = document.getElementById(procId);
        proc.remove();
      } else {
        console.log(data.data.errMessage);
      }
    });
  }

  // update product allergies property
  if (targetElement.id === "product-allergies-save-btn") {
    let targetElement = e.target;
    let newAllArr = [];
    let procId = targetElement.parentElement.getAttribute("data-procid");

    let chipsContainer = targetElement.parentElement.firstElementChild;

    Object.keys(chipsContainer.children).forEach((key) => {
      if (
        chipsContainer.children[key].getAttribute("data-chipstatus") ===
        "active"
      ) {
        newAllArr.push(chipsContainer.children[key].getAttribute("data-allid"));
      }
    });
    product.updateProductAllergy(procId, newAllArr);

    //hide product menu floater container
    document
      .querySelector("#form-container")
      .setAttribute("style", "display: none");
  }
});
