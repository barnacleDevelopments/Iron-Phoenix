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
ADMIN PRODUCT ADDON HANDLERS 
==============================

@ AUTHOR DEVIN S. DAVIS
*/

const appendAddons = (prodId, container) => {
    let addon = new Addon();
    let product = new Product();
    product.getProductAddonIds(prodId).then((procAddons) => {
      if (!procAddons.data.err) {
        addon.getAll().then((addons) => {
          if (!addons.data.err) {
            addons.data.forEach((an) => {
              let newChip = new Chip(an._id, an.name, "inactive")
              let chip = newChip.createBasic(true)
              document.getElementById("addon-form-list").append(chip);
            });

            // get all the chips inside chip container
            let addonChips = container.children;

            // loop over all the chips and change their status
            Object.keys(addonChips).forEach((key) => {
              procAddons.data.forEach((procAll) => {
                if (addonChips[key].getAttribute("data-allid") === procAll) {
                  addonChips[key].setAttribute("data-chipstatus", "active");
                  addonChips[key].setAttribute(
                    "style",
                    "background-color: #5cb85c; color: white"
                  );
                }
              });
            });
          } else {
            console.log(addons.data.errMessage);
          }
        });
      } else {
        console.log(procAddons.data.errMessage);
      }
    });
  }

const updateAddons = (prodId, containerChildren) => {
    let product = new Product();
    let newAddonArr = [];
        Object.keys(containerChildren).forEach((key) => {
          if (
            containerChildren[key].getAttribute("data-chipstatus") ===
            "active"
          ) {
            newAddonArr.push(
              containerChildren[key].getAttribute("data-allid")
            );
          }
        });
        product.updateProductAddon(prodId, newAddonArr).then(add => {
            if(add.data.err) {
                console.log(add.data.errMessage)
            } 
        })
}