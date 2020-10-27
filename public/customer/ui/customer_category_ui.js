/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-10-21
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
==============================
CUSTOMER CATEGORY UI
==============================

@ AUTHOR DEVIN S. DAVIS
*/


// display and hide searchbar on scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".searchbar").style.top = "0";
  } else {
    document.querySelector(".searchbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
};

// open customization menu
const openCustomizationMenu = (id, name, price) => {
  let custMenu = new CustomizationMenu(id, name, price)
  let menu = custMenu.create()
  document.getElementById("category-enclosure").append(menu)
}

  // open customization menu when customize button is pressed
document.querySelector("body").addEventListener("click", (e) => {
  let targetElement = e.target
  // if new button is pressed open customization menu
  if(targetElement.id === "option-btn-1") {
    let form = targetElement.closest("#customize-option-form")
    let prodId = form.getAttribute("data-id")
    let card = document.getElementById(prodId)
    console.log(card)
    let prodName = $(card).find(".prod-name").text()
    let prodPrice = $(card).find(".prod-price").text()
    openCustomizationMenu(prodId, prodName, prodPrice)
    appendAddons(document.getElementById("cust-list"))
  }

  // if browse button is pressed 
  if(targetElement.id === "option-btn-2") {

  }

})
