// add event listener to login form
document.getElementById("login-form").addEventListener("click", (e) => {
  console.log("ff");
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
    let auth = new Auth();
    auth.login(inputValues.username, inputValues.password).then((user) => {
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
