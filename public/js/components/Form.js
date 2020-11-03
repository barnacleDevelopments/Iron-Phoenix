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

/**
 * @param {string} id id  
 * @param {string} formId identifying id
 * @param {function} func a callback function to execute when confirm btn is clicked
 */

class Form {
  constructor(id, formId, btnText, isFloat) {
    this.id = id;
    this.formId = formId
    this.btnText = btnText
    this.isFloat = isFloat
    this.btns = {}
  }

  textInputForm() {
    let element = this.basicForm()
    let confirmBtn = this.confirmBtn()
    element.firstElementChild.append(confirmBtn)
    let args = Object.keys(arguments).reverse()
    args.forEach(a => {
      let input = document.createElement("input");
      input.placeholder = arguments[a]
      element.insertBefore(input, element.firstElementChild);
    }) 
    
    if(this.isFloat) {
      return this.formContainer(element)
    }
    return element
  }

  promptForm(text) {
    let element = this.basicForm();
    element.firstElementChild.append(this.confirmBtn())
    let p = document.createElement("p")
    p.textContent = text
    element.insertBefore(p,element.firstElementChild)
    return this.formContainer(element)
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

  chipForm(listId, func) {
    let element = this.basicForm()
    element.firstElementChild.append(this.confirmBtn())
    let chipList = document.createElement("ul")
    chipList.id = listId
    element.insertBefore(chipList, element.firstElementChild)
    if(func) {
      element.addEventListener("click", () => {
        func(this.id, chipList.children)
      })
    } 
    return this.formContainer(element)
  }

  chip() {
    let newAllChip = document.createElement("div");
    newAllChip.setAttribute("class", "chip");
    newAllChip.innerHTML = `${name}<i id="${id}" class="close material-icons">close</i> `;
    chipContainer.append(newAllChip);
    return 
  }

  basicForm() { 
    let element = document.createElement("form")
    element.id = this.formId
    element.setAttribute("class", "form-body");
    element.setAttribute("data-id", this.id);
    let btnContainer = document.createElement("div")
    btnContainer.classList.add("form-btns")
    let cancelBtn = document.createElement("a")
    cancelBtn.textContent = "cancel"
    cancelBtn.classList.add("waves-effect", "waves-light", "btn", "cancel-btn")
    btnContainer.append(cancelBtn)
    this.btns.cancelBtn = cancelBtn
    element.append(btnContainer)
    return element;
  }

  formContainer(form) {
    let element = document.createElement("div");
    element.id = "form-container"
    element.append(form)
    element.addEventListener("click", (e) => {
      if(e.target.classList.contains("confirm-btn") || e.target.classList.contains("cancel-btn"))
      element.remove()
     });
    return element
  }

  confirmBtn() {
    let element = document.createElement("a")
    element.textContent = this.btnText
    element.classList.add("waves-effect" ,"waves-light", "btn", "confirm-btn")
    this.btns.confirmBtn = element
    return element
  }
}
