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
CUSTOMER CART HANDLERS
==============================

@ AUTHOR DEVIN S. DAVIS
*/

// update the cart count 
const updateCartCount = () => {
  let cart = new Cart()
 let cartCountBubble = document.getElementById("cart-count")
  cart.countItems().then((count) => {
if(!count.data.err) {
  console.log(count)
  cartCountBubble.textContent = count.data.amount
} else {
  console.log(count.data.errMessage)
}
  });
}

// Add Regular Product to Cart
productsList.addEventListener("click", (e) => {
  // get target element 
  let targetElement = e.target
  console.log(targetElement)
  // check if cart button is pressed
  if(targetElement.classList.contains("cart-btn")) {
  let card = e.target.closest(".category-card")
  let prodId = card.id
  let cart = new Cart()
    cart.addProduct(prodId).then((cartProd) => {
      if(cartProd.data.err) {
       console.log(cartProd.data.errMessage)
      } else {
        updateCartCount()
      }
   })
  }
})




