/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A Auth Class
 *
 * @author Shaquille Lynch
 */
class Auth {
    /** Constructor **/
  
    /** A constructor for User class */
    constructor() {
    }
  
    /** Methods **/
  /**
   * Check if user is authenticated to be on the login site
   *
   * @return {Object} Added User
   */
  async logUserToLogin() {
    let receivingData = {};

    await fetch(`http://localhost:${port}/auth/login`, {
      method: "get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", // sent request
        Accept: "application/json", // expected data sent back
      },
    })
      .then((res) => res.text())
      .then((data) => {
        receivingData.data = data;
        receivingData.err = false;
        receivingData.errMessage = "";
      })
      .catch((error) => {
        receivingData.err = true;
        receivingData.errMessage = error;
        console.log(error);
      });

    return receivingData;
  }
}  