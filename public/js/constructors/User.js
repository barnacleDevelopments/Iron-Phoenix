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
    constructor() {
    }
  
    /** Methods **/

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

  /**
   * Getting the User Allergy Id's
   *
   * @param {String} id User Id
   * @return {Array} User Allergy Id's
   */
  async getAllergyIds(id) {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/user/${id}/allergy`, {
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
   * Update User Info
   *
   * @param {String} id User Id
   * @param {String} firstName User First Name
   * @param {String} lastName User Last Name
   * @param {String} address User Address
   * @param {String} contactNumber User Contact Number
   * @return {Object} Updated User Info
   */
  async update(id, firstName, lastName, address, contactNumber) {
    let sendingData = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      contactNumber: contactNumber
    },
    receivingData = {};

    await fetch(`http://localhost:${port}/api/user/${id}`, {
      method: "put",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", // sent request
        Accept: "application/json", // expected data sent back
      },
      body: JSON.stringify(sendingData),
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
   * Update User Allergies
   *
   * @param {String} id User Id
   * @param {Array} col Collection of Allergy Id's
   * @return {Object} Updated User Allergy Id's
   */
  async updateAllergy(id, col) {
    let sendingData = {
      Allergy: col,
    },
    receivingData = {};

    await fetch(`http://localhost:${port}/api/user/${id}/allergy`, {
      method: "put",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", // sent request
        Accept: "application/json", // expected data sent back
      },
      body: JSON.stringify(sendingData),
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
   * Delete the User
   *
   * @return {Object} User
   */
  async delete(id) {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/user/${id}`, {
      method: "delete",
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
