// =================================
// PRODUCT MANAGEMENT UI HANDLING
// =================================

// -------------------------------------
// FUNCTIONS
// ------------------------------------

(function () {
  if (document.querySelector(".admin-products-container")) {
    function closeOpenDropdowns(arr) {
      arr.forEach((el) => {
        el.setAttribute("style", "display: none;");
      });
    }

    // clsoes all open dropdown menus
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

    // displays menu container
    function displayMenuFloaterContainer() {
      document
        .querySelector(".admin-product-floater-container")
        .setAttribute("style", "display: block");
    }

    // =========================================
    // PRODUCT MANAGEMENT CONTAINER EVENT LISTENERS
    // =========================================

    document
      .querySelector(".admin-products-container")
      .addEventListener("click", (e) => {
        // get target element
        let targetElement = e.target;
        // get category input menu
        let categoryInput = document.querySelector(".category-input");
        // get category add button
        let categoryBtn = document.querySelector(".add-category-btn");

        // open add category menu if add cetegory button is clicked
        if (targetElement.classList.contains("add-category-btn")) {
          categoryInput.setAttribute("style", "display: flex");
          categoryBtn.setAttribute("style", "display: none");
        }

        // close add category menu if save or cancle are clicked
        if (
          targetElement.classList.contains("category-save-btn") ||
          targetElement.classList.contains("category-cancel-btn")
        ) {
          categoryInput.setAttribute("style", "display: none");
          categoryBtn.setAttribute("style", "display: block");
        }
      });

    // =========================================
    // PRODUCT MANAGEMENT CONTAINER EVENT LISTENERS
    // =========================================

    document
      .querySelector(".admin-product-floater-container")
      .addEventListener("click", (e) => {
        let targetElement = e.target;
        if (targetElement.classList.contains("proc-allergy-cancel-btn")) {
          targetElement.closest("#product-allergy-container").remove();
        }
      });

    // =========================================
    // PRODUCT MANAGEMENT LIST EVENT LISTENERS
    // =========================================

    document
      .querySelector(".admin-category-list")
      .addEventListener("click", (e) => {
        //get target element
        let targetElement = e.target;

        // hide all currently open dropdowns
        const allCatDropdowns = document.querySelectorAll(".category-dropdown");
        const allProductDropdowns = document.querySelectorAll(
          ".product-dropdown"
        );

        // add class to varaible
        let product = new Product();
        closeOpenDropdowns(allCatDropdowns);
        closeOpenDropdowns(allProductDropdowns);

        // ++++++++++++++++++++++++++++++++++
        // Category Dropdown Event Managers
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

          // add category id as data attribute to menu
          editMenu.setAttribute("data-catid", catId);
        }

        // open category delete menu and add data-attribute to editor menu
        if (targetElement.closest(".delete-category-btn")) {
          displayMenuFloaterContainer();

          // get category id
          let catId = targetElement
            .closest(".delete-category-btn")
            .getAttribute("data-catid");

          // get product count for category
          product.count(catId).then((procCount) => {
            if (document.getElementById("delete-warning-message")) {
              document.getElementById("delete-warning-message").remove();
            }

            if (!procCount.err) {
              // create delete menu prompt text element
              let promptTextEl = document.createElement("h3");
              promptTextEl.setAttribute("id", "delete-warning-message");
              let promptText = document.createTextNode(
                `Are you sure want to delete this category? You have ${procCount.count} items in this list.`
              );
              promptTextEl.appendChild(promptText);
              // display delete menu
              let deleteMenu = document.querySelector(".delete-category-menu");
              deleteMenu.setAttribute("style", "display: block");
              // add prompt text to delete menu
              deleteMenu.insertBefore(
                promptTextEl,
                deleteMenu.firstElementChild
              );
              // add category id as data attribute to menu
              deleteMenu.setAttribute("data-catid", catId);
            } else {
              console.log(procCount.errMessage);
            }
          });
        }

        // ++++++++++++++++++++++++++++++++++
        // Product Dropdown Event Managers
        // ++++++++++++++++++++++++++++++++++

        // open product dropdown
        if (targetElement.closest(".product-dropdown-trigger")) {
          targetElement
            .closest(".product-dropdown-trigger")
            .nextElementSibling.setAttribute("style", "display: block");
        }

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

        // open edit menu, addon menu, allergy menu or delete prompt
        if (targetElement.closest(".product-dropdown")) {
          let menuSelection = targetElement.textContent;
          let procId = targetElement
            .closest(".product-dropdown")
            .getAttribute("data-procid");
          switch (menuSelection) {
            case "Addons":
              break;
            case "Edit":
              let editMenu = document.querySelector(".edit-product-menu");
              displayMenuFloaterContainer();
              editMenu.setAttribute("style", "display: block");
              editMenu.setAttribute("data-procid", procId);

              break;
            case "Alergies":
              break;
            case "Delete":
              let deleteMenu = document.querySelector(".delete-product-menu");
              displayMenuFloaterContainer();
              deleteMenu.setAttribute("style", "display: block");
              deleteMenu.setAttribute("data-procid", procId);
              break;
          }
        }
        //  open product allergy menu
        if (targetElement.classList.contains("add-product-allergies-btn")) {
          displayMenuFloaterContainer();
          // append preloader while allegies are fetched
          let preLoader = document.createElement("div");
          preLoader.innerHTML = `
          <div class="progress">
      <div class="indeterminate"></div>
  </div>
      `;
          document
            .querySelector(".admin-product-floater-container")
            .append(preLoader);
          // create allergies class varaible
          let allergy = new Allergy();
          let product = new Product();
          allergy.getAll().then((allergies) => {
            if (!allergies.err) {
              // remove preloader on successful fetch
              preLoader.remove();
              document
                .querySelector(".admin-product-floater-container")
                .firstElementChild.remove();
              // get product id
              let procId = targetElement.getAttribute("data-procid");
              // create product allergies menu
              let allContainer = document.createElement("div");
              allContainer.setAttribute(
                "style",
                "background-color: #f5f5f5; width: 90%;"
              );
              allContainer.setAttribute("id", "product-allergy-container");
              allContainer.setAttribute("data-procid", procId);
              allContainer.innerHTML = `
              <div>
              <a id="product-allergies-save-btn" class="waves-effect waves-light btn proc-allergy-save-btn save-btn">save</a>
              <a id="product-allergies-cancel-btn" class="waves-effect waves-light btn proc-allergy-cancel-btn cancel-btn" style="background-color: grey">cancel</a>
              </div>`;

              // append product allergies menu to floater container
              document
                .querySelector(".admin-product-floater-container")
                .append(allContainer);

              document
                .getElementById("product-allergies-cancel-btn")
                .addEventListener("click", () => {
                  //hide product menu floater container
                  document
                    .querySelector(".admin-product-floater-container")
                    .setAttribute("style", "display: none");
                  //remove allergy menu from floater container
                  allContainer.remove();
                });
            } else {
              console.log(allergies.data.errMessage);
            }
          });
        }
        //
      });

    // =============================
    // CLOSE ALL OPEN DROPDOWN MENUS
    // =============================

    const catEditMenu = document.querySelector(".edit-category-menu");
    const catDeleteMenu = document.querySelector(".delete-category-menu");
    const procEditMenu = document.querySelector(".edit-product-menu");
    const procDeleteMenu = document.querySelector(".delete-product-menu");
    // close open category edit menu
    catEditMenu.addEventListener("click", (e) => {
      let editInput = document.querySelector("#edit-category-input");
      closeMenu(e, ["category-save-btn", "category-cancel-btn"], catEditMenu);
      editInput.value = "";
    });

    // close open category delete menu
    catDeleteMenu.addEventListener("click", (e) =>
      closeMenu(e, ["delete-confirm-btn", "cancel-btn"], catDeleteMenu)
    );

    // close open product edit menu
    procEditMenu.addEventListener("click", (e) => {
      closeMenu(e, ["product-save-btn", "product-cancel-btn"], procEditMenu);
    });

    // close open product delete menu
    procDeleteMenu.addEventListener("click", (e) => {
      closeMenu(e, ["delete-product-btn", "cancel-btn"], procDeleteMenu);
    });
  }
})();
