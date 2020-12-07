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

// get all the categories and append to DOM
const getAllCategories = () => {
  let category = new Category();
  let categories = category.getAll();
  categories.then((cats) => {
    cats.data.forEach((cat) => {
      if (!cat.err) {
        let element = new CategoryElement(cat._id, cat.name)
        let categoryElement = element.createCategory(() => {
          
          getProducts(cat._id, element.catProdList)
        })
        document
          .querySelector(".content-list")
          .append(categoryElement);
      } else {
        console.log(cat.errMessage);
      }
    });
  });
}

// add category and append to the DOM
const addCategory = (name, container) => {
  let category = new Category();
  category.create(name).then((cat) => {
     if (!cat.data.err) {
       let element = new CategoryElement(cat.data._id, name)
       let categoryElement = element.createCategory(() => {
         getProducts(cat.data._id, element.catProdList)
       })
       container.append(categoryElement)
     } else {
       console.log(cat.errMessage);
     }
   });
}


// ================================
// FORM EVENT HANDLERS
// ===============================
document.body.addEventListener("click", (e) => {
  // get target element
  let catId
  let targetElement = e.target;
  let categoryList = document.querySelector("#admin-category-list")

  if (targetElement.id === "category-create-btn") {
    let name = $("#add-category-input").val();
    addCategory(name, categoryList)
  }

  // if target element categorty save btn - save the edited name
  if (targetElement.classList.contains("confirm-btn") && targetElement.closest("#cat-edit-form")) {
    // get form body
    let formBody = targetElement.closest(".form-body");
        catId = formBody.getAttribute("data-id");
    let catName = formBody.children[0].value;
    let category = new Category();
    category.update(catId, catName).then((modCat) => {
      if (!modCat.data.err) {
        let element = new CategoryElement(modCat.data._id, catName)
        let oldCategoryElement = document.getElementsByClassName(catId)[0]
        let newCategoryElement = element.createCategory(() => {
          getProducts(modCat.data._id, element.catProdList)
        })
        categoryList.replaceChild(newCategoryElement, oldCategoryElement)
      } else {
        console.log(modCat.data.errMessage);
      }
    });
  }

  // if delete confirm button is pressed - delete the category from the DOM & database
  if (targetElement.classList.contains( "confirm-btn") && targetElement.closest("#cat-del-form")) {
    let formBody = targetElement.closest(".form-body");
    let catId = formBody.getAttribute("data-id");
    let category = new Category();
    category.remove(catId).then((data) => {
      if (!data.err) {
        let categoryElement = document.getElementsByClassName(catId)[0]
        categoryElement.remove()
      } else {
        console.log(data.errMessage);
      }
    });
  }
});


getAllCategories()