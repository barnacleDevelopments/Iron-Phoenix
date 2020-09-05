/*
  +++++++++++++++++++++++++++++++
  FUNCTIONS
  +++++++++++++++++++++++++++++++
*/

// creates new chip elemennt
function createChipElement(name, id) {
  let chipContainer = document.createElement("li");
  let newAllChip = document.createElement("div");
  newAllChip.setAttribute("class", "chip");
  newAllChip.innerHTML = `${name}<i id="${id}" class="close material-icons">close</i>`;
  chipContainer.append(newAllChip);
  return chipContainer;
}

// ======================================
// ALLERGY MANAGEMENT HANDLER MANAGEMENT
// ======================================
const allergy = new Allergy();
// get allergy chip list
let allChipsList = document.getElementById("allergy-chips");

/*
      ++++++++++++++++++++
       Get All Allergies
      ++++++++++++++++++++
    */
(function () {
  allergy.getAll().then((allergies) => {
    console.log(allergies);
    if (!allergies.data.err) {
      allergies.data.forEach((all) => {
        let chip = createChipElement(all.name, all._id);

        allChipsList.append(chip);
      });
    } else {
      console.log(allergies.data.errMessage);
    }
  });
})();

/*
  ++++++++++++++++++++
  Create New Allergy
  ++++++++++++++++++++
*/

document
  .getElementById("allergy-list-container")
  .addEventListener("click", (e) => {
    // get target element
    let targetElement = e.target;

    // if allergy save button is clicked handle allergy create request
    if (targetElement.id === "allergy-save-btn") {
      let allName = targetElement.parentElement.previousElementSibling.value;
      allergy.create(allName).then((allergy) => {
        if (!allergy.data.err) {
          // append to chip element to allergy list elemenet
          let newChip = createChipElement(allergy.data.name, allergy.data._id);
          allChipsList.append(newChip);
        } else {
          console.log(data.data.errMessage);
        }
      });
    }
    if (targetElement.classList.contains("material-icons")) {
      let allId = targetElement.id;
      allergy.remove(allId).then((allergy) => {
        if (allergy.data.err) {
          console.log(allergy.data.errMessage);
        }
      });
    }
  });
