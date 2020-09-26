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
     * log user in
     *
     * @return {Object} Added User
     */
    async login(email, accountKey) {
        let sendingData = {
            email: email,
            account_key: accountKey
        }, receivingData = {};

        await fetch(`http://localhost:${port}/login`, {
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
}  