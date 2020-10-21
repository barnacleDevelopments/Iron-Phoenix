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
=================================
CHIP ELEMENT CLASS
=================================

@ AUTHOR DEVIN S. DAVIS
*/


class Chip {
    constructor(id, name, status) {
        this.id = id
        this.name = name
        this.status = status
    }
// create chip element
create(hasStatusMod) {
    let element = document.createElement("div");
    element.setAttribute("class", "chip");
    element.setAttribute("data-allid", this.id);
    element.innerHTML = `${this.name}`;
    element.setAttribute("data-chipstatus", this.status);
    if (this.status === "active") {
      element.setAttribute(
        "style",
        "background-color: #5cb85c; color: white;"
      );
    } else {
      element.setAttribute(
        "style",
        "background-color: #e4e4e4; color: #0009;"
      );
    }
    if(hasStatusMod) {
     
      this.addStatusMod(element)
    }
    return element;
  }

addStatusMod(element) {
       // set chip allergies as active or inactive on click
       element.addEventListener("click", (e) => {
        let targetElement = e.target;
        targetElement.getAttribute("data-chipstatus");
        if (e.target.classList.contains("chip")) {
          switch (targetElement.getAttribute("data-chipstatus")) {
            case "inactive":
              console.log("Activate")
              console.log(targetElement)
              targetElement.setAttribute(
                "style",
                "background-color: #5cb85c; color: white;"
              );
              targetElement.setAttribute("data-chipstatus", "active");
              break;
            case "active":
              targetElement.setAttribute(
                "style",
                "background-color: #e4e4e4; color: #0009;"
              );
              targetElement.setAttribute("data-chipstatus", "inactive");
          }
        }
      });
  
    }
  }