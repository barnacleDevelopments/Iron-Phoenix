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
CUSTOMER CUSTOMIZATION MENU HANDLERS
==============================

@ AUTHOR DEVIN S. DAVIS
*/
// append addon options to customization menu
const appendAddons = (parent) => {
    let addon = new Addon()
    addon.getAll().then(addons => {
      if(!addons.data.err) {
        addons.data.forEach((add) => {
          console.log(add)
          let custMenu = new CustomizationMenu();
          let menuItem = custMenu.createCustItem(add._id, add.name, add.price)
          parent.append(menuItem)
        })
      } else {
        console.log(addons.data.errMessage)
      }
     
    })
  }

  const addCustomProdToCart = (userId, customizedProdId) => {
    let cart = new Cart()
    cart.addCustomizedProduct(userId, customizedProdId).then(prod => {
      if(!prod.data.err) {

      } else {
        console.log(prod.data.errMessage)
      }
    })

  }

  const addCustomProd = (userId, prodId, col, prodPrice, func)  => {
    let custProd = new CustomizedProduct()
    custProd.create(userId, prodId, col, prodPrice).then(prod => {
      if(!prod.data.err) {
        func(loggedInUserId, prod.data)
      } else {
        console.log(prod.data.errMessage)
      }
    })
  }

  // append all addons to cutomization menu on click
  document.getElementById("category-enclosure").addEventListener("click", (e) => {
      let targetElement = e.target
      // get customization addon list
      let custMenuList = document.
      getElementById("cust-list")
    // if customize btn is pressed
    if(targetElement.classList.contains("customize-btn")) {
      let prodId = targetElement.closest(".category-card").id
      let form = new Form(prodId, "customize-option-form")
     let optionForm = form.optionForm("New", "Browse")
     // append option form to body
     document.body.append(optionForm)
      }

    // if customize add button is pressed 
    if(targetElement.classList.contains("add-custom-btn")) {
      // get product price
      let prodPrice = document.getElementById("total-prod-price").textContent
      // get product id
      let prodId = targetElement.closest("#customization-menu").getAttribute("data-prodid")
      // create addon list
      let addonList = []
      // for each addon append to addon list
      Object.keys(custMenuList.children).forEach(key => {
      let addonEl = custMenuList.children[key]
        let addon = {}
        // check if addon is selected
        let isChecked = $(addonEl).find(".check-box").prop("checked")
        if(isChecked) {
          // get addon name
          addon.id = addonEl.id
          // get addon quantity
          addon.qty = parseInt(addonEl.children[1].firstElementChild.nextElementSibling.textContent)
          // get addon price 
          addon.addonPrice = parseInt($(addonEl).find(".item-price").text()) * addon.qty
          // push addon to list
          addonList.push(addon)
        }
      })
      // update cart count
      updateCartCount(loggedInUserId)
    }
  })




  


