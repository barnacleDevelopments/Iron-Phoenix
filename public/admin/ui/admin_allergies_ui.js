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
ADMIN ALLERGIES UI 
==============================

@ AUTHOR DEVIN S. DAVIS
*/

(function () {
  const allergyListContainer = document.getElementById(
    "allergy-list-container"
  );
  if (allergyListContainer) {
    // =================================
    // ALLERGY VIEW UI MANAGEMENT
    // =================================
    allergyListContainer.addEventListener("click", (e) => {
      // get target element
      const targetElement = e.target;
      // get add allergy button
      const addAllergyContainer = targetElement.closest(
        "#allergy-input-container"
      );
      let addAllergyBtn = targetElement.closest("#add-allergy-btn");

      // create add allergy menu element
      let addAllergyMenu = document.createElement("div");
      addAllergyMenu.setAttribute("id", "allergy-input");
      addAllergyMenu.innerHTML = ` 
            <input type="text" placeholder="add allergy here...">
                <div class="category-input-btns">
                    <a id="allergy-save-btn" class="waves-effect waves-light btn confirm-btn">save</a>
                    <a id="allergy-cancel-btn" class="waves-effect waves-light btn cancel-btn">cancle</a>
                </div>`;

      // if add allergy button is pressed show allergy input menu
      if (addAllergyBtn) {
        if (!document.getElementById("allergy-input")) {
          addAllergyContainer.replaceChild(addAllergyMenu, addAllergyBtn);
          // once open - focus first input
          addAllergyMenu.firstElementChild.focus();
        }
      }

      // if cancled or save button is pressed on allergy input replace menu with add allergy button
      if (
        targetElement.id === "allergy-save-btn" ||
        targetElement.id === "allergy-cancel-btn"
      ) {
        // create replacement add allergy button
        addAllergyBtn = document.createElement("a");
        addAllergyBtn.setAttribute("id", "add-allergy-btn");
        addAllergyBtn.setAttribute("class", "waves-effect waves-light btn");
        let addAllergyBtnText = document.createTextNode("add allergy");
        addAllergyBtn.appendChild(addAllergyBtnText);
        // sellect active allergy input menu
        addAllergyMenu = targetElement.parentNode.closest("#allergy-input");
        // replace allergy input menu with replacement button
        addAllergyContainer.replaceChild(addAllergyBtn, addAllergyMenu);
      }
    });
  }
})();
