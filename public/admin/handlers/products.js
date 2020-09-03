//=================================
// PRODUCT HANDLERS
//=================================

document
  .querySelector(".admin-category-list")
  .addEventListener("click", (e) => {
    let targetElement = e.target;
    if (targetElement.closest(".collapsible-header")) {
      let catId = targetElement.closest("li").id;
      let product = new Product();

      let products = product.getAll(catId);
      products.then((data) => {
        if (!data.err) {
          console.log(data);
          console.log(
            $(
              targetElement.closest(".collapsible-header").parentElement
                .nextElementSibling.lastChild
            ).length >= 1
          );
          if (
            !$(
              targetElement.closest(".collapsible-header").parentElement
                .nextElementSibling.lastChild
            ).length >= 1
          ) {
            data.data.forEach((product) => {
              $(
                targetElement.closest(".collapsible-header").parentElement
                  .nextElementSibling.lastChild
              ).before(`
              <li class="admin-product">
              <div>
                  <div class="admin-product-img">
                      <img src="/cake_1.jpg">
                  </div>
                  <div class="admin-product-description">
                      <h2>${product.name}</h2>
                      <p class="flow-text">${product.description}</p>
                  </div>
              </div>
              <div class="product-dropdown">
                  <div>
                      <a class="dropdown-trigger edit-drop-trigger" href="#" data-target="dropdown2"><i class="material-icons">more_vert</i></a>
                      <ul id="dropdown2" class="dropdown-content">
                          <li><a href="#!">Addons</a></li>
                          <li><a href="#!">Alergies</a></li>
                          <li><a href="#!" class="edit-product-btn">Edit</a></li>
                          <li><a href="#!" class="delete-product-btn">Delete</a></li>
                      </ul>
                  </div>
                  <div class="product-price">
                      <h3>$${product.price}</h3>
                  </div>
              </div>
          </li>`);
            });
          }
        }
      });
    }
  });