/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A User Class
 *
 * @author Shaquille Lynch
 */
class User {
  /** Constructor **/

  /** A constructor for User class */
  constructor() {}

  /** Methods **/
  /**
   * Add user
   *
   * @param {String} firstName User First Name
   * @param {String} lastName User Last Name
   * @param {String} address User Address
   * @param {String} email User Email
   * @param {String} contactNumber User Contact Number
   * @return {Object} Added User
   */
  async addUser(
    firstName,
    lastName,
    address,
    email,
    contactNumber,
    accountKey
  ) {
    let user = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        email: email,
        contactNumber: contactNumber,
        account_key: accountKey,
      },
      receivingData = {};

    await fetch(`http://localhost:${port}/signup`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", // sent request
        Accept: "application/json", // expected data sent back
      },
      body: JSON.stringify(user),
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

  /**
   * Getting the User
   *
   * @param {String} id User Id
   * @return {Object} User
   */
  async get(id) {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/user/${id}`, {
      method: "get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", // sent request
        Accept: "application/json", // expected data sent back
      },
    })
      .then((res) => res.json())
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

  /**
   * Getting Users
   *
   * @return {Object} User
   */
  async getAll() {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/user/`, {
      method: "get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", // sent request
        Accept: "application/json", // expected data sent back
      },
    })
      .then((res) => res.json())
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
