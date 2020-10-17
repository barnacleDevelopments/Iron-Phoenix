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
==============================
CUSTOMER USER HANDLERS 
==============================

@ AUTHOR DEVIN S. DAVIS
*/

/*
===================================
FUNCTION ELEMENTS 
===================================
*/

(() => {
  // Get Allergies Collapsible Element
})();

const userAllergies = document.getElementsByClassName("userAllergies");

const userName = document.getElementsByClassName("userName");

const userEmail = document.getElementsByClassName("userEmail");

const userPhone = document.getElementsByClassName("userPhone");

const userLocation = document.getElementsByClassName("userLocation");

// retrieve user info and append it
const loadUserContent = (userId) => {
  let loggedInUser = new User();
  loggedInUser.get(userId).then((user) => {
    if (!user.data.err) {
      // append username
      userName[0].append(user.data.firstName);
      userName[1].setAttribute("placeholder", user.data.firstName);
      // append user email
      userEmail[0].append(user.data.email);
      userEmail[1].setAttribute("placeholder", user.data.email);
      // apend user location
      userLocation[0].append(user.data.address);
      userLocation[1].setAttribute("placeholder", user.data.address);
      // apppend user phone number
      userPhone[0].append(user.data.contactNumber);
      userPhone[1].setAttribute("placeholder", user.data.contactNumber);
      appendUserAllergies(userId)
    } else {
      console.log(user.data.errMessage);
    }
  });
};

function appendUserAllergies(userId) {
    let all = new Allergy();
    let user = new User();

    // create chip container
    const chipContainer = document.createElement("div");
    chipContainer.setAttribute("id", "chip-container");

    user.getUserAllergiesIds(userId).then((procAddons) => {
      if (!procAddons.data.err) {
        // get all the allergies and append them to chip container
        all.getAll().then((a) => {
          if (!a.data.err) {
            a.data.forEach((an) => {
              let chip = createChipElement(an.name, an._id, "inactive");
              chipContainer.append(chip);
            });

            // set chip allergies as active or inactive on click
            chipContainer.addEventListener("click", (e) => {
              let targetElement = e.target;
              targetElement.getAttribute("data-chipstatus");
              if (e.target.classList.contains("chip")) {
                switch (targetElement.getAttribute("data-chipstatus")) {
                  case "inactive":
                    targetElement.setAttribute(
                      "style",
                      "background-color: #5cb85c; color: white;"
                    );
                    targetElement.setAttribute("data-chipstatus", "active");

                    break;
                  case "active":
                    targetElement.setAttribute(
                      "style",
                      "background-color: #e4e4e4; color: #0009;"
                    );
                    targetElement.setAttribute("data-chipstatus", "inactive");
                }
              }
            });

            // append allergy container to allergy menu
            let allList = document.getElementById("user-all-list");

           chipContainer.forEach(all => {
            allList.append(all)
           }) 

            // get all the chips inside chip container
            let allChips = allList.children;

            // loop over all the chips and change their status
            Object.keys(allChips).forEach((key) => {
              procAddons.data.forEach((procAll) => {
                if (addonChips[key].getAttribute("data-allid") === procAll) {
                  addonChips[key].setAttribute("data-chipstatus", "active");
                  addonChips[key].setAttribute(
                    "style",
                    "background-color: #5cb85c; color: white"
                  );
                }
              });
            });
          } else {
            console.log(addons.data.errMessage);
          }
        });
      } else {
        console.log(procAddons.data.errMessage);
      }
    });
  }

loadUserContent(userIdentification);
