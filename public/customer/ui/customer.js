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
CUSTOMER GLOBAL UI  
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

// //Floating cusotmization menu enable/disable
// $(".customize-btn").on("click", (e) => {
//   //check if product id matches
//   for (let i = 0; i < $(".floating-customization-menu").length; i++) {
//     if (e.target.id === $(".floating-customization-menu")[i].id) {
//       // if a match display floating overlay
//       $($(".floating-customization-menu")[i]).removeClass("disabled");
//     }
//   }
// });

$(".cancle-btn").on("click", () => {
  $(".floating-customization-menu").addClass("disabled");
});

$(window).scroll(function () {
  $(".hideme").each(function (i) {
    console.log($(window).scrollTop());
    console.log($(window).scrollTop() + $(this).offset().top);
    var bottom_of_object = $(this).offset().top + $(this).outerHeight();
    var bottom_of_window = $(window).scrollTop() + $(window).height();

    if (bottom_of_window > bottom_of_object) {
      $(this).animate({ opacity: "1" }, 500);
    }
  });
});
