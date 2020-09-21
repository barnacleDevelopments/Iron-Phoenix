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
//=================================
// ADMIN CATEGORY HANDLERS
//=================================

@ AUTHOR DEVIN S. DAVIS
*/

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
        document
          .querySelector(".admin-category-list")
          .append(createCategoryElement(cat._id, cat.name));
      } else {
        console.log(cat.errMessage);
      }
    });
  });
})();

// ==================================
// PRODUCT CONTAINER EVENT HANDLERS
// ==================================

document
  .querySelector(".admin-products-container")
  .addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;

    // ++++++++++++++++++++++++++++
    // CREATE NEW CATEGORY
    // +++++++++++++++++++++++++++
    if (targetElement.id === "category-create-btn") {
      let name = $("#add-category-input").val();
      let category = new Category();
      let newCategory = category.create(name);
      newCategory.then((cat) => {
        if (!cat.data.err) {
          document
            .querySelector(".admin-category-list")
            .append(createCategoryElement(cat.data._id, cat.data.name));
        } else {
          console.log(cat.errMessage);
        }
      });
    }
  });

// ================================
// FORM CONTAINER EVENT HANDLERS
// ===============================
document.getElementById("form-container").addEventListener("click", (e) => {
  // get target element
  let targetElement = e.target;
  // if target element categorty save btn - save the edited name
  if (targetElement.id === "save-edit-category-btn") {
    // get form body
    let formBody = targetElement.closest(".form-body");
    let catName = formBody.children[0].value;
    let catId = formBody.getAttribute("data-catid");

    let category = new Category();
    category.update(catId, catName).then((modCat) => {
      if (!modCat.data.err) {
        $(`#${catId}`).replaceWith(
          createCategoryElement(modCat.data._id, modCat.data.name)
        );
      } else {
        console.log(modCat.data.errMessage);
      }
    });
  }
  // if delete confirm button is pressed - delete the category from the DOM & database
  if (targetElement.id === "delete-confirm-btn") {
    let formBody = targetElement.closest(".form-body");
    let catId = formBody.getAttribute("data-catid");
    let category = new Category();
    category.remove(catId).then((data) => {
      if (!data.err) {
        $(`#${catId}`).remove();
      } else {
        console.log(data.errMessage);
      }
    });
  }
});
