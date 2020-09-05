/*
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
 */

/**
 * A Category Class
 *
 * @author Shaquille Lynch
 */
class Category {
  /** Constructor **/

  /**
   * A constructor for Category class
   *
   * @param {String} name Category name
   */
  constructor(name) {
    this.name = name;
  }

  /** Methods **/
  /**
   * Creating the Category
   *
   * @param {String} name Category Name
   * @return {Object} Created Category
   */
  async create(name) {
    let sendingData = {
        name: name,
      },
      receivingData = {};

    await fetch(`http://localhost:${port}/api/category/`, {
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
   * Getting the Category
   *
   * @param {String} id Category Id
   * @return {Object} Category
   */
  async get(id) {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/category/${id}`, {
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
   * Getting all the Categories
   *
   * @return {Object} Categories
   */
  async getAll() {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/category/`, {
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
   * Updating the Category
   *
   * @param {String} id Category Id
   * @param {String} name Category Name
   * @return {Object} Updated Category
   */
  async update(id, name) {
    let sendingData = {
        name: name,
      },
      receivingData = {};

    await fetch(`http://localhost:${port}/api/category/${id}`, {
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
   * Removing the Category
   *
   * @param {String} id Category Id
   * @return {Object} Removed Category
   */
  async remove(id) {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/category/${id}`, {
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
   * Return the amount of Categories
   *
   * @return {Object} Amount of Categories
   */
  async count() {
    let receivingData = {};

    await fetch(`http://localhost:${port}/api/category/`, {
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
