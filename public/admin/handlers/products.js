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

    // Fetch all products for sellected category
    if (targetElement.closest(".collapsible-header")) {
      let catId = targetElement.closest("li").id;
      console.log(catId);
      // product.create(catId, "Coco", "A delicious cookie.", 10);
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
            console.log(data);
            data.data.forEach((product) => {
              targetElement
                .closest(".collapsible-header")
                .parentElement.nextElementSibling.lastChild.insertAdjacentHTML(
                  "afterbegin",
                  `
              <li ${product._id} class="admin-product">
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
              <ul class="product-dropdown" style="display: none">
                <li><a href="#">Addons</a></li>
                <li><a href="#">Alergies</a></li>
                <li><a href="#" class="edit-product-btn">Edit</a></li>
                <li><a href="#!" class="delete-product-btn">Delete</a></li>
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

    // Create product inside selected category
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
      console.log(catId);
      product
        .create(catId, productTitle, productDescription, productPrice)
        .then((data) => {
          // check if fetch request failed
          console.log(data);
          if (!data.data.err) {
            // append new element to the product list of specified category
            productList.insertAdjacentHTML(
              "afterbegin",
              `
          <li class="admin-product">
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
          <ul class="product-dropdown" style="display: none">
            <li><a href="#">Addons</a></li>
            <li><a href="#">Alergies</a></li>
            <li><a href="#" class="edit-product-btn">Edit</a></li>
            <li><a href="#!" class="delete-product-btn">Delete</a></li>
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

    // Update product inside selected category
  });
