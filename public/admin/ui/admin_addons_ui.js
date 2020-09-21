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
ADMIN ADDONS UI MANAGEMENT EVENT
==============================

@ AUTHOR DEVIN S. DAVIS
*/

/*
  +++++++++++++++++++++++++++++++
  FUNCTIONS
  +++++++++++++++++++++++++++++++
*/

/*
    +++++++++++++++++++++++++++++++
  ADMIN ADDONS UI MANAGEMENT EVENT LISTENERS 
    +++++++++++++++++++++++++++++++
  */

// Add Event Listener to Addon Container
let addonContainer = document.getElementById("addon-container");
let addonFormElement = document.getElementById("addons-input");
let addonAddButton = document.getElementById("add-addon-btn");

addonContainer.addEventListener("click", (e) => {
  // get target element
  let targetElement = e.target;
  // If Target Element Is Addon Button - display addon input element
  if (targetElement.id === "add-addon-btn") {
    // replace button with input
    targetElement.setAttribute("style", "display: none");
    addonFormElement.setAttribute("style", "display: flex");
  }

  if (
    targetElement.id === "addon-save-btn" ||
    targetElement.id === "addon-cancel-btn"
  ) {
    //
    addonFormElement.setAttribute("style", "display: none");
    addonAddButton.setAttribute("style", "display: block");
  }
});
