/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A Allergy Class
 *
 * @author Shaquille Lynch
 */
class Allergy {
    /** Constructor **/
  
    /** A constructor for Allergy class */
    constructor() {
    }
  
    /** Methods **/

    /**
     * Creating the Allergy
     *
     * @param {String} name Allergy Name
     * @return {Object} Created Allergy
     */
    async create(name) {
      let sendingData = {
          name: name,
        },
        receivingData = {};
  
      await fetch(`http://localhost:${port}/api/allergy/`, {
        method: "post",
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
     * Getting all the Allergies
     *
     * @return {Object} Allergies
     */
    async getAll() {
      let receivingData = {};
  
      await fetch(`http://localhost:${port}/api/allergy/`, {
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
     * Removing the Allergy
     *
     * @param {String} id Allergy Id
     * @return {Object} Removed Allergy
     */
    async remove(id) {
      let receivingData = {};
  
      await fetch(`http://localhost:${port}/api/allergy/${id}`, {
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
  
    /**
     * Return the amount of Allergies
     *
     * @return {Object} Amount of Allergies
     */
    async count() {
      let receivingData = {};
  
      await fetch(`http://localhost:${port}/api/allergy/`, {
        method: "get",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // sent request
          Accept: "application/json", // expected data sent back
        },
      })
        .then((res) => res.json())
        .then((data) => {
          receivingData.count = data.length;
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
  