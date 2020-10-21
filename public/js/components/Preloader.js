/*
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * Version 1
 *
 * 2020-10-19
 *
 * Copyright 2020, Iron Phoenix, All rights reserved.
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 */

/*
//=================================
// PRELOADER ELEMENT CLASS
//=================================

@ AUTHOR DEVIN S. DAVIS
*/

class Preloader {
    constructor() {

    }
    // create material large preloader
big() {
    return `  
        <div style="width: 100%; margin: 0 auto;">
        <div class="preloader-wrapper big active" style="margin: 0 auto;">
          <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
        </div>`;
  }
  
  // create material small preloader
  small() {
    let element = document.createElement("div");
    element.innerHTML = `
    <div class="preloader-wrapper active">
      <div class="spinner-layer spinner-green-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  `;
    return element;
  }
}
