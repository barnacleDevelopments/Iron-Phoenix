// ---------------------------------------
// DELETE PRODUCT FORM
// ---------------------------------------

function createProductDeleteForm(procId) {
  // create element
  let element = document.createElement("div");
  element.setAttribute("data-procid", procId);
  element.setAttribute("class", "form-body");

  element.innerHTML = `
      <h3>Are you sure want to delete this item?</h3>
      <a id="delete-product-btn" class="waves-effect waves-light btn confirm-btn">Confirm</a>
      <a class="waves-effect waves-light btn cancel-btn">Cancel</a>`;

  element.addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    if (
      targetElement.classList.contains("confirm-btn") ||
      targetElement.classList.contains("cancel-btn")
    ) {
      element.remove();
      formContainer.setAttribute("style", "display: none");
    }
  });
  return element;
}

// ---------------------------------------
//  CREATE ALLERGY FORM
// ---------------------------------------

function createProductAllergiesform(procId) {
  // create product allergies menu
  let element = document.createElement("div");
  element.setAttribute("style", "background-color: #f5f5f5; width: 90%;");
  element.setAttribute("class", "form-body");
  element.setAttribute("data-procid", procId);
  element.innerHTML = `
      <a id="product-allergies-save-btn" class="waves-effect waves-light btn proc-allergy-save-btn confirm-btn">save</a>
      <a id="product-allergies-cancel-btn" class="waves-effect waves-light btn proc-allergy-cancel-btn cancel-btn" style="background-color: grey">cancel</a>
      `;
  // append preloader while allegies are fetched
  let preLoader = document.createElement("div");
  preLoader.innerHTML = `
      <div class="progress">
      <div class="indeterminate"></div>
      </div>
             `;

  element.insertBefore(preLoader, element.firstElementChild);

  element.addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    if (
      targetElement.classList.contains("confirm-btn") ||
      targetElement.classList.contains("cancel-btn")
    ) {
      element.remove();
      formContainer.setAttribute("style", "display: none");
    }
  });

  return element;
}

// ---------------------------------------
//  CATEOGRY EDIT FORM
// ---------------------------------------

function createCategoryEditForm(catId) {
  // create element
  let element = document.createElement("div");
  element.setAttribute("class", "form-body");
  element.setAttribute("data-catid", catId);

  element.innerHTML = `
        <input id="edit-category-input" type="text" placeholder="add category title here...">
        <a id="save-edit-category-btn" class="waves-effect waves-light btn confirm-btn">save</a>
        <a class="waves-effect waves-light btn cancel-btn">cancle</a>
  `;
  // add closing event listener
  element.addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    // if target element save button or cancel button - close the menu
    if (
      targetElement.classList.contains("confirm-btn") ||
      targetElement.classList.contains("cancel-btn")
    ) {
      element.remove();
      formContainer.setAttribute("style", "display: none");
      // remove tip if exists
      // get tip element
      let tipMenu = document.getElementById("tip-menu");
      if (tipMenu) {
        tipMenu.remove();
      }
    }
  });

  class StringValidater {
    constructor(string) {
      this.string = string;
    }
    get() {
      return this.string;
    }
    isBiggerThen(length) {
      if (this.string.length > length) {
        return true;
      } else {
        return false;
      }
    }
    isSmallerOrEqual(length) {
      if (this.string.length <= length) {
        return true;
      } else {
        return false;
      }
    }
    isThisLong(length) {
      if (this.string.length === length) {
        return true;
      } else {
        return false;
      }
    }
    seperatedExeeds(length) {
      let stringArr = this.string.split(" ");
      let doesExeed = false;
      stringArr.forEach((string) => {
        if (string.length > length) {
          doesExeed = true;
        }
      });

      if (doesExeed) {
        return doesExeed;
      }
    }

    seperatedNotExeeds(length) {
      let stringArr = this.string.split(" ");
      let doesExeed = false;
      stringArr.forEach((string) => {
        if (string.length < length) {
          doesExeed = true;
        }
      });

      if (doesExeed) {
        return doesExeed;
      }
    }
  }

  // add input event listener
//   element.firstElementChild.addEventListener("input", (e) => {
//     // get target element
//     let targetElement = e.target;
//     // get inputed string
//     let String = new StringValidater(targetElement.value);

//     // if inputed text includes too many charecters prompt the user
//     if (String.seperatedExeeds(10)) {
//       let tipElement = createFormTip(
//         "Problem:",
//         "Your word is too long!",
//         "Shorter titles capture the users attention more easily online"
//       );
//       tipElement.setAttribute(
//         "style",
//         "position: relative; top: 0px; animation: openTipMenu .3s ease-in forwards"
//       );
//       document.getElementById("form-tip-container").append(tipElement);
//     }
//   });

//   return element;
// }

// ---------------------------------------
//  PRODUCT EDIT FORM
// ---------------------------------------

function createProductEditForm(procId, name, price, desc) {
  // create elemet
  let element = document.createElement("div");
  // set element class
  element.setAttribute("class", "form-body");
  // set element data attribute
  element.setAttribute("data-procid", procId);
  element.innerHTML = `
      <input id="product-title-input" type="text" value="${name}"placeholder="add product title here...">
      <input id="product-price-input" type="text" value="${price}" placeholder="add price...">
      <input type="text" id="product-description-input" value="${desc}" placeholder="add description...">
      <a id="edit-product-save-btn" class="waves-effect waves-light btn confirm-btn">save</a>
      <a class="waves-effect waves-light btn cancel-btn">cancle</a>
  `;
  // add closing event listeners
  element.addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    // if target element save button or cancel button - close the menu
    if (
      targetElement.classList.contains("confirm-btn") ||
      targetElement.classList.contains("cancel-btn")
    ) {
      element.remove();
      formContainer.setAttribute("style", "display: none");
    }
  });
  return element;
}

// ---------------------------------------
//  CATEOGRY DELETE FORM
// ---------------------------------------

function createCategoryDeleteForm(catId, procCount) {
  let element = document.createElement("div");
  // set element class
  element.setAttribute("class", "form-body");
  // set element data attribute
  element.setAttribute("data-catid", catId);
  element.innerHTML = `
    <h3>This category has ${procCount} items are you sure you want to delete it?</h3>
      <a id="delete-confirm-btn" class="waves-effect waves-light btn confirm-btn">Confirm</a>
      <a class="waves-effect waves-light btn cancel-btn cancel-btn">Cancel</a>
  `;
  // add closing event listeners
  element.addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;
    // if target element save button or cancel button - close the menu
    if (
      targetElement.classList.contains("confirm-btn") ||
      targetElement.classList.contains("cancel-btn")
    ) {
      element.remove();
      formContainer.setAttribute("style", "display: none");
    }
  });
  return element;
}
