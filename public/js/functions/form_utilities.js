/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-10-13
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
  @ AUTHOR DEVIN S. DAVIS
  
 */

/*
//=================================
// FORM UTILITIES
//=================================
*/

// Checks if cancle or confirm button is pressed and remove the form
function removeForm(e, element) {
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
}

// appends tips to forms to communicate to users helpful category/product labeling strategies.
function checkForTip(e, element) {
  // get target element
  let targetElement = e.target;
  // get inputed string
  let String = new StringValidater(targetElement.value);

  // get tip container
  let tipContainer = document.getElementById("form-tip-container");

  // if inputed text includes too many charecters prompt the user

  if (
    String.seperatedExeeds(10) &&
    !document.querySelector("[data-tipnum='1']")
  ) {
    // create new tip element
    let newTip = new Tip();
    let tip = newTip.warningTip(
      "1",
      "Your Words are too long",
      "this is a comment"
    );
    tipContainer.append(tip);
  } else if (
    !String.seperatedExeeds(10) &&
    document.querySelector("[data-tipnum='1']")
  ) {
    // if tip already exists & does not exeed limit remove from container
    document.querySelector("[data-tipnum='1']").remove();
  }

  if (String.isBiggerThen(20) && !document.querySelector("[data-tipnum='2']")) {
    let tipElement = createFormTip(
      "recomend",
      "Your title is too long!",
      "Shorter titles capture the users attention more easily online"
    );
    tipElement.setAttribute("data-tipnum", "2");
    // get tip color
    let tipColor = tipElement.getAttribute("data-tipcolor");
    tipElement.setAttribute(
      "style",
      `position: relative; top: 0px; animation: openTipMenu .3s ease-in forwards; background-color: ${tipColor}`
    );
    // append tip to tip container
    tipContainer.append(tipElement);
  } else if (
    !String.isBiggerThen(20) &&
    document.querySelector("[data-tipnum='2']")
  ) {
    document.querySelector("[data-tipnum='2']").remove();
  }
}
