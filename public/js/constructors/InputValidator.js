/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-07-01
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
//=================================
// CLASSES
//=================================

@ AUTHOR DEVIN S. DAVIS
*/

// ---------------------------------------
//  STRING VALIDATION CLASS
// ---------------------------------------

class StringValidater {
  constructor(string) {
    this.string = string;
  }
  get() {
    return this.string;
  }
  isBiggerThen(length) {
    if (this.string.length > length) {
      return true;
    } else {
      return false;
    }
  }
  isSmallerOrEqual(length) {
    if (this.string.length <= length) {
      return true;
    } else {
      return false;
    }
  }
  isThisLong(length) {
    if (this.string.length === length) {
      return true;
    } else {
      return false;
    }
  }
  seperatedExeeds(length) {
    let stringArr = this.string.split(" ");
    let doesExeed = false;
    stringArr.forEach((string) => {
      if (string.length > length) {
        doesExeed = true;
      }
    });

    if (doesExeed) {
      return doesExeed;
    }
  }

  seperatedNotExeeds(length) {
    let stringArr = this.string.split(" ");
    let doesExeed = false;
    stringArr.forEach((string) => {
      if (string.length < length) {
        doesExeed = true;
      }
    });

    if (doesExeed) {
      return doesExeed;
    }
  }
}
