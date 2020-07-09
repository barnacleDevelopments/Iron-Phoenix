const hamburgerMenu = document.querySelector(".hamburger-menu");
const hiddenNav     = document.querySelector(".navbar-hidden");
const hiddenHaburger = document.querySelector(".hidden-hamburger-menu");
const sideNavBtns = document.querySelectorAll(".side-nav-btn");
const subMenu = document.querySelector(".sub-menu");
const chatBubble = document.querySelector(".chat-bubble");
const chatContainer = document.querySelector(".chat-container");
const userIcon = document.querySelector(".user-icon");
const userIconMenu = document.querySelector(".user-icon-menu");
const shadow   = document.querySelector(".shadow");
const userMenuShadow = document.querySelector(".user-menu-shadow")
const chatMenuShadow = document.querySelector(".chat-menu-shadow")

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

//USER ICON ANIMATIONS
userIcon.addEventListener("click", (e) => {
    e.preventDefault();
    if(chatContainer.classList) {
        userIconMenu.classList.remove("close-user-menu")
        userIconMenu.classList.add("open-user-menu");
        // ADD shadow 
        userMenuShadow.classList.add("shadow-active")
    } else {
        userIconMenu.classList.add("open-user-menu");
        userIconMenu.classList.remove("close-user-menu");
    }
})

//CHAT BUBBLE ANIMATIONS 
chatBubble.addEventListener("click", (e) => {
    e.preventDefault()
    if(chatContainer.classList.contains("openChat")) {
        chatContainer.classList.remove("openChat")
        chatContainer.classList.add("closeChat");
        // Remove shadow 
        chatMenuShadow.classList.remove("shadow-active")
     
    } else {
   
        chatContainer.classList.add("openChat")
        chatContainer.classList.remove("closeChat");
        // ADD shadow 
        chatMenuShadow.classList.add("shadow-active")
    }
});


window.addEventListener("click", (e) => {
    const target = e.target
    if(!target.classList.contains("chat-bubble") && !target.classList.contains("material-icons")) {
        chatContainer.classList.remove("openChat");
        chatContainer.classList.add("closeChat");
        // close menus
        userIconMenu.classList.remove("open-user-menu");
        //close shadows 
        userMenuShadow.classList.remove("shadow-active");
        chatMenuShadow.classList.remove("shadow-active")

    }
});




