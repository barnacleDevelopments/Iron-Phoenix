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
ADMIN ALLERGY HANDLERS 
==============================

@ AUTHOR DEVIN S. DAVIS
*/

// ======================================
// ALLERGY MANAGEMENT HANDLER MANAGEMENT
// ======================================
const allergy = new Allergy();
// get allergy chip list
let allChipsList = document.getElementById("allergy-chips");

/*
++++++++++++++++++++
Get All Allergies
++++++++++++++++++++
*/
(function () {
  allergy.getAll().then((allergies) => {
    console.log(allergies);
    if (!allergies.data.err) {
      allergies.data.forEach((all) => {
        let chip = new Chip(all._id, all.name)
        let allChip = chip.createBasic(false);

        allChipsList.append(allChip);
      });
    } else {
      console.log(allergies.data.errMessage);
    }
  });
})();

/*
++++++++++++++++++++
Create New Allergy
++++++++++++++++++++
*/

document
  .getElementById("allergy-list-container")
  .addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;

    // if allergy save button is clicked handle allergy create request
    if (targetElement.id === "allergy-save-btn") {
      let allName = targetElement.parentElement.previousElementSibling.value;
      allergy.create(allName).then((allergy) => {
        if (!allergy.data.err) {
          // append to chip element to allergy list elemenet
          let chip = new Chip(allergy.data._id, allergy.data.name)
          let newChip = chip.create(false);
          allChipsList.append(newChip);
        } else {
          console.log(data.data.errMessage);
        }
      });
    }
    if (targetElement.classList.contains("material-icons")) {
      let allId = targetElement.id;
      allergy.remove(allId).then((allergy) => {
        if (allergy.data.err) {
          console.log(allergy.data.errMessage);
        }
      });
    }
  });
