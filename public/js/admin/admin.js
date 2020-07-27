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

$(".product-cancel-btn").on("click", (e) => {
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

$(".category-cancel-btn").on("click", () => {
    $(".category-input").css({display: "none"})
    $(".add-category-btn").css({display: "block"});

});

// Product Management Prompts 
    // delete category btn
$(".delete-category-btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    $(".admin-product-floater-container").css({display: "block"});
    $(".category-prompt").css({display: "block"});
});

    // delete product btn
$(".delete-product-btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    $(".admin-product-floater-container").css({display: "block"});
    $(".product-prompt").css({display: "block"});
});

    //edit category btn
$(".edit-category-btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    $(".admin-product-floater-container").css({display: "block"});
    $(".edit-category-menu").css({display: "block"});
});

    //edit product btn
$(".edit-product-btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    $(".admin-product-floater-container").css({display: "block"});
    $(".edit-product-menu").css({display: "block"})
    });
    

    //cancle/confirm/save buttons
$(".cancel-btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    $(".admin-product-floater-container").css({display: "none"});
    $(".category-prompt").css({display: "none"});
    $(".product-prompt").css({display: "none"});
    $(".edit-category-menu").css({display: "none"});
    $(".admin-product-floater-container").css({display: "none"});
    $(".edit-product-menu").css({display: "none"});
});
    
$(".delete-confirm-btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    $(".admin-product-floater-container").css({display: "none"});
    $(".category-prompt").css({display: "none"});
    $(".product-prompt").css({display: "none"});
    $(".edit-category-menu").css({display: "none"});
});

$(".save-btn").on("click", (e) => {
    $(".admin-product-floater-container").css({display: "none"});
    $(".edit-product-menu").css({display: "none"});
    $(".edit-category-menu").css({display: "none"});
});



