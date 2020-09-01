// =================================
// PRODUCT MANAGEMENT UI HANDLING
// =================================

// Functions
function closeOpenDropdowns(arr) {
  arr.forEach((el) => {
    el.setAttribute("style", "display: none;");
  });
}

function closeMenu(e, btns, parent) {
  let targetElement = e.target;
  let validBtns = [...btns];
  validBtns.forEach((btn) => {
    if (targetElement.classList.contains(btn)) {
      document
        .querySelector(".admin-product-floater-container")
        .setAttribute("style", "display: none");
      parent.setAttribute("style", "display: none");
    }
  });
}

function displayMenuFloaterContainer() {
  document
    .querySelector(".admin-product-floater-container")
    .setAttribute("style", "display: block");
}

// CATEGORY INPUTS
$(".add-btn").on("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  $(".category-input").css({ display: "none" });
  $(".cancle-category-btn").css({ display: "none" });
  $(".add-category-btn").css({ display: "block" });
});

$(".add-category-btn").on("click", (e) => {
  $(".category-input").css({ display: "flex" });
  $(".add-category-btn").css({ display: "none" });
  $(".cancle-category-btn").css({ display: "block" });
});

$(".cancle-category-btn").on("click", (e) => {
  $(".add-category-btn").css({ display: "block" });
  $(".cancle-category-btn").css({ display: "none" });
  $(".category-input").css({ display: "none" });
});

$(".category-save-btn").on("click", () => {
  $(".category-input").css({ display: "none" });
  $(".add-category-btn").css({ display: "block" });
});

$(".category-cancel-btn").on("click", () => {
  $(".category-input").css({ display: "none" });
  $(".add-category-btn").css({ display: "block" });
});

// =========================================
// PRODUCT MANAGEMENT LIST EVENT LISTENERS
// =========================================
const adminCategoryList = document.querySelector(".admin-category-list");

adminCategoryList.addEventListener("click", (e) => {
  //get target element
  let targetElement = e.target;

  // hide all currently open dropdowns
  const allCatDropdowns = document.querySelectorAll(".category-dropdown");
  const allProductDropdowns = document.querySelectorAll(".product-dropdown");
  closeOpenDropdowns(allCatDropdowns);
  closeOpenDropdowns(allProductDropdowns);

  // ++++++++++++++++++++++++++++++++++
  // Category Event Managers
  // ++++++++++++++++++++++++++++++++++

  // open category dropdown
  if (targetElement.closest(".category-dropdown-trigger")) {
    targetElement
      .closest(".category-dropdown-trigger")
      .nextElementSibling.setAttribute("style", "display: block");
  }

  // open category edit menu, add data-attribute to editor menu & input current title in input value
  if (targetElement.closest(".edit-category-btn")) {
    displayMenuFloaterContainer();
    let editMenu = document.querySelector(".edit-category-menu");
    editMenu.setAttribute("style", "display: block");
    let catId = targetElement
      .closest(".edit-category-btn")
      .getAttribute("data-catid");
    editMenu.setAttribute("data-catid", catId);
  }

  // open category delete menu and add data-attribute to editor menu
  if (targetElement.closest(".delete-category-btn")) {
    displayMenuFloaterContainer();
    let deleteMenu = document.querySelector(".delete-category-menu");
    deleteMenu.setAttribute("style", "display: block");
    let catId = targetElement
      .closest(".delete-category-btn")
      .getAttribute("data-catid");
    deleteMenu.setAttribute("data-catid", catId);
  }

  // ++++++++++++++++++++++++++++++++++
  // Product Event Managers
  // ++++++++++++++++++++++++++++++++++

  // open product dropdown
  if (targetElement.closest(".product-dropdown-trigger")) {
    console.log(targetElement.closest(".product-dropdown-trigger"));
    targetElement
      .closest(".product-dropdown-trigger")
      .nextElementSibling.setAttribute("style", "display: block");
  }
  if (targetElement.closest(".add-product-btn")) {
    // open product input
    let productInput = targetElement.previousElementSibling;
    if (productInput.style.display === "none") {
      targetElement.previousElementSibling.setAttribute(
        "style",
        "display: block"
      );
      targetElement
        .closest(".add-product-btn")
        .setAttribute("style", "display:none");
    }
  }

  // close product input
  if (
    targetElement.classList.contains("product-save-btn") ||
    targetElement.classList.contains("product-cancel-btn")
  ) {
    targetElement
      .closest(".product-input")
      .setAttribute("style", "display: none");
    targetElement
      .closest(".product-input")
      .nextElementSibling.setAttribute("style", "display: block");
  }

  if (targetElement.closest(".product-dropdown")) {
    let menuSelection = targetElement.textContent;
    switch (menuSelection) {
      case "Addons":
        break;
      case "Edit":
        displayMenuFloaterContainer();
        document
          .querySelector(".edit-product-menu")
          .setAttribute("style", "display: block");
        break;
      case "Alergies":
        break;
      case "Delete":
        displayMenuFloaterContainer();
        document
          .querySelector(".delete-product-menu")
          .setAttribute("style", "display: block");
        break;
    }
  }
});

// =============================
// CLOSE OPEN MOD MENUES
// =============================

// close delete and save menues
const catEditMenu = document.querySelector(".edit-category-menu");
const catDeleteMenu = document.querySelector(".delete-category-menu");
const procEditMenu = document.querySelector(".edit-product-menu");
const procDeleteMenu = document.querySelector(".delete-product-menu");
catEditMenu.addEventListener("click", (e) => {
  let editInput = document.querySelector("#edit-category-input");
  closeMenu(e, ["save-btn", "cancel-btn"], catEditMenu);
  editInput.value = "";
});
catDeleteMenu.addEventListener("click", (e) =>
  closeMenu(e, ["delete-confirm-btn", "cancel-btn"], catDeleteMenu)
);

procEditMenu.addEventListener("click", (e) => {
  closeMenu(e, ["save-btn", "cancel-btn"], procEditMenu);
});

procDeleteMenu.addEventListener("click", (e) => {
  closeMenu(e, ["delete-confirm-btn", "cancel-btn"], procDeleteMenu);
});

// =================================
// ALLERGY MANAGEMENT
// =================================

// ALLERGY INPUTS
// add button
$(".add-allergy-btn").on("click", (e) => {
  $(".allergy-input").css({ display: "block" });
});

// save button
$(".allergy-save-btn").on("click", () => {
  $(".allergy-input").css({ display: "none" });
});

// cancle button
$(".allergy-cancel-btn").on("click", () => {
  $(".allergy-input").css({ display: "none" });
});

// =================================
// ADDONS MANAGEMENT
// =================================

// ADDONS INPUTS
// add button
$(".add-addon-btn").on("click", (e) => {
  $(".addons-input").css({ display: "block" });
});

// save button
$(".addon-save-btn").on("click", () => {
  $(".addons-input").css({ display: "none" });
});

// cancle button
$(".addon-cancel-btn").on("click", () => {
  $(".addons-input").css({ display: "none" });
});
