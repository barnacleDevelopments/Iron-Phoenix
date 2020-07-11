const hamburgerMenu = document.querySelector(".hamburger-menu");
const hiddenNav     = document.querySelector(".navbar-hidden");
const hiddenHaburger = document.querySelector(".hidden-hamburger-menu");
const sideNavBtns = document.querySelectorAll(".side-nav-btn");
const subMenu = document.querySelector(".sub-menu");
const chatBubble = document.querySelector(".chat-bubble");
const chatContainer = document.querySelector(".chat-container");
const userIcon = document.querySelector(".user-icon");
const optionMenu = document.querySelector(".option-menu");
const shadow   = document.querySelector(".shadow");
const optionMenuShadow = document.querySelector(".option-menu-shadow")
const chatMenuShadow = document.querySelector(".chat-menu-shadow");
const itemDescription = document.querySelector(".item-description")

const searchBar = document.querySelector(".searchbar");
const categoryBar = document.querySelector(".category-bar");


$(window).scroll( function(){
    $('.hideme').each( function(i){
console.log($(window).scrollTop())
console.log($(window).scrollTop() + $(this).offset().top)
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        if( bottom_of_window > bottom_of_object ){

            $(this).animate({'opacity':'1'},500);

        } 

    }); 

});

$(window).scroll( function(){
    $('.hideme').each( function(i){
console.log($(window).scrollTop())
console.log($(window).scrollTop() + $(this).offset().top)
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        if( $(this).offset().top <= 72) {
            $(this).animate({'opacity':'0'},500);
        } 

    }); 

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
        optionMenu.classList.remove("close-user-menu")
        optionMenu.classList.add("open-user-menu");
        // ADD shadow 
        optionMenuShadow.classList.add("shadow-active")
    } else {
        optionMenu.classList.add("open-user-menu");
        optionMenu.classList.remove("close-user-menu");
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
        optionMenu.classList.remove("open-user-menu");
        //close shadows 
        optionMenuShadow.classList.remove("shadow-active");
        chatMenuShadow.classList.remove("shadow-active")

    }
});




