$(".add-btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    $(".category-input").css({display: "none"})
    $(".cancle-category-btn").css({display: "none"})
    $(".add-category-btn").css({display: "block"})

});

$(".add-category-btn").on("click", (e) => {
    $(".category-input").css({display: "flex"})
    $(".add-category-btn").css({display: "none"})
    $(".cancle-category-btn").css({display: "block"})
});

$(".cancle-category-btn").on("click", (e) => {
    $(".add-category-btn").css({display: "block"})
    $(".cancle-category-btn").css({display: "none"})
    $(".category-input").css({display: "none"})
});