/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
//=================================
// FORM COMPONENT
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
    let args = Object.keys(arguments).reverse()
    let inputContainer = document.createElement("div")
    args.forEach(a => {
      let input = document.createElement("input");
      input.addEventListener("input", () => {
        Object.keys(input.parentElement.children).forEach(key => {
          element.lastElementChild.previousElementSibling.classList.add("disabled")
          if(input.parentElement.children[key].value === "") {
            element.lastElementChild.previousElementSibling.classList.add("disabled")
          } else {
            element.lastElementChild.previousElementSibling.classList.remove("disabled")
          }
        })
      })
      input.placeholder = arguments[a]
      inputContainer.append(input);
    })    
element.insertBefore(inputContainer, element.firstElementChild)

    //   
    return element;
  }

  promptForm(text) {
    let element = this.basicForm();
    let p = document.createElement("p")
    p.textContent = text
    element.insertBefore(p,element.firstElementChild)
    return element
  }

  basicForm() {
    let element = document.createElement("div");
    element.id = this.formId
    element.setAttribute("class", "form-body");
    element.setAttribute("data-id", this.id);
    element.innerHTML = `
          <a class="waves-effect waves-light btn confirm-btn disabled">Confirm</a>
          <a class="waves-effect waves-light btn cancel-btn">Cancle</a>
      `;
    element.addEventListener("click", (e) => {
      removeForm(e, element);
    });
    return element;
  }

}
