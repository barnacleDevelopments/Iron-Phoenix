const hamburgerMenu = document.querySelector(".hamburger-menu");
const hiddenNav     = document.querySelector(".navbar-hidden");
const hiddenHaburger = document.querySelector(".hidden-hamburger-menu");
const sideNavBtns = document.querySelectorAll(".side-nav-btn");
const subMenu = document.querySelector(".sub-menu");
const chatBubble = document.querySelector(".chat-bubble");
const chatContainer = document.querySelector(".chat-container");
const userIcon = document.querySelector(".user-icon")

console.log(chatBubble)


// Bottom Scroll Animations 
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        chatBubble.classList.add(".bob-down")
    }
 });


// // HAMBURGER MENU ANIMATIONS
// hamburgerMenu.addEventListener("click", (e) => {
//     e.preventDefault()
//     if(hiddenNav.classList) {
//         hiddenNav.classList.remove("nav-in");
//         hiddenNav.classList.add("nav-out");
//     } 
// });

// hiddenHaburger.addEventListener("click", (e) => {
//     e.preventDefault()
//     if(hiddenNav.classList) {
//         hiddenNav.classList.remove("nav-out");
//         hiddenNav.classList.add("nav-in");
//     } 
// });

// sideNavBtns.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     if(btn.nextElementSibling.classList.contains("show")) {
//           btn.nextElementSibling.classList.remove("show");
//     } else {
//         btn.nextElementSibling.classList.add("show");
//     }
// })
// });

// // USER ICON ANIMATIONS
// userIcon.addEventListener("click", () => {

// });

//CHAT BUBBLE ANIMATIONS 

chatBubble.addEventListener("click", (e) => {
    e.preventDefault()
    if(chatContainer.classList.contains("openChat")) {
        chatContainer.classList.remove("openChat")
        chatContainer.classList.add("closeChat");
    } else {
        chatContainer.classList.add("openChat")
        chatContainer.classList.remove("closeChat");
    }
});



