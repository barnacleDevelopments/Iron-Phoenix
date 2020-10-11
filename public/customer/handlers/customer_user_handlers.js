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

function createAllergyChip(name, id) {}

(() => {
  // Get Allergies Collapsible Element
})();

const userAllergies = document.getElementsByClassName("userAllergies");

const userName = document.getElementsByClassName("userName");

const userEmail = document.getElementsByClassName("userEmail");

const userPhone = document.getElementsByClassName("userPhone");

const userLocation = document.getElementsByClassName("userLocation");

console.log(userAllergies, userName, userEmail, userPhone, userLocation);

const loadUserContent = () => {
  let loggedInUser = new User();

  loggedInUser.get().then((user) => {
    if (!user.data.err) {
      // append username
      userName[0].append(user.data.firstName);
      userName[1].setAttribute("placeholder", user.data.firstName);
      // append user email
      userEmail[0].append(user.data.email);
      userEmail[1].setAttribute("placeholder", user.info.email);
      // apend user location
      userLocation[0].append(user.data.address);
      userLocation[1].setAttribute("placeholder", user.data.address);
      // apppend user phone number
      userPhone[0].append(user.data.number);
      userPhone[1].setAttribute("placeholder", user.data.number);
      // append allergies
      user.data.Allergies.forEach((id) => {
        let allergy = new Allergy();
        allergy.get(id).then((al) => {
          if (!al.data.err) {
            userAllergies.append(al);
          } else {
            console.log(al.data.errMessage);
          }
        });
      });
    } else {
      console.log(user.data.errMessage);
    }
  });
};

loadUserContent();
