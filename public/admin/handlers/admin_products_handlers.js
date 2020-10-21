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

// create allergy chip element

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
        let preloader = new Preloader()
        let smallPreloader = preloader.small()

        productList.append(smallPreloader);
        let products = product.getAll(catId);
        products.then((data) => {
          // check if fetch request failed
          if (!data.err) {
            // remove preloader on promise resolve
            smallPreloader.remove();
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
    if (targetElement.closest(".add-product-allergy-btn")) {
      let allergy = new Allergy();
      let product = new Product();
      let procId = targetElement
        .closest(".add-product-allergy-btn")
        .getAttribute("data-procid");

      // create chip container
      const chipContainer = document.createElement("div");
      chipContainer.setAttribute("id", "chip-container");

      product.getProductAllergyIds(procId).then((procAllergies) => {
        if (!procAllergies.data.err) {
          // remove preloader once allergies are fetched
          document.querySelector(".progress").remove();
          allergy.getAll().then((allergies) => {
            if (!allergies.data.err) {
              allergies.data.forEach((all) => {
                let newChip = new Chip(all._id, all.name, "inactive")
                let chip = newChip.create(true)
                chipContainer.append(chip);
              });

              // append allergy container to allergy menu
              let formBody = document.getElementById("form-body");
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

    // +++++++++++++++++++++++++++++++++++++++++++++
    // append all addons to product addon menu
    // +++++++++++++++++++++++++++++++++++++++++++++

    if (targetElement.closest(".add-product-addon-btn")) {
      let addon = new Addon();
      let product = new Product();
      let procId = targetElement
        .closest(".add-product-addon-btn")
        .getAttribute("data-procid");

      // create chip container
      const chipContainer = document.createElement("div");
      chipContainer.setAttribute("id", "chip-container");

      product.getProductAddonIds(procId).then((procAddons) => {
        if (!procAddons.data.err) {
          // remove preloader once allergies are fetched
          // document.querySelector(".progress").remove();
          // get all the allergies and append them to chip container
          addon.getAll().then((addons) => {
            if (!addons.data.err) {
              addons.data.forEach((an) => {
                let newChip = new Chip(an._id, an.name, "inactive")
                let chip = newChip.create()
                chipContainer.append(chip);
              });

              // append allergy container to allergy menu
              let formBody = document.getElementById("prod-edit-form-body");

              formBody.insertBefore(chipContainer, formBody.firstElementChild);

              // get all the chips inside chip container
              let addonChips = formBody.firstElementChild.children;

              // loop over all the chips and change their status
              Object.keys(addonChips).forEach((key) => {
                procAddons.data.forEach((procAll) => {
                  if (addonChips[key].getAttribute("data-allid") === procAll) {
                    addonChips[key].setAttribute("data-chipstatus", "active");
                    addonChips[key].setAttribute(
                      "style",
                      "background-color: #5cb85c; color: white"
                    );
                  }
                });
              });
            } else {
              console.log(addons.data.errMessage);
            }
          });
        } else {
          console.log(procAddons.data.errMessage);
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
  let product = new Product();
  // ++++++++++++++++++++++++++++++++++++++++
  // Update product inside selected category
  // ++++++++++++++++++++++++++++++++++++++++
  // if edit menu save button is pressed
  if (targetElement.classList.contains("confirm-btn") && targetElement.closest("#prod-edit-form")) {
    // get form body
    let formBody = targetElement.closest("#prod-edit-form");
    // get product id
    let prodId = formBody.getAttribute("data-id");
    // get edit menu input field values
     let name = formBody.children[0] .value
     let price = formBody.children[1].value
     let desc = formBody.children[2].value
    // update and replace product element
    product.update(prodId, name, desc, price).then((product) => {
      if (!product.data.err) {
        // get old product element
        let oldProduct = document.getElementById(prodId);
       // create updated product
        const updatedProduct = createProductElement(
          product.data._id,
          product.data.name,
          product.data.price,
          product.data.description
        );
      // replace product
        document.getElementById(prodId).parentElement.replaceChild(updatedProduct, oldProduct);
      } else {
        console.log(product.data.errMessage);
      }
    });
  }

  // delete product handler
  if (targetElement.classList.contains("confirm-btn") && targetElement.closest("#prod-del-form")) {
    // get target element
    let targetElement = e.target;
    let formBody = targetElement.closest("#prod-del-form");
    let prodId = formBody.getAttribute("data-id");
    product.remove(prodId).then((data) => {
      if (!data.data.err) {
        $(`#${prodId}`).remove()
        proc.remove();
      } else {
        console.log(data.data.errMessage);
      }
    });
  }

  // update product allergies property
  if (targetElement.id === "product-allergy-save-btn") {
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

  if (targetElement.closest("#product-addon-save-btn")) {
    let targetElement = e.target;
    let newAddonArr = [];
    let procId = targetElement.parentElement.getAttribute("data-procid");

    let chipsContainer = targetElement.parentElement.firstElementChild;

    Object.keys(chipsContainer.children).forEach((key) => {
      if (
        chipsContainer.children[key].getAttribute("data-chipstatus") ===
        "active"
      ) {
        newAddonArr.push(
          chipsContainer.children[key].getAttribute("data-allid")
        );
      }
    });
    product.updateProductAddon(procId, newAddonArr);

    //hide product menu floater container
    document
      .querySelector("#form-container")
      .setAttribute("style", "display: none");
  }
});
