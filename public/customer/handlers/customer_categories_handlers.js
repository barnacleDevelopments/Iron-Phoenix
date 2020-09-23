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
==============================
CUSTOMER CATEGORY HANDLERS 
==============================

@ AUTHOR DEVIN S. DAVIS
*/
/*
===================================
CATEGORY LIST EVENT HANDLERS
===================================
*/

let Cat = new Category();
let Proc = new Product();
// Get All Categories From Database
(() => {
  // Get Categories List
  const categoriesList = document.getElementById("categories-list");
  Cat.getAll().then((categories) => {
    // Append Preloader While Categories Are Retrieved
    categoriesList.insertAdjacentHTML("afterbegin", createBigPreloader());
    // If No Errors apend to Categories List
    if (!categories.data.err) {
      categoriesList.innerHTML = "";
      // iterate over all categories
      categories.data.forEach((category) => {
        Proc.count(category._id).then((procCount) => {
          if (!procCount.err) {
            categoriesList.insertAdjacentHTML(
              "afterbegin",
              createCategoryCard(
                category._id,
                category.name,
                category.img,
                procCount.count
              )
            );
          } else {
            console.log(procCount.errMessage);
          }
        });
      });
    } else {
      console.log(categories.data.errMessage);
    }
  });
})();
