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
GLOBAL CUSTOMER UI
==============================

@ AUTHOR DEVIN S. DAVIS
*/

// option menu shadow overlay
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

// Order view materialize carousel logic
$(".carousel.carousel-slider").carousel({
  fullWidth: true,
  indicators: true,
});
