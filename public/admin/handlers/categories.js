//=================================
// CATEGORY HANDLERS
//=================================

// +++++++++++++++++++++++++++++++++++++++
// Get All Categories
// +++++++++++++++++++++++++++++++++++++++
(function () {
  let category = new Category();

  // get all the categories
  let categories = category.getAll();
  // handle recieved data
  categories.then((cats) => {
    cats.data.forEach((cat) => {
      if (!cat.err) {
        console.log("Loaded all categories");
        document.querySelector(".admin-category-list").insertAdjacentHTML(
          "afterbegin",
          `            
      <li id="${cat._id}">
      <div class="category-header-container">
          <div class="collapsible-header">
              <div>
                  <div class="admin-category-img">
                      <img src="/cake_1.jpg">
                  </div>
                  <div>
                      <h1>${cat.name}</h1>
                  </div>
              </div>
          </div>
          <div class="category-dropdown-container">
          <a class="category-dropdown-trigger">
              <i class="material-icons ">more_vert</i>
          </a>
          <ul class="category-dropdown" style="display: none;">
              <li data-catid="${cat._id}" class="edit-category-btn">edit</li>
              <li data-catid="${cat._id}" class="delete-category-btn">delete</li>
          </ul>
      </div>
      </div>
      <div class="collapsible-body">
          <ul data-catid="${cat._id}" class=" admin-product-list">
          
  
              <li data-catid="${cat._id}" class="product-input" style="display: none;">
                <input class="category-title-input" type="text" placeholder="add product title here...">
                <input class="category-price-input" type="text" placeholder="add price...">
                <input class="category-description-input" type="text" placeholder="add description...">
  
                  <div class="product-input-btns">
                      <a class="waves-effect waves-light btn product-save-btn">save</a>
                      <a class="waves-effect waves-light btn product-cancel-btn">cancle</a>
                  </div>
              </li>
  
              <a class="waves-effect waves-light btn add-product-btn">Add Product</a>
      </div>
  </li>
  `
        );
      } else {
        console.log(cat.errMessage);
      }
    });
  });
})();

// ==================================
// RODUCT CONTAINER EVENT HANDLERS
// ==================================

document
  .querySelector(".admin-products-container")
  .addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    // ++++++++++++++++++++++++++++
    // CREATE NEW CATEGORY
    // +++++++++++++++++++++++++++
    if (targetElement.classList.contains("category-save-btn")) {
      console.log("New category created!");
      let name = $("#add-category-input").val();
      let category = new Category();
      let newCategory = category.create(name);
      newCategory.then((cat) => {
        if (!cat.data.err) {
          document.querySelector(".admin-category-list").insertAdjacentHTML(
            "afterbegin",
            `<li id="${cat.data._id}">
        <div class="category-header-container">
            <div class="collapsible-header">
                <div>
                    <div class="admin-category-img">
                        <img src="/cake_1.jpg">
                    </div>
                    <div>
                        <h1>${cat.data.name}</h1>
                    </div>
                </div>
            </div>
            <div class="category-dropdown-container">
            <a class="category-dropdown-trigger">
                <i class="material-icons ">more_vert</i>
            </a>
            <ul class="category-dropdown" style="display: none;">
                <li data-catid="${cat.data._id}" class="edit-category-btn">edit</li>
                <li data-catid="${cat.data._id}" class="delete-category-btn">delete</li>
            </ul>
        </div>
        </div>
        <div class="collapsible-body">
            <ul data-catid="${cat.data._id}" class=" admin-product-list">
                <li data-catid="${cat.data._id}" class="product-input" style="display: none;">
                   
                  <input class="category-title-input" type="text" placeholder="add product title here...">
                  <input class="category-price-input" type="text" placeholder="add price...">
                  <input class="category-description-input" type="text" placeholder="add description...">
    
                    <div class="product-input-btns">
                        <a class="waves-effect waves-light btn product-save-btn">save</a>
                        <a class="waves-effect waves-light btn product-cancel-btn">cancle</a>
                    </div>
                </li>
                <a class="waves-effect waves-light btn add-product-btn">Add Product</a>
        </div>
    </li>
    `
          );
        } else {
          console.log(cat.errMessage);
        }
      });
    }
  });

// ================================
// PRODUCT LIST EVENT HANDLERS
// =============================
document
  .querySelector(".admin-product-floater-container")
  .addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;

    // +++++++++++++++++++++++++++++++++++
    // UPDATE EXISTING CATEGORY
    // +++++++++++++++++++++++++++++++++++
    if (targetElement.classList.contains("category-save-btn")) {
      let editMenu = targetElement.parentElement.closest(".edit-category-menu");
      console.log(editMenu);

      let catName = document.querySelector("#edit-category-input");
      let catId = editMenu.getAttribute("data-catid");
      console.log(catName);
      let category = new Category();
      category.update(catId, catName).then((modCat) => {
        if (!modCat.err) {
          console.log("Category Updated!");
          $(`#${catId}`).replaceWith(
            `            
        <li id="${modCat._id}">
        <div class="category-header-container">
            <div class="collapsible-header">
                <div>
                    <div class="admin-category-img">
                        <img src="/cake_1.jpg">
                    </div>
                    <div>
                        <h1>${catName}</h1>
                    </div>
                </div>
            </div>
            <div class="category-dropdown-container">
            <a class="category-dropdown-trigger">
                <i class="material-icons">more_vert</i>
            </a>
            <ul class="category-dropdown" style="display: none;">
                <li data-catid="${catId}" class="edit-category-btn">edit</li>
                <li data-catid="${catId}" class="delete-category-btn">delete</li>
            </ul>
        </div>
        </div>
        <div class="collapsible-body">
            <ul class=" admin-product-list">
              <li class="product-input" style="display: none;">
                  <div class="title_price-inputs">
                      <input type="text" placeholder="add product title here...">
                      <input type="text" placeholder="add price...">
                  </div>
  
                  <input type="text" placeholder="add description...">
  
                  <div class="product-input-btns">
                      <a class="waves-effect waves-light btn product-save-btn">save</a>
                      <a class="waves-effect waves-light btn product-cancel-btn">cancle</a>
                  </div>
              </li>
                <a class="waves-effect waves-light btn add-product-btn">Add Product</a>
              </ul>
        </div>
    </li>
    `
          );
        } else {
          console.log(modCat.errMessage);
        }
      });
    }
  });

$(".delete-confirm-btn").on("click", (e) => {
  let deleteMenu = document.querySelector(".delete-category-menu");
  let catId = deleteMenu.getAttribute("data-catid");
  let category = new Category();
  category.remove(catId).then((data) => {
    if (!data.err) {
      $(`#${catId}`).remove();
    } else {
      console.log(data.errMessage);
    }
  });
});
