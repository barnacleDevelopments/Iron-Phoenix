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
==============================
FUNCTIONS
==============================
*/

function addInputChecker(input, func1, func2) {
  input.addEventListener("input", () => {
    if(input.value === "") {
      func1()
    } else {
      func2()
    }
  })
}

// loop over all the chips change their status
const setChipStatuses = (elements, data) => {
  Object.keys(elements).forEach((key) => {
    data.forEach((id) => {
      if (elements[key].getAttribute("data-allid") === id) {
        elements[key].setAttribute("data-chipstatus", "active");
        elements[key].setAttribute(
          "style",
          "background-color: #5cb85c; color: white"
        );
      }
    });
  });
}

// retrieve user info, apply placeholder and append
const loadUserContent = (userId) => {
  let loggedInUser = new User();
  loggedInUser.get(userId).then((user) => {
    if (!user.data.err) {
      const userFirstName = document.getElementsByClassName("userFirst");
      const userLastName = document.getElementsByClassName("userLast");
      const userPhone = document.getElementsByClassName("userPhone");
      const userLocation = document.getElementsByClassName("userLocation");

      let allInputs = [userFirstName, userLastName, userLocation, userPhone]

      // append username
      userFirstName[0].append(user.data.firstName);
      userFirstName[1].setAttribute("placeholder", user.data.firstName);
      
      // append user email
      userLastName[0].append(user.data.lastName);
      userLastName[1].setAttribute("placeholder", user.data.lastName);
 
      // apend user location
      userLocation[0].append(user.data.address);
      userLocation[1].setAttribute("placeholder", user.data.address)

      // apppend user phone number
      userPhone[0].append(user.data.contactNumber);
      userPhone[1].setAttribute("placeholder", user.data.contactNumber);

      appendUserAllergies(userId)
      // add event listener to each input
      allInputs.forEach((els) => {
        let saveBtn = $(els[0]).closest(".user-info-header").find(".save-btn")
       
        saveBtn.click(() => {
          saveBtn.css({"display": "none"})

          let vals = allInputs.map((els) => {
            if(els[1])
            if(els[1].value !== "") {
              return els[1].value
            } else {
              return els[1].placeholder
            }
          })

          let firstName = vals[0]
          let lastName = vals[1]
          let location = vals[2]
          let number = vals[3]
        
          loggedInUser.update(userIdentification, firstName, lastName, location, number).then((user) => {
            if(!user.data.err) {
              userFirstName[0].textContent = user.data.firstName
              userFirstName[1].setAttribute("placeholder", user.data.firstName); 

              userLastName[0].textContent = user.data.firstName
              userLastName[1].setAttribute("placeholder", user.data.firstName); 
        
              userLocation[0].textContent = user.data.address;
              userLocation[1].setAttribute("placeholder", user.data.address)

              userPhone[0].textContent = user.data.contactNumber;
              userPhone[1].setAttribute("placeholder", user.data.contactNumber);
           
            } else {
              console.log(user.data.errMessage)
            }
          })
        })
        addInputChecker(els[1], () => {
            saveBtn.css({"display": "none"});
            }, () => {
            saveBtn.css({"display": "block"})
            })
      })
    } else {
      console.log(user.data.errMessage);
    }
  });
};

const appendUserAllergies = (userId) => {
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
          // set current chip statuses
          setChipStatuses(chipContainer.children,  userAlls.data)

          // add update listener 
        chipContainer.addEventListener("click", () => {
          let allArr = []
          let children = chipContainer.children
          Object.keys(children).forEach(key => {
            if (children[key].getAttribute("data-chipstatus") === "active") {
              allArr.push(children[key].getAttribute("data-allid"))

            }
          })
          user.updateAllergy(userId, allArr).then((alls) => {
            if (alls.data.err) {
              console.log(alls.data.errMessage)
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
