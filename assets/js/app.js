var product = {
    brand: "Mohan",
    title: "Recycle Boucle Knit Cardigan Pink",
    price: 120,
    colorOptions: [{ id: 0, className: "color-black" }, { id: 1, className: "color-beige" }, { id: 2, className: "color-white" }],
    sizeOptions: [{ id: 0, size: "S" }, { id: 1, size: "M" }, { id: 2, size: "L" }]
}

var state = {
    selectedColorID: 0,
    selectedSizeID: 0,
    quantity: 0,
    price: 0,
}

selectColor = function (prevID, newID) {
    $(".product-colors").children().children(".color[data-color-id=" + prevID + "]").parent().removeClass("selected-color");
    $(".product-colors").children().children(".color[data-color-id=" + newID + "]").parent().addClass("selected-color");

    $(".cart-colors").children().children(".color[data-color-id=" + prevID + "]").parent().removeClass("selected-color");
    $(".cart-colors").children().children(".color[data-color-id=" + newID + "]").parent().addClass("selected-color");

    state.selectedColorID = newID;
}

selectSize = function (prevID, newID) {
    $(".product-sizes").children(".size[data-size-id=" + prevID + "]").removeClass("selected-size");
    $(".product-sizes").children(".size[data-size-id=" + newID + "]").addClass("selected-size");

    $(".cart-sizes").children(".size[data-size-id=" + prevID + "]").removeClass("selected-size");
    $(".cart-sizes").children(".size[data-size-id=" + newID + "]").addClass("selected-size");

    state.selectedSizeID = newID;
}

editQuantity = function (isIncrement) {
    if (isIncrement) {
        state.quantity++;
        state.price += product.price;
        if (state.quantity == 1) {
            $("#addToBasketRow").addClass("d-none");
            $(".quantity-counter").removeClass("d-none");
            $(".cart-footer-text").text("Buy Now");
            $(".cart-empty").addClass("d-none");
            $(".cart-product").removeClass("d-none");
        }
        $("#total-price").text(state.price);
        $("#quantity").text(state.quantity);
        $("#card-quantity-value").text(state.quantity);
    } else {
        if (state.quantity > 0) {
            state.quantity--;
            state.price -= product.price;
        } else {
            return;
        }
        if (state.quantity == 0) {
            $("#addToBasketRow").removeClass("d-none");
            $(".quantity-counter").addClass("d-none");
            $(".cart-footer-text").text("COntinue SHopping");
            $(".cart-empty").removeClass("d-none");
            $(".cart-product").addClass("d-none");
        }
        $("#total-price").text(state.price);
        $("#quantity").text(state.quantity);
        $("#card-quantity-value").text(state.quantity);
    }
}

$(document).ready(function () {
    $("#owl-demo").owlCarousel({

        navigation: false, // Show next and prev buttons
        pagination: true,
        slideSpeed: 300,
        paginationSpeed: 400,

        items: 1,
        itemsDesktop: false,
        itemsDesktopSmall: false,
        itemsTablet: false,
        itemsMobile: true

    });

    //nav collapse effect
    $(".nav-title-wrapper").click(function () {
        $(this).siblings(".nav-two").slideToggle(500);
    });

    //nav close
    $(".side-nav-close").click(function () {
        $('.side-nav').hide("slide", { direction: "left" }, 600);
        $(".product-footer").removeClass("d-none");
    });

    //nav open
    $("#side-nav-open").click(function () {
        $(".side-nav").show("slide", { direction: "left" }, 600);
        $(".product-footer").addClass("d-none");
    });

    //cart open
    $("#cart-open").click(function () {
        $(".cart").show("slide", { direction: "right" }, 600);
        $(".product-footer").addClass("d-none");
    });

    //cart close
    $(".cart-close").click(function () {
        $(".cart").hide("slide", { direction: "right" }, 600);
        $(".product-footer").removeClass("d-none");
    })

    //select color in product
    $(".product-color-wrapper").click(function () {
        var prevSelectedColorID = state.selectedColorID;
        var newID = $(this).children(".color").attr("data-color-id");
        selectColor(prevSelectedColorID, newID);
    });

    //select size in product
    $(".product-size").click(function () {
        var prevSelectedSizeID = state.selectedSizeID;
        var newID = $(this).attr("data-size-id");
        selectSize(prevSelectedSizeID, newID);
    });

    //select color in cart
    $(".cart-color-wrapper").click(function () {
        var prevSelectedColorID = state.selectedColorID;
        var newID = $(this).children(".color").attr("data-color-id");
        selectColor(prevSelectedColorID, newID);
    });

    //select size in cart
    $(".cart-size").click(function () {
        var prevSelectedSizeID = state.selectedSizeID;
        var newID = $(this).attr("data-size-id");
        selectSize(prevSelectedSizeID, newID);
    });

    //add item to cart
    $("#add-to-cart").click(function () {
        editQuantity(true);
    });

    // increase quantity in product footer
    $("#plus-quantity").click(function () {
        editQuantity(true);
    });

    //decrease quantity in product footer
    $("#minus-quantity").click(function () {
        editQuantity(false);
    });

    //increase quantity in cart
    $(".cart-minus").click(function () {
        editQuantity(false);
    });

    //decrease quantity in cart
    $(".cart-plus").click(function () {
        editQuantity(true);
    });

})