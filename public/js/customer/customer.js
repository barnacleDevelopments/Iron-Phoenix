const displayShadowOverlay = () => {
    $(".option-menu-shadow").css({display: "block"})
}

const removeShadowOverlay = () => {
    $(".option-menu-shadow").css({display: "none"})
}

$('.dropdown-trigger').dropdown({
    onOpenStart: displayShadowOverlay,
    onCloseStart: removeShadowOverlay
});

$(document).ready(function(){
    $('.collapsible').collapsible();
  });


$(document).ready(function(){
    $('.sidenav').sidenav();
  });

$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });

//Floating cusotmization menu enable/disable
$(".customize-btn").on("click", (e) => {
    //check if product id matches
    for(let i = 0; i < $(".floating-customization-menu").length; i++) {
        if(e.target.id === $(".floating-customization-menu")[i].id) {
            // if a match display floating overlay
            $($(".floating-customization-menu")[i]).removeClass("disabled")
        }
    }
});

$(".cancle-btn").on("click", () => {
    $(".floating-customization-menu").addClass("disabled")
});

// Floating product image disable/enable
$(".image-expand-button").on("click", (e) => {
    //check if product id matches
    for(let i = 0; i < $(".floating-product-img").length; i++) {
        if(e.target.id === $(".floating-product-img")[i].id) {
            // if a match display floating overlay
            $($(".floating-product-img")[i]).removeClass("disabled")
        }
    }
});

$(".floating-product-img").on("click", () => {
    $(".floating-product-img").addClass("disabled")
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


