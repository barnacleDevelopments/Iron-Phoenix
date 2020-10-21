class CustomizationMenu {
    constructor (id, prodName, prodPrice, totalPrice) {
        this.id = id
        this.prodName = prodName
        this.prodPrice = prodPrice
        this.totalPice = totalPrice

    }
    create() {
        let element = document.createElement("div")
        element.id = "customization-menu"
        element.setAttribute("data-prodid", this.id)
        element.innerHTML = `
        <div class="customize-header">
          <h1>${this.prodName}</h1>
          <h2>${this.prodPrice}</h2>
        </div>
        <div class="customize-body">
          <form>
            <ul id="${this.id}" class="collection"></ul>
          </form>
        </div>
        <div class="customize-footer">
          <div>
            <h2>total</h2>
            <h2>${this.totalPice}</h2>
          </div>
          <div class="customize-footer-btns">
            <a class="waves-effect waves-light btn cancel-btn">Cancle</a>
            <a class="waves-effect waves-light btn confirm-btn">Add to Cart</a>
          </div>
        </div>`
        return element
    }

    createCustItem(name, quantity) {
      let element = document.createElement("li")
      element.classList.add("collection-item")
      element.innerHTML = `
      <div>
        <p>
          <label>
            <input type="checkbox" class="filled-in" checked="checked" />
            <span>${name}</span>
          </label>
        </p>
      </div>
      <div>
        <a href=""><i class="material-icons">remove_circle_outline</i></a>
        <p>${quantity}</p>
        <a href=""><i class="material-icons">add_circle_outline</i></a>
      </div>`
      return element  
    }
}



