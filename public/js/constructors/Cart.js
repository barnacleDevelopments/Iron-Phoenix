/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A Cart Class
 *
 * @author Shaquille Lynch
 */
class Cart {

    /** Constructor **/
  
    /**
     * A constructor for Cart class
     *
     */
    constructor() {
    }
  
    /** Methods **/
    /**
     * Add Product to Cart
     *
     * @param {String} userId User Id
     * @param {String} productId Product Id
     * @return {Object} Added Product
     */
    async addProduct(userId, productId) {
      let sendingData = {
            userId: userId,
            productId: productId,
            qty: 1
        },
        receivingData = {};
  
      await fetch(`http://localhost:${port}/api/user/${userId}/cart/product`, {
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
     * Add Customized Product to Cart
     *
     * @param {String} userId User Id 
     * @param {Number} customizedProductId Customized Product Id
     * @return {Object} Added Product
     */
    async addCustomizedProduct(userId, customizedProductId) {
        let sendingData = {
            userId: userId,
            customizedProductId: customizedProductId,
            qty: 1
          },
          receivingData = {};
    
        await fetch(`http://localhost:${port}/api/user/${userId}/cart/cuztomizedProduct`, {
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
     * Get the User Products
     *
     * @param {String} userId User Id
     * @return {Array} User Products
     */
    async getProducts(userId) {
        let receivingData = {};
    
        await fetch(`http://localhost:${port}/api/user/${userId}/cart/product`, {
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
     * Get the User Customized Products
     *
     * @param {String} userId User Id
     * @return {Array} User Customized Products
     */
    async getCustomizedProducts(userId) {
        let receivingData = {};
    
        await fetch(`http://localhost:${port}/api/user/${userId}/cart/cuztomizedProduct`, {
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
     * Get the number of items that's in the cart
     *
     * @param {String} userId User Id
     * @return {Number} Number of Items
     */
    async countItems(userId) {
        let receivingData = {};
    
        await fetch(`http://localhost:${port}/api/user/${userId}/cart`, {
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
     * Delete user item from cart 
     *
     * @param {String} itemId Item Id
     * @return {Object} Deleted Item
     */
    async deleteItem(itemId) {
        let receivingData = {};
    
        await fetch(`http://localhost:${port}/api/cart/${itemId}`, {
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