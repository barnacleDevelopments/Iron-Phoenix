/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-10-19
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
//=================================
// TIP ELEMENT CLASS
//=================================

@ AUTHOR DEVIN S. DAVIS
*/

class Tip {
  constructor() {
    this.tipMessage = "this is a tip message";
    this.tipColor = "#5cb85c";
    this.tipComment = "This is a comment";
  }

  warningTip(id, message, dropDownMessage) {
    // change tip color
    this.tipColor = "red";
    // if no id was provided throw an error
    if (!id) {
      throw Error("No id was provided to tip element");
    }
    //  if tip message provided change the default message
    if (message) {
      this.tipMessage = message;
    }
    // create element
    let element = document.createElement("div");

    // give element id
    element.setAttribute("data-tipnum", id);

    // create title & text
    element.innerHTML = `
        <div style="background-color: ${this.tipColor}">
          <p style="display: inline; color: #ffffff">${this.tipMessage}</p>
          <i class="material-icons">arrow_drop_down</i>
        </div>
        `;
    // if a dropdown message is provided add dropdown to tip
    if (dropDownMessage) {
      this.addDropDown(element, dropDownMessage);
    }
    return element;
  }

  addDropDown(element) {
    element.addEventListener("click", () => {
      if (!document.getElementById("tip-element")) {
        let tipElement = document.createElement("div");
        tipElement.setAttribute("id", "tip-element");
        tipElement.setAttribute(
          "style",
          `width: 100%; background-color: #ffffff; padding: 10px 20px; border: 2px solid ${this.tipColor}`
        );
        tipElement.innerHTML = `<p style="color:black; font-size: 14px !important; text-indent: 20px;">Tip: ${this.tipComment}</p>`;
        element.append(tipElement);
      } else {
        document.getElementById("tip-element").remove();
      }
    });
  }
}
