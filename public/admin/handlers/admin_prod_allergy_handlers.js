/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-11-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
==============================
ADMIN PRODUCT ALLERGY HANDLERS 
==============================

@ AUTHOR DEVIN S. DAVIS
*/

const appendAllergies = (prodId, container) => {
    // create chip container
    let allergy = new Allergy();
        let product = new Product();
  
    product.getProductAllergyIds(prodId).then((procAllergies) => {
        if (!procAllergies.data.err) {        
            allergy.getAll().then((allergies) => {
            if (!allergies.data.err) {
                allergies.data.forEach((all) => {
                let newChip = new Chip(all._id, all.name, "inactive")
                let chip = newChip.createBasic(true)
                container.append(chip);
                });
  
                let allergyElements = container.children;

                Object.keys(allergyElements).forEach((key) => {
                  procAllergies.data.forEach((procAll) => {
                    if (
                      allergyElements[key].getAttribute("data-allid") === procAll
                    ) {
                      allergyElements[key].setAttribute(
                        "data-chipstatus",
                        "active"
                      );
                      allergyElements[key].setAttribute(
                        "style",
                        "background-color: #5cb85c; color: white"
                      );
                    }
                  });
                });
            } else {
                console.log(allergies.data.errMessage);
            }
            });
        } else {
            console.log(procAllergies.data.errMessage);
          }
    });
  }
  
const updateAllergies = (prodId, containerChildren) => {
    let newAllArr = [];
    let product = new Product()
    Object.keys(containerChildren).forEach((key) => {
      if (
        containerChildren[key].getAttribute("data-chipstatus") ===
        "active"
      ) {
        newAllArr.push(containerChildren[key].getAttribute("data-allid"));
      }
    });
    product.updateProductAllergy(prodId, newAllArr).then(all => {
      if(all.data.err) {
        console.log(all.data.errMessage)
      }
    })
}
  