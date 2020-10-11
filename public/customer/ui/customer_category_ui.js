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
