// =================================
// PRODUCT MANAGEMENT
// =================================

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

function closeOpenDropdowns(arr) {
  arr.forEach((el) => {
    el.setAttribute("style", "display: none;");
  });
}

// =========================================
// PRODUCT MANAGEMENT LIST EVENT LISTENERS
// =========================================
const adminCategoryList = document.querySelector(".admin-category-list");

adminCategoryList.addEventListener("click", (e) => {
  //get target element
  let targetElement = e.target;

  // get floating menu container
  let menuContainer = document.querySelector(
    ".admin-product-floater-container"
  );

  // hide all currently open dropdowns
  const allDropdowns = document.querySelectorAll(".category-dropdown");
  closeOpenDropdowns(allDropdowns);

  // ++++++++++++++++++++++++++++++++++
  // Category Event Managers
  // ++++++++++++++++++++++++++++++++++

  // open collapsible category
  if (targetElement.closest(".category-dropdown-trigger")) {
    targetElement
      .closest(".category-dropdown-trigger")
      .nextElementSibling.setAttribute("style", "display: block");
  }

  // open category edit menu, add data-attribute to editor menu & input current title in input value
  if (targetElement.closest(".edit-category-btn")) {
    menuContainer.setAttribute("style", "display: block");
    let editMenu = document.querySelector(".edit-category-menu");
    editMenu.setAttribute("style", "display: block");
    let catId = targetElement
      .closest(".edit-category-btn")
      .getAttribute("data-catid");
    editMenu.setAttribute("data-catid", catId);
  }

  // open category delete menu and add data-attribute to editor menu
  if (targetElement.closest(".delete-category-btn")) {
    menuContainer.setAttribute("style", "display: block");
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

  // open product input
  if (targetElement.closest(".add-product-btn")) {
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
});

// PRODUCT PROMPTS

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
// close delete and save menues
const editMenu = document.querySelector(".edit-category-menu");
const deleteMenu = document.querySelector(".delete-category-menu");
editMenu.addEventListener("click", (e) => {
  let editInput = document.querySelector("#edit-category-input");
  closeMenu(
    e,
    ["save-btn", "cancel-btn"],
    e.target.closest(".edit-category-menu")
  );
  editInput.value = "";
});
deleteMenu.addEventListener("click", (e) =>
  closeMenu(
    e,
    ["delete-confirm-btn", "cancel-btn"],
    e.target.closest(".delete-category-menu")
  )
);

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
