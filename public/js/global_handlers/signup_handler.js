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
// CLASSES
//=================================

@ AUTHOR DEVIN S. DAVIS
*/

// add event listener to sign up form
document.getElementById("signup-form").addEventListener("click", (e) => {
  // get target element
  let targetElement = e.target;
  // if sign up button is clicked
  if (targetElement.id === "login-btn") {
    // get all the input fields
    let inputs = targetElement.parentElement.children;
    let inputValues = {};

    Object.keys(inputs).forEach((key) => {
      let inputElement = inputs[key];
      if (inputElement.nodeName === "INPUT") {
        inputValues[inputElement.getAttribute("id")] = inputElement.value;
      }
    });
    // create new user
    const user = new User();
    console.log(inputValues);
    user
      .addUser(
        inputValues.firstName,
        inputValues.lastName,
        inputValues.address,
        inputValues.email,
        inputValues.number
      )
      .then((user) => {
        // if user creation success
        console.log(user);
        if (!user.err) {
          console.log("success!");
        } else {
          console.log(user.errMessage);
        }
      });
  }
});
