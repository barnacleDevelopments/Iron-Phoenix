/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-10-26
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
==============================
List Container Component
==============================

@ AUTHOR DEVIN S. DAVIS
*/

class ListContainer {
    constructor(id) {
        this.id = id
    }

    create() {
        let element = document.createElement("div")
        element.innerHTML = `<ul></ul>`
        element.id = this.id
    }

    createlistItem() {
        let element = document.createElement("li")
        
    }
}