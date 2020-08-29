//=================================
// GET ALL PRODUCTS
//=================================

// Get All Categories

(function () {
  let category = new Category();

  let categories = category.getAll();

  categories.then((cats) => {
    cats.data.forEach((cat) => {
      $(".admin-category-list").append(`            
    <li>
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
            <i class="material-icons">more_vert</i>
        </a>
        <ul class="category-dropdown" style="display: none;">
            <li data-catid="${cat._id}" class="edit-category-btn">edit</li>
            <li data-catid="${cat._id}" class="delete-category-btn">delete</li>
        </ul>
    </div>
    </div>
    <div class="collapsible-body">
        <ul class=" admin-product-list">
            <li class="admin-product">
                <div>
                    <div class="admin-product-img">
                        <img src="/cake_1.jpg">
                    </div>
                    <div class="admin-product-description">
                        <h2>Product</h2>
                        <p class="flow-text">
                            {{elipsis "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet." 35}}</p>
                    </div>
                </div>
                <div class="product-dropdown">
                    <div>
                        <a class='dropdown-trigger edit-drop-trigger' href='#'
                            data-target='dropdown2'><i class="material-icons">more_vert</i></a>
                        <ul id='dropdown2' class='dropdown-content'>
                            <li><a href="#!">Addons</a></li>
                            <li><a href="#!">Alergies</a></li>
                            <li><a href="#!" class="edit-product-btn">Edit</a></li>
                            <li><a href="#!" class="delete-product-btn">Delete</a></li>
                        </ul>
                    </div>
                    <div class="product-price">
                        <h3>$50.00</h3>
                    </div>
                </div>
            </li>

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
    </div>
</li>
`);
    });
  });
})();

// Create New Category
$("#category-create-btn").on("click", () => {
  var name = $("#add-category-input").val();
  let category = new Category();
  let newCategory = category.create(name);
  newCategory.then((data) => {
    $(".admin-category-list").append(`            
    <li >
    <div class="category-header-container">
        <div class="collapsible-header">
            <div>
                <div class="admin-category-img">
                    <img src="/cake_1.jpg">
                </div>
                <div>
                    <h1>${name}</h1>
                </div>
            </div>
        </div>
        <div class="category-dropdown-container">
        <a class="category-dropdown-trigger">
            <i class="material-icons">more_vert</i>
        </a>
        <ul class="category-dropdown" style="display: none;">
            <li class="edit-category-btn">edit</li>
            <li class="delete-category-btn">delete</li>
        </ul>
    </div>
    </div>
    <div class="collapsible-body">
        <ul class=" admin-product-list">
            <li class="admin-product">
                <div>
                    <div class="admin-product-img">
                        <img src="/cake_1.jpg">
                    </div>
                    <div class="admin-product-description">
                        <h2>Product</h2>
                        <p class="flow-text">
                            {{elipsis "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet." 35}}</p>
                    </div>
                </div>
                <div class="product-dropdown">
                    <div>
                        <a class='dropdown-trigger edit-drop-trigger' href='#'
                            data-target='dropdown2'><i class="material-icons">more_vert</i></a>
                        <ul id='dropdown2' class='dropdown-content'>
                            <li><a href="#!">Addons</a></li>
                            <li><a href="#!">Alergies</a></li>
                            <li><a href="#!" class="edit-product-btn">Edit</a></li>
                            <li><a href="#!" class="delete-product-btn">Delete</a></li>
                        </ul>
                    </div>
                    <div class="product-price">
                        <h3>$50.00</h3>
                    </div>
                </div>
            </li>

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
    </div>
</li>
`);
    console.log("New category created!");
  });
});

//edit category
$("#save-edit-category-btn").on("click", (e) => {
  let editMenu = document.querySelector(".edit-category-menu");
  let catName = editMenu.children[0].value;
  let catId = editMenu.getAttribute("data-catid");
  let category = new Category();
  category.update(catId, catName);
});

$(".delete-confirm-btn").on("click", (e) => {
  let deleteMenu = document.querySelector(".delete-prompt");
  console.log(deleteMenu);
  let catId = deleteMenu.getAttribute("data-catid");
  let category = new Category();
  category.remove(catId);
});
