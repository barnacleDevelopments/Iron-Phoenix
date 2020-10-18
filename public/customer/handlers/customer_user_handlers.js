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

    user.getAllergyIds(userId).then((userAlls) => {
      if (!userAlls.data.err) {
        // get all the allergies 
        all.getAll().then((a) => {
          if (!a.data.err) {
            a.data.forEach((an) => {
              let allChip = new Chip(an._id, an.name, "inactive")
              chipContainer.append(allChip.create(true));
            });

            // get all the chips inside chip container
            let allChips = chipContainer.children
         
            // loop over all the chips change their status
            Object.keys(allChips).forEach((key) => {
              userAlls.data.forEach((procAll) => {
                if (allChips[key].getAttribute("data-allid") === procAll) {
                  allChips[key].setAttribute("data-chipstatus", "active");
                  allChips[key].setAttribute(
                    "style",
                    "background-color: #5cb85c; color: white"
                  );
                }
              });
            });

            // update allegies on click
            chipContainer.addEventListener("click", (e) => {
              let allArr = []
             Object.keys(allChips).forEach(key => {
                if(allChips[key].getAttribute("data-chipstatus") === "active") {
                  allArr.push(allChips[key].getAttribute("data-allid"))
                }
              })
              user.updateAllergy(userId, allArr).then((alls) => {
                if(!alls.data.err) {
                  let toast = new Toast("Allergy updated")
                  $("body").append(toast.create())
                } else {
                  console.log(alls.data.errMessage)
                  let failMessage = document.createElement("p")
                  failMessage.style.color = "red"
                  failMessage.textContent = "Oups! Trouble connecting to the network. Reload the page and try again."
                  $(failMessage).insertAfter(chipContainer.lastElementChild)
                }
              })
              
            })
            // append allergy container to allergy menu
            $("#user-all-list").append(chipContainer);

        
          } else {
            console.log(a.data.errMessage);
          }
        });
      } else {
        console.log(userAlls.data.errMessage);
      }
    });
  }

loadUserContent(userIdentification);
