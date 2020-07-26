//Category ADD input
$(".add-btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    $(".category-input").css({display: "none"});
    $(".cancle-category-btn").css({display: "none"});
    $(".add-category-btn").css({display: "block"});

});

$(".add-category-btn").on("click", (e) => {
    $(".category-input").css({display: "flex"});
    $(".add-category-btn").css({display: "none"});
    $(".cancle-category-btn").css({display: "block"});
});

$(".cancle-category-btn").on("click", (e) => {
    $(".add-category-btn").css({display: "block"});
    $(".cancle-category-btn").css({display: "none"});
    $(".category-input").css({display: "none"});
});


//Product ADD input 
$(".add-product-btn").on("click", (e) => {
    $(".product-btn").css({display: "none"});
    $(".product-input").css({display: "flex"});
    $(".add-product-btn").css({display: "none"})
});

$(".product-cancle-btn").on("click", (e) => {
    $(".product-input").css({display: "none"});
    $(".add-product-btn").css({display: "inline-block"})
   
});

$(".product-save-btn").on("click", (e) => {
    $(".product-input").css({display: "none"});
    $(".add-product-btn").css({display: "inline-block"})
});

$(".collapsible-header-container").on("click", () => {
    $(".product-input").css({display: "none"});
    $(".add-product-btn").css({display: "inline-block"})
});

$(".category-save-btn").on("click", () => {
    $(".category-input").css({display: "none"})
    $(".add-category-btn").css({display: "block"});

})

$(".category-cancle-btn").on("click", () => {
    $(".category-input").css({display: "none"})
    $(".add-category-btn").css({display: "block"});

})



