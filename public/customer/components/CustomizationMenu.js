class CustomizationMenu {
    constructor (id) {
        this.id = id

    }
    create() {
        let element = document.createElement("div")
        element.id = "customization-menu"
        element.setAttribute("data-prodid", this.id)
        element.innerHTML = `
        <div class="customize-header">
          <h1>Chocolate Chip</h1>
          <h2>$8.33</h2>
        </div>
        <div class="customize-body">
          <form action="#">
            <ul class="collection">
              <li class="collection-item">
                <div>
                  <p>
                    <label>
                      <input type="checkbox" class="filled-in" checked="checked" />
                      <span><%-item.toppings[i].title %></span>
                    </label>
                  </p>
                </div>
                <div>
                  <a href=""><i class="material-icons">remove_circle_outline</i></a>
                  <p><%-item.toppings[i].amount %></p>
                  <a href=""><i class="material-icons">add_circle_outline</i></a>
                </div>
                <div>
                  <h2></h2>
                </div>
              </li>
              <li class="collection-item">
                <div>
                  <p>
                    <label>
                      <input type="checkbox" />
                      <span><%-customizationItems[i] %></span>
                    </label>
                  </p>
                </div>
                <div>
                  <a href=""><i class="material-icons">remove_circle_outline</i></a>
                  <p></p>
                  <a href=""><i class="material-icons">add_circle_outline</i></a>
                </div>
                <div>
                  <h2></h2>
                </div>
              </li>
            </ul>
          </form>
        </div>
        <div class="customize-footer">
          <div>
            <h2>Total</h2>
            <h2>$21.00</h2>
          </div>
          <div class="customize-footer-btns">
            <a class="waves-effect waves-light btn cancle-btn">Cancle</a>
            <a class="waves-effect waves-light btn">Add to Cart</a>
          </div>
        </div>`
        return element
    }
}