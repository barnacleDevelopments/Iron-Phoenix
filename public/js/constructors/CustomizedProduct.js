/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A CustomizedProduct Class
 *
 * @author Shaquille Lynch
 */
class CustomizedProduct {

    /** Constructor **/
  
    /**
     * A constructor for CustomizedProduct class
     *
     */
    constructor() {
    }
  
    /** Methods **/
    /**
     * Create Customized Product
     *
     * @param {String} userId User Id
     * @param {String} productId Product Id
     * @param {Array} col Selected Addons
     * @param {Number} price Customized Product Price
     * @return {Object} Created Customized Product
     */
    async create(userId, productId, col, price) {
      let sendingData = {
            userId: userId,
            productId: productId,
            Addon : col,
            price : price
        },
        receivingData = {};
  
      await fetch(`http://localhost:${port}/api/user/${userId}/customizedProduct`, {
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
     * Get the User Customized Product
     *
     * @param {String} userId User Id
     * @param {String} customizedProductId Customized Product Id
     * @return {Object} Customized Product
     */
    async get(userId, customizedProductId) {
        let receivingData = {};
    
        await fetch(`http://localhost:${port}/api/user/${userId}/customizedProduct/${customizedProductId}`, {
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
     * Get all the User Customized Products
     *
     * @param {String} userId User Id
     * @return {Object} Customized Product
     */
    async getAll(userId) {
        let receivingData = {};
    
        await fetch(`http://localhost:${port}/api/user/${userId}/customizedProduct`, {
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
     * Update the User Customized Product
     *
     * @param {String} userId User Id
     * @param {String} customizedProductId Customized Product Id
     * @param {Array} col Selected Addons
     * @param {Number} price Customized Product Price
     * @return {Object} Updated Customized Product
     */
    async update(userId, customizedProductId, col, price) {
        let sendingData = {
              Addon : col,
              price : price
          },
          receivingData = {};
    
        await fetch(`http://localhost:${port}/api/user/${userId}/customizedProduct/${customizedProductId}`, {
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
     * Delete the User Customized Product
     *
     * @param {String} userId User Id
     * @param {String} customizedProductId Customized Product Id
     * @return {Object} Deleted Customized Product
     */
    async delete(userId, customizedProductId) {
        let receivingData = {};
    
        await fetch(`http://localhost:${port}/api/user/${userId}/customizedProduct/${customizedProductId}`, {
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
  }