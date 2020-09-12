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
==============================
GLOBAL ADMIN UI
==============================

@ AUTHOR DEVIN S. DAVIS
*/

/*
==============================
FUNCTIONS 
==============================
*/

const displayShadowOverlay = () => {
  $(".option-menu-shadow").css({ display: "block" });
};

const removeShadowOverlay = () => {
  $(".option-menu-shadow").css({ display: "none" });
};
// Materialize Drop Down menu triggers
$(document).ready(function () {
  $(".collapsible").collapsible();
  $(".dropdown-trigger").dropdown({
    onOpenStart: displayShadowOverlay,
    onCloseStart: removeShadowOverlay,
  });
  $(".sidenav").sidenav();
});

// display and hide searchbar on scroll

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".searchbar").style.top = "0";
  } else {
    document.querySelector(".searchbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
};
