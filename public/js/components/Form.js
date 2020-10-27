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
// FORM ELEMENT CLASS
//=================================

@ AUTHOR DEVIN S. DAVIS
*/

class Form {
  constructor(id, formId) {
    this.id = id;
    this.formId = formId
  }

  textInputForm() {
    let element = this.basicForm()
    element.firstElementChild.append(this.confirmBtn())
    let args = Object.keys(arguments).reverse()
    args.forEach(a => {
      let input = document.createElement("input");
      input.placeholder = arguments[a]
      element.insertBefore(input, element.firstElementChild);
    })    
    return element;
  }

  promptForm(text) {
    let element = this.basicForm();
    element.firstElementChild.append(this.confirmBtn())
    let p = document.createElement("p")
    p.textContent = text
    element.insertBefore(p,element.firstElementChild)
    return element
  }

  optionForm() {
    let element = this.basicForm()
    let i 
    let optionContainer = document.createElement("div")
    optionContainer.id = "option-container"
    for(i = 0; i < arguments.length; i++) {
      let opt = document.createElement("button")
      opt.textContent = arguments[i]
      opt.id = `option-btn-${i + 1}`
      optionContainer.append(opt)
    }

    // insert options into form
    element.insertBefore(optionContainer, element.firstElementChild)

    return this.formContainer(element)
  }

  basicForm() { 
    let element = document.createElement("form")
    element.id = this.formId
    element.setAttribute("class", "form-body");
    element.setAttribute("data-id", this.id);
    
    element.innerHTML = `
    <div class="form-btns">
        <a class="waves-effect waves-light btn cancel-btn">Cancle</a>
    </div>
      `;
    element.addEventListener("click", (e) => {
     element.parentElement.remove()
    });

    return element;
  }

  formContainer(form) {
    let element = document.createElement("div");
    element.id = "form-container"
    element.append(form)
    element.addEventListener("click", (e) => {
      element.remove()
     });
    return element
  }

  confirmBtn() {
    let element = document.createElement("a")
    element.classList.add("waves-effect" ,"waves-light", "btn", "confirm-btn", "disabled")
    return element
  }

}
