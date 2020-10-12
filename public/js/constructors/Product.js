/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A Product Class
 *
 * @author Shaquille Lynch
 */
class Product {
  /** Constructor **/

  /**
   * A constructor for Product class
   *
   * @param {String} name Product name
   */
  constructor(name) {
    this.name = name;
  }

  /** Methods **/
  /**
   * Creating the Product
   *
   * @param {String} catId Category Id
   * @param {String} name Product Name
   * @param {String} description Product Description
   * @param {Number} price Product Price
   * @return {Object} Created Product
   */
  async create(catId, name, description, price) {
    let sendingData = {
        catId: catId,
        name: name,
        description: description,
        price: price,
        Allergy: [],
        Addon: []
      },
      receivingData = {};

    await fetch(`http://localhost:${port}/api/product/`, {
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
   * Getting the Product
   *
   * @param {String} catId Category Id
   * @param {String} id Product Id
   * @return {Object} Product
   */
  async get(catId, id) {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/${catId}/product/${id}`, {
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
   * Getting the Product Allergy Id's
   *
   * @param {String} id Product Id
   * @return {Array} Product Allergy Id's
   */
  async getProductAllergyIds(id) {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/product/${id}/allergy`, {
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
   * Getting the Product Addons
   *
   * @param {String} id Product Id
   * @return {Array} Product Addon Id's
   */
  async getProductAddonIds(id) {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/product/${id}/addon`, {
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
   * Getting all the Products
   *
   * @param {String} catId Category Id
   * @return {Object} Products
   */
  async getAll(catId) {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/${catId}/product/`, {
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
   * Updating the Product
   *
   * @param {String} id Product Id
   * @param {String} name Product Name
   * @param {String} description Product Description
   * @param {Number} price Product Price
   * @return {Object} Updated Product
   */
  async update(id, name, description, price) {
    let sendingData = {
        name: name,
        description: description,
        price: price,
      },
      receivingData = {};

    await fetch(`http://localhost:${port}/api/product/${id}`, {
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
   * Updating the Product Allergy
   *
   * @param {String} id Product Id
   * @param {Array} col Collection of Allergy Id's
   * @return {Object} Updated Product Allergy Id's
   */
  async updateProductAllergy(id, col) {
    let sendingData = {
        Allergy: col,
      },
      receivingData = {};

    await fetch(`http://localhost:${port}/api/product/${id}/allergy`, {
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
   * Updating the Product Addon
   *
   * @param {String} id Product Id
   * @param {Array} col Collection of Addon Id's
   * @return {Object} Updated Product Addon Id's
   */
  async updateProductAddon(id, col) {
    let sendingData = {
      Addon: col
    },
    receivingData = {};

    await fetch(`http://localhost:${port}/api/product/${id}/addon`, {
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
   * Removing the Product
   *
   * @param {String} id Product Id
   * @return {Object} Removed Product
   */
  async remove(id) {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/product/${id}`, {
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
   * Return the amount of Products that's in a specific Category
   *
   * @param {String} catId Category Id
   * @return {Object} Amount of Products
   */
  async count(catId) {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/${catId}/product/`, {
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