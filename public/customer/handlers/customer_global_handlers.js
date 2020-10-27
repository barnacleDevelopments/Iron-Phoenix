/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-10-22
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
==============================
GLOBAL CUSTOMER HANDLERS
==============================

@ AUTHOR DEVIN S. DAVIS
*/

// update the cart count 
const updateCartCount = (userId) => {
    let cart = new Cart()
   let cartCountBubble = document.getElementById("cart-count")
  
    cart.countItems(userId).then((count) => {
  if(!count.data.err) {
    let cartCount = count.data.amount
    if(cartCount <= 0) {
      cartCountBubble.firstElementChild.style.display = "none"
      cartCountBubble.firstElementChild.textContent = ""
    } else {
      cartCountBubble.firstElementChild.style.display = "flex"
      cartCountBubble.firstElementChild.textContent = cartCount
    }
  
  } else {
    console.log(count.data.errMessage)
  }
    });
  }