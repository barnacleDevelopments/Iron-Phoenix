const hamburgerMenu = document.querySelector(".hamburger-menu");
const hiddenNav     = document.querySelector(".navbar-hidden");
const hiddenHaburger = document.querySelector(".hidden-hamburger-menu")
const sideNavBtns = document.querySelectorAll(".side-nav-btn");
const subMenu = document.querySelector(".sub-menu")

hamburgerMenu.addEventListener("click", (e) => {
    e.preventDefault()
    if(hiddenNav.classList) {
        hiddenNav.classList.remove("nav-in")
        hiddenNav.classList.add("nav-out")
    } 
});

hiddenHaburger.addEventListener("click", (e) => {
    e.preventDefault()
    if(hiddenNav.classList) {
        hiddenNav.classList.remove("nav-out")
        hiddenNav.classList.add("nav-in")
    } 
});

sideNavBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
    e.preventDefault();
    if(btn.nextElementSibling.classList.contains("show")) {
          btn.nextElementSibling.classList.remove("show");
    } else {
        btn.nextElementSibling.classList.add("show")
    }
      
    
})
});

