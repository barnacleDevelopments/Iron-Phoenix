const chatBubble = document.querySelector(".chat-bubble");
const chatContainer = document.querySelector(".chat-container");
const chatMenuShadow = document.querySelector(".chat-menu-shadow");
const itemDescription = document.querySelector(".item-description")
const searchBar = document.querySelector(".searchbar");
const categoryBar = document.querySelector(".category-bar");


$('.dropdown-trigger').dropdown();

$('.dropdown-trigger').on("click", () => {
    $(".option-menu-shadow").addClass("shadow-active")
});

$(".option-menu-shadow").on("click", () => {
    $(".option-menu-shadow").removeClass("shadow-active")
});

$(document).ready(function(){
    $('.collapsible').collapsible();
    $(".category-item").addClass(".category-item-open")
    console.log($(".category-item"))
  });



       

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

// $(window).scroll( function(){
//     $('.hideme').each( function(i){
// console.log($(window).scrollTop())
// console.log($(window).scrollTop() + $(this).offset().top)
//         var bottom_of_object = $(this).offset().top + $(this).outerHeight();
//         var bottom_of_window = $(window).scrollTop() + $(window).height();

//         if( $(this).offset().top <= 72) {
//             $(this).animate({'opacity':'0'},500);
//         } 

//     }); 

// });


