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
ADMIN ADDONS HANDLERS
==============================

@ AUTHOR DEVIN S. DAVIS
*/

/*
  +++++++++++++++++++++++++++++++
  ELEMENT CREATION FUNCTIONS
  +++++++++++++++++++++++++++++++
*/
/*
  +++++++++++++++++++++++++++++++
  ADDON CLASSES
  +++++++++++++++++++++++++++++++
*/
// Get Addons Class
const addon = new Addon();
/*
  +++++++++++++++++++++++++++++++
  ADDON LIST EVENT LISTENRS
  +++++++++++++++++++++++++++++++
*/
// Get Addon Display List
const addonList = document.getElementById("addon-list");

// On page Load - Append Each Allergy from Database
(() => {
  addon.getAll().then((as) => {
    if (!as.data.err) {
      as.data.forEach((a) => {
        addonList.append(createAddon(a.name, a.price, a._id));
      });
    } else {
      console.log(as.data.errMessage);
    }
  });
})();

// Add Adon to the Database
addonContainer.addEventListener("click", (e) => {
  // Get Target Element
  let targetElement = e.target;
  //   If Addon Input SAve Button is Clicked Append Addon to List
  if (targetElement.id === "addon-save-btn") {
    // get addon input
    let addonIntputMenu = targetElement.closest("#addons-input");

    // get addon input values
    let name = addonIntputMenu.firstElementChild.value;
    let price = addonIntputMenu.firstElementChild.nextElementSibling.value;

    // add addon to database & to the DOM
    addon.create(name, price).then((a) => {
      if (!a.data.err) {
        console.log(a);
        addonList.append(createAddon(a.data.name, a.data.price, a.data._id));
      } else {
        console.log(a.data.errMessage);
      }
    });
  }
});

// Delete Addon from Database
addonList.addEventListener("click", (e) => {
  // get target element
  let targetElement = e.target;
  if (targetElement.classList.contains("edit-btn")) {
    // get form container
    let formContainer = document.getElementById("form-container");
    formContainer.style.display = "flex";
    // create edit form
    let editForm = createAddonEditForm();
    // add event listeners to edit form
    editForm.addEventListener("click", (e) => {
      let formTarget = e.target;
      if (formTarget.id === "save-edit-addon-btn") {
        // get input valeus
        let addonName = editForm.firstElementChild.value;
        let addonPrice = editForm.children[1].value;

        // get addon id
        let addonId = targetElement.closest("li").id;

        // update addon in database
        addon.update(addonId, addonName, addonPrice).then((a) => {
          if (!a.data.err) {
            let oldAddon = document.getElementById(addonId);

            let editedAddon = createAddon(
              a.data.name,
              a.data.price,
              a.data._id
            );

            addonList.replaceChild(editedAddon, oldAddon);
          } else {
            console.log(a.data.errMessage);
          }
        });
      }
    });
    formContainer.append(editForm);
  }
});
