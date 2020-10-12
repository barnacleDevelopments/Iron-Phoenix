/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-10-10
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
//=================================
// ADMIN DYNAMIC COMPONENTS 
//=================================

@ AUTHOR DEVIN S. DAVIS
*/

function createAddonEditForm() {
  // create element
  console.log(arguments[0]);
  let element = document.createElement("div");
  element.setAttribute("class", "form-body");
  element.innerHTML = `
          <input id="addon-input-name" type="text" placeholder="${arguments[0]}"/>
          <input id="addon-input-price" placeholder="${arguments[1]}"/>
          <a id="save-edit-addon-btn" class="waves-effect waves-light btn confirm-btn">save</a>
          <a class="waves-effect waves-light btn cancel-btn">cancle</a>
    `;

  // add closing event listener
  element.addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    // if target element save button or cancel button - close the menu
    if (
      targetElement.classList.contains("confirm-btn") ||
      targetElement.classList.contains("cancel-btn")
    ) {
      element.remove();
      formContainer.setAttribute("style", "display: none");
      // remove tip if exists
      // get tip element
      let tipMenu = document.getElementById("tip-menu");
      if (tipMenu) {
        tipMenu.remove();
      }
    }
  });

  return element;
}

// Allergy item
function createAddon(name, price, id) {
  let addonListItem = document.createElement("li");
  addonListItem.id = id;
  addonListItem.setAttribute(
    "style",
    "background-color: #ffffff; display: flex; justify-content: space-between; padding: 10px 20px; border-radius: 3px; margin-bottom: 14px;"
  );
  addonListItem.innerHTML = `
    <div>$${price}</div> 
      <div style="min-width: 0px;">
      <p style="margin: 0px 5px 0px 5px; font-size: 16px !important; text-overflow: ellipsis; white-space: nowrap; overflow:hidden">${name}</p>
    </div>
    <i class="fas fa-edit edit-btn"></i>
`;
  return addonListItem;
}
