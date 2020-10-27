/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-10-24
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
==============================
CART MENU COMPONENT
==============================

@ AUTHOR DEVIN S. DAVIS
*/

class CartMenu {
    constructor(total, count) {
        this.total = total 
        this.count = count
    }

    create() {
        let element = document.createElement("section")
        element.id = "cart"
        element.innerHTML = `
        <header id="cart-info">
            <h2>2 Items</h2>
            <div class="cart-total">
                <h2>Cart Total:</h2>
                <h3>$400.00</h3>
            </div>
            <a id="cart-checkout-btn" class="waves-effect waves-light btn confirm-btn">button</a>
        </header>

        <ul id="cart-list" class="collection">
            <li class="collection-item cart-item">
                <div>
                    <div class="cart-img">
                        <img src="/cake_10.jpg">
                    </div>
                    <div>
                        <h3>Cake</h3>
                        <h4>$8.00</h4>
                    </div>
                </div>
                <div class="cart-btns">
                    <div>2</div>
                    <div>
                        <i class="material-icons">settings</i>
                        <i class="material-icons">delete</i>
                    </div>
                </div>
            </li>
        </ul>`
        return element
    }

    createCartItem(id, name, price, count, img) {
        let element = document.createElement("li")
        element.classList.add("cart-item", "collection-item")
        element.id = id
        element.innerHTML = `
                <div>
                    <div class="cart-img">
                        <img src="/cake_10.jpg">
                    </div>
                    <div>
                        <h3>${name}</h3>
                        <h4>$${(price * count).toFixed(2)}</h4>
                    </div>
                </div>
                <div class="cart-btns">
                    <div>${count}</div>
                    <div>
                        <i class="material-icons">settings</i>
                        <i class="material-icons">delete</i>
                    </div>
                </div>`
                return element
    }
}