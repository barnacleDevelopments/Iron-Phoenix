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
            <ul id="cust-list" class="collection"></ul>
          </form>
        </div>
        <div class="customize-footer">
          <div>
            <h2>total</h2>
            <h2 id="total-prod-price">${this.prodPrice}</h2>
          </div>
          <div class="customize-footer-btns">
            <a class="waves-effect waves-light btn cancel-btn">Cancle</a>
            <a class="add-custom-btn waves-effect waves-light btn confirm-btn">Add to Cart</a>
          </div>
        </div>`

        element.addEventListener("click", (e) => {
          if(e.target.classList.contains("confirm-btn") || e.target.classList.contains("cancel-btn")){
            document.getElementById("customization-menu").setAttribute("style", `animation-name: slideDown;
            animation-fill-mode: forwards;
            animation-duration: 0.5s;
            animation-timing-function: ease;`)
            setTimeout(() => {
              element.remove()
            }, 500)
           
          } 
        })
        return element
    }

    createCustItem(id, name, price, quantity) {
      // create body
      let element = document.createElement("li"); 
      element.classList.add("collection-item");
      element.setAttribute("id", id)
      element.classList.add("customize-item")

      // create price 
      let priceEl = document.createElement("div")
      priceEl.innerHTML = `<p class="item-price">${price}</p>`
      // create head 
      let head = document.createElement("p")
      head.innerHTML = `
          <label>
            <input type="checkbox" class="check-box filled-in" checked="checked"/>
            <span>${name}</span>
          </label>`

      // create quantity input
      let btn1 = document.createElement("a")
      let btn2 = document.createElement("a")
      let countDisplay = document.createElement("p")
      countDisplay.classList.add("customize-count")
      countDisplay.textContent = quantity || 1
      let quantityInput = document.createElement("div")
      btn1.innerHTML = `<i class="material-icons">remove_circle_outline</i>`
      btn2.innerHTML = `<i class="material-icons">add_circle_outline</i>`

      quantityInput.append(btn1)
      quantityInput.append(countDisplay)
      quantityInput.append(btn2)
      btn1.addEventListener("click", () => {
        let count = parseInt(countDisplay.textContent)
        if(count > 0) {
          countDisplay.textContent = count -= 1
        }
     
      })
      btn2.addEventListener("click", () => {
        let count = parseInt(countDisplay.textContent)
        if(count >= 0) {
          countDisplay.textContent = count + 1
        }
      })
     
      element.append(head, quantityInput, priceEl)

      return element  
    }
}



