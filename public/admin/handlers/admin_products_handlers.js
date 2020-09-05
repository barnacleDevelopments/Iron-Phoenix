//=================================
// PRODUCT HANDLERS
//=================================

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
        let products = product.getAll(catId);
        products.then((data) => {
          // check if fetch request failed
          if (!data.err) {
            // loop through all products and append them to specfied product list
            data.data.forEach((product) => {
              targetElement
                .closest(".collapsible-header")
                .parentElement.nextElementSibling.lastChild.insertAdjacentHTML(
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
            console.log(err);
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
      console.log(productPrice, productTitle, productDescription);

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
  });

// ++++++++++++++++++++++++++++++++++++++++
// Update product inside selected category
// ++++++++++++++++++++++++++++++++++++++++
document
  .querySelector(".admin-product-floater-container")
  .addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    // get edit menu input values
    let title, price, description;

    let product = new Product();

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

      // update and replace element
      product.update(procId, title, description, price).then((data) => {
        if (!data.data.err) {
          // get old product element
          let oldProduct = document.getElementById(`${procId}`);
          console.log(oldProduct);
          // get product list for category
          let productList = document.querySelector(".admin-product-list");

          // create updated product
          const updatedProduct = document.createElement("li");
          updatedProduct.setAttribute("class", "admin-product");
          updatedProduct.setAttribute("id", procId);
          updatedProduct.innerHTML = `<div>
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
          console.log(updatedProduct);
        } else {
          console.log(err);
        }
      });
    }

    if (targetElement.classList.contains("delete-product-btn")) {
      let procDeleteMenu = targetElement.closest(".delete-product-menu");
      console.log(procDeleteMenu);
      let procId = procDeleteMenu.getAttribute("data-procid");
      console.log(procDeleteMenu);
      product.remove(procId).then((data) => {
        if (!data.data.err) {
          let proc = document.getElementById(data.data._id);
          proc.remove();
        } else {
          console.log(data.data.errMessage);
        }
      });
    }
  });
