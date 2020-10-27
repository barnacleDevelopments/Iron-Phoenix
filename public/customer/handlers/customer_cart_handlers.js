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
const appendProducts = (cartList) => {
  let cart = new Cart()
  // get all cart items and append to cart menu
  cart.getProducts(loggedInUserId).then(products => {
    if(!products.data.err) {
      products.data.forEach(prod => {
        let cartMenu = new CartMenu()
        cartList.append(cartMenu.createCartItem(prod._id, prod.name, prod.price, prod.quantity))
      });
      
    } else {
      console.log(prod.data.errMessage)
    }
  })
}
const appendCustomizedProducts = (cartList) => {
  let cart = new Cart()
  cart.getCustomizedProducts(loggedInUserId).then(products => {
    if(!products.data.err) {
      products.data.forEach(prod => {
        let cartMenu = new CartMenu()
        cartList.append(cartMenu.createCartItem(prod._id, prod.name, prod.price, prod.quantity))
      });
    } else {
      console.log(errMessage)
    }
  })
}

// append all cart items to cart menu
(() => {
  // get cart list element
  const cartList = document.getElementById("cart-list")
  appendProducts(cartList)
  appendCustomizedProducts(cartList)
})()

// update cart count
updateCartCount(loggedInUserId)




