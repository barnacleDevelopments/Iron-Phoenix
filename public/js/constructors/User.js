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
   * Getting the id 
   *
   * @param {String} id User Id
   * @return {Object} User
   */
  async getId() {
    let receivingData = {};

    await fetch(`http://localhost:${port}/user/id`, {
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
  