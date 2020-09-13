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
function createAddonChip(name, price, id) {
  let chip = document.createElement("div");
  chip.innerHTML = `<li id="${id}" style="background-color: #ffffff; display: flex; justify-content: space-between; padding: 10px 20px; border-radius: 3px; margin-bottom: 14px;"><div>$${price}</div> <div style="min-width: 0px;"><p style="margin: 0px 5px 0px 5px; font-size: 16px !important; text-overflow: ellipsis; white-space: nowrap; overflow:hidden">${name}</p></div><i class="close material-icons">close</i></li>`;
  return chip;
}

/*
  +++++++++++++++++++++++++++++++
  ADDON CLASSES
  +++++++++++++++++++++++++++++++
*/
// Get Addons Class
const Add = new Addon();
/*
  +++++++++++++++++++++++++++++++
  ADDON LIST EVENT LISTENRS
  +++++++++++++++++++++++++++++++
*/
// Get Addon Display List
const addonList = document.getElementById("addon-list");

// On page Load - Append Each Allergy from Database
(() => {
  Add.getAll().then((as) => {
    if (!as.data.err) {
      as.data.forEach((a) => {
        addonList.append(createAddonChip(a.name, a.price, a._id));
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
    Add.create(name, price).then((a) => {
      if (!a.data.err) {
        console.log(a);
        addonList.append(
          createAddonChip(a.data.name, a.data.price, a.data._id)
        );
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
  // if target element is close - icon delete the chip from the DOM & database
  if (targetElement.classList.contains("close")) {
    Add.remove(targetElement.parentElement.id).then((a) => {
      if (!a.data.err) {
        document.getElementById(a.data._id).remove();
      } else {
        console.log(a.data.errMessage);
      }
    });
  }
});
