/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A Addon Class
 *
 * @author Shaquille Lynch
 */
class Addon {
    /** Constructor **/
  
    /**
     * A constructor for Addon class
     *
     * @param {String} name Addon name
     */
    constructor(name) {
      this.name = name;
    }
  
    /** Methods **/
    /**
     * Creating the Addon
     *
     * @param {String} name Addon Name
     * @param {Number} price Addon Price
     * @return {Object} Created Addon
     */
    async create(name, price) {
      let sendingData = {
          name: name,
          price: price
        },
        receivingData = {};
  
      await fetch(`http://localhost:${port}/api/addon/`, {
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
     * Getting the Addon
     *
     * @param {String} id Addon Id
     * @return {Object} Addon
     */
    async get(id) {
        let receivingData = {};
  
        await fetch(`http://localhost:${port}/api/addon/${id}`, {
          method: "get",
          mode: "cors",
          headers: {
            "Content-Type": "application/json", // sent request
            Accept: "application/json", // expected data sent back
          }
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
     * Getting all the Addons
     *
     * @return {Object} Addons
     */
    async getAll() {
      let receivingData = {};
  
      await fetch(`http://localhost:${port}/api/addon/`, {
        method: "get",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // sent request
          Accept: "application/json", // expected data sent back
        }
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
     * Updating the Addon
     *
     * @param {String} id Addon Id
     * @param {String} name Addon Name
     * @param {Number} price Addon Price
     * @return {Object} Updated Addon
     */
    async update(id, name, price) {
      let sendingData = {
          name: name,
          price: price
        },
        receivingData = {};
  
      await fetch(`http://localhost:${port}/api/addon/${id}`, {
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
     * Removing the Addon
     *
     * @param {String} id Addon Id
     * @return {Object} Removed Addon
     */
    async remove(id) {
      let receivingData = {};
  
      await fetch(`http://localhost:${port}/api/addon/${id}`, {
        method: "delete",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // sent request
          Accept: "application/json", // expected data sent back
        }
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
     * Return the amount of Addons
     *
     * @return {Object} Amount of Addons
     */
    async count() {
      let receivingData = {};
  
      await fetch(`http://localhost:${port}/api/addon/`, {
        method: "get",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // sent request
          Accept: "application/json", // expected data sent back
        }
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
  