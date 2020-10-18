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