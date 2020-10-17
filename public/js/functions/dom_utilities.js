/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-10-13
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
//=================================
// ADMIN DYNAMIC COMPONENTS 
//=================================

@ AUTHOR DEVIN S. DAVIS
*/

const walkTheDOM = function walk(node, func) {
  func(node);
  node = node.firstElementChild;
  console.log(node);
  while (node) {
    walk(node, func);
    node = node.nextSibling();
  }
};

const getElsByAttribute = function (parent, att, value) {
  var results = [];
  walkTheDOM(parent, (node) => {
    let actual = node.nodeType === 1 && node.getAttribute(att);
    if (
      typeof actual === "string" &&
      (actual === value || typeof value !== "string")
    ) {
      results.push(node);
    }
  });
  return results;
};

const getElByAttribute = (parent, att, value) => {
  let result;
  walkTheDOM(parent, (node) => {
    let actual = node.nodeType === 1 && node.getAttribute(att);

    if (
      typeof actual === "string" &&
      (actual === value || typeof value !== "string")
    ) {
      result = node;
    }
    return result;
  });
};
