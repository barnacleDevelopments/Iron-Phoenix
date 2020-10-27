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
CUSTOMER ADD TO CART HANDLERS
==============================

@ AUTHOR DEVIN S. DAVIS
*/

// add item to cart
const addProductToCart = (prodId) => {
    let cart = new Cart()
      cart.addProduct(loggedInUserId, prodId).then((cartProd) => {
        if(cartProd.data.err) {
         console.log(cartProd.data.errMessage)
        } else {
          updateCartCount(loggedInUserId)
        }
     })
  }
  
  // Add Regular Product to Cart when "add to cart is clicked"
  productsList.addEventListener("click", (e) => {
    // get target element 
    let targetElement = e.target
    // check if cart button is pressed
    if(targetElement.classList.contains("cart-btn")) {
    let card = e.target.closest(".category-card")
    let prodId = card.id
        addProductToCart(prodId)
    }
  })