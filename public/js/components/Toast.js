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
// TOAST ELEMENT CLASS
//=================================

@ AUTHOR DEVIN S. DAVIS
*/

class Toast {
    constructor(text, color) {
        this.color = color
    }
    create() {
        let element = document.createElement("div")
        element.textContent = this.text
        return element
    }

    basicStyle() {
        return `background-color: ${this.color}; width: 100%; height: 50px; position: absolute; bottom: 0px;`
    }

}