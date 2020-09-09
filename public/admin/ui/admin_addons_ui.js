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

function createAddonInput() {
  let addonInput = document.createElement("div");
  addonInput.innerHTML = ` 
    <div id="addons-input" 
    style="display: flex;
           flex-direction: column;
           align-items: flex-end;
           background-color: #f5f5f5;
           margin-bottom: 14px;
           padding: 14px;
           ">
      <input type="text" placeholder="add addon name here..." 
      style="  background-color: #ffffff;
               padding-left: 10px;
               -moz-box-sizing: border-box;
               -webkit-box-sizing: border-box;
               box-sizing: border-box;
               gap: 10px !important;
               border: none !important;
               border: 1px solid #cccccc !important
               ">
      <input type="text" placeholder="add price per portion here..." 
      style="  background-color: #ffffff;
               padding-left: 10px;
               -moz-box-sizing: border-box;
               -webkit-box-sizing: border-box;
               box-sizing: border-box;
               gap: 10px !important;
               border: none !important;
               border: 1px solid #cccccc !important
               ">
      <div class="addons-input-btns">
          <a id="addon-save-btn" class="waves-effect waves-light btn save-btn">save</a>
          <a id="addon-cancel-btn" class="waves-effect waves-light btn cancel-btn" style="  margin-left: 10px;">cancle</a>
      </div>
  </div>`;
  return addonInput;
}
function createAddonBtn() {
  let createBtn = document.createElement("a");
  let createBtnText = document.createTextNode("add addon");
  createBtn.setAttribute("id", "add-addon-btn");
  createBtn.setAttribute("class", "waves-effect waves-light btn add-addon-btn");
  createBtn.appendChild(createBtnText);

  return createBtn;
}

/*
    +++++++++++++++++++++++++++++++
  ADMIN ADDONS UI MANAGEMENT EVENT LISTENERS 
    +++++++++++++++++++++++++++++++
  */

// Add Event Listener to Addon Container
let addonContainer = document.getElementById("addon-container");

addonContainer.addEventListener("click", (e) => {
  // get target element
  let targetElement = e.target;
  // If Target Element Is Addon Button - Create Addon Input Element
  if (targetElement.id === "add-addon-btn") {
    let addonInput = createAddonInput();
    // replace button with input
    targetElement.parentElement.replaceChild(addonInput, targetElement);

    // once open - focus first input

    document.getElementById("addons-input").firstElementChild.focus();
  }

  if (
    targetElement.id === "addon-save-btn" ||
    targetElement.id === "addon-cancel-btn"
  ) {
    //   select created addon input
    let addonInput = document.getElementById("addons-input");
    addonInput.parentElement.replaceChild(createAddonBtn(), addonInput);
  }
});
