//=================================
// PRODUCT HANDLERS
//=================================

//=================================
// Functions
//=================================
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
              productList.insertAdjacentHTML(
                "afterbegin",
                `
              <li id="${product._id}" class="admin-product">
              <div>
                  <div class="admin-product-img">
                      <img src="/cake_1.jpg">
                  </div>
                  <div class="admin-product-description">
                      <h2>${product.name}</h2>
                      <p class="flow-text">${product.description}</p>
                  </div>
              </div>
              
          <div class="product-dropdown-container">
              <a class="product-dropdown-trigger edit-drop-trigger" href="#" data-target="dropdown2"><i class="material-icons">more_vert</i></a>
              <ul data-procid="${product._id}" class="product-dropdown" style="display: none">
                <li><a href="#">Addons</a></li>
                <li><a href="#" class="add-product-allergies-btn" data-procid="${product._id}" >Alergies</a></li>
                <li><a href="#" class="edit-product-btn" data-procid="${product._id}" >Edit</a></li>
                <li><a href="#!" class="delete-product-btn" data-procid="${product._id}" >Delete</a></li>
              </ul>
              <div class="product-price">
              <h3>$${product.price}</h3>
          </div>
              </div>
       
          </li>`
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
        .then((data) => {
          // check if fetch request failed
          if (!data.data.err) {
            // append new element to the product list of specified category
            productList.insertAdjacentHTML(
              "afterbegin",
              `
          <li id="${data.data._id}" class="admin-product">
          <div>
              <div class="admin-product-img">
                  <img src="/cake_1.jpg">
              </div>
              <div class="admin-product-description">
                  <h2>${data.data.name}</h2>
                  <p class="flow-text">${data.data.description}</p>
              </div>
          </div>
          <div class="product-dropdown-container">
          <a class="product-dropdown-trigger edit-drop-trigger" href="#" data-target="dropdown2"><i class="material-icons">more_vert</i></a>
          <ul id="${data.data._id}" class="product-dropdown" style="display: none">
            <li><a href="#">Addons</a></li>
            <li><a href="#" class="add-product-allergies-btn" data-procid="${data.data._id}" >Alergies</a></li>
            <li><a href="#" class="edit-product-btn" data-procid="${data.data._id}" >Edit</a></li>
            <li><a href="#!" class="delete-product-btn" data-procid="${data.data._id}" >Delete</a></li>
          </ul>
          <div class="product-price">
          <h3>$${data.data.price}</h3>
      </div>
      </li>`
            );
          } else {
            console.log(err);
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
              let procAllergyContainer = document.getElementById(
                "product-allergy-container"
              );
              procAllergyContainer.insertBefore(
                chipContainer,
                procAllergyContainer.firstElementChild
              );

              let allergyElements =
                procAllergyContainer.firstElementChild.children;

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
document
  .querySelector(".admin-product-floater-container")
  .addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    // get edit menu input values
    let title, price, description;

    let product = new Product();

    // ++++++++++++++++++++++++++++++++++++++++
    // Update product inside selected category
    // ++++++++++++++++++++++++++++++++++++++++
    // if edit menu save button is pressed
    if (targetElement.classList.contains("product-save-btn")) {
      // get edit menu
      let productEditMenu = targetElement.closest(".edit-product-menu");

      // get product id
      let procId = productEditMenu.getAttribute("data-procid");

      // get edit menu input field values
      Object.keys(productEditMenu.children).forEach((el) => {
        let input = productEditMenu.children[el];

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

      // update and replace product element
      product.update(procId, title, description, price).then((data) => {
        if (!data.data.err) {
          // get old product element
          let oldProduct = document.getElementById(`${procId}`);

          // get product list for category
          let productList = document.querySelector(".admin-product-list");

          // create updated product
          const updatedProduct = document.createElement("li");
          updatedProduct.setAttribute("class", "admin-product");
          updatedProduct.setAttribute("id", procId);
          updatedProduct.innerHTML = `
          <div>
              <div class="admin-product-img">
                  <img src="/cake_1.jpg">
              </div>
              <div class="admin-product-description">
                  <h2>${data.data.name}</h2>
                  <p class="flow-text">${data.data.description}</p>
              </div>
          </div>
          <div class="product-dropdown-container">
          <a class="product-dropdown-trigger edit-drop-trigger" href="#" data-target="dropdown2"><i class="material-icons">more_vert</i></a>
          <ul id="${data.data._id}" class="product-dropdown" style="display: none">
            <li><a href="#" data-procid="${procId}">Addons</a></li>
            <li><a href="#" class="add-product-allergies-btn" data-procid="${procId}" >Alergies</a></li>
            <li><a href="#" class="edit-product-btn" data-procid="${procId}" >Edit</a></li>
            <li><a href="#!" class="delete-product-btn" data-procid="${procId}" >Delete</a></li>
          </ul>
        <div class="product-price">
          <h3>$${data.data.price}</h3>
        </div>
          `;

          productList.replaceChild(updatedProduct, oldProduct);
        } else {
          console.log(err);
        }
      });
    }

    // delete product handler
    if (targetElement.classList.contains("delete-product-btn")) {
      let procDeleteMenu = targetElement.closest(".delete-product-menu");
      let procId = procDeleteMenu.getAttribute("data-procid");
      product.remove(procId).then((data) => {
        if (!data.data.err) {
          let proc = document.getElementById(data.data._id);
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
      let procId = targetElement.parentElement.parentElement.getAttribute(
        "data-procid"
      );

      let chipsContainer = document.getElementById("chip-container");

      Object.keys(chipsContainer.children).forEach((key) => {
        if (
          chipsContainer.children[key].getAttribute("data-chipstatus") ===
          "active"
        ) {
          newAllArr.push(
            chipsContainer.children[key].getAttribute("data-allid")
          );
        }
      });
      product.updateProductAllergy(procId, newAllArr);
      // add event listener to close open product allergy menu
      let allergyMenu = document.getElementById("product-allergy-container");

      //hide product menu floater container
      document
        .querySelector(".admin-product-floater-container")
        .setAttribute("style", "display: none");
      //remve allergy menu from floater container
      allergyMenu.remove();
    }
  });
