// Local Storage'dəki JSON massivi
var cartItems = JSON.parse(window.localStorage.getItem(cartKeyword));
// İlk dəfəyə məxsus yoxlanır
if (cartItems == null) {
    cartItems = [];
}

// Minicarta əlavə olunma
$('.buy').on('click', function() {
    cartItems = JSON.parse(window.localStorage.getItem(cartKeyword));
    if (cartItems == null) {
        cartItems = {};
    }
    // Dizayn
    $('.bottom').removeClass('clicked');
    $(this).parents('.bottom').addClass('clicked');
    // Storage
    var product = {
        id: $(this).parents('.product-item').parents().data('id'),
        name: $(this).parents('.product-item').parents().data('title'),
        price: $(this).parents('.product-item').parents().data('price'),
        image: $(this).parents('.product-item').parents().data('img'),
        count: 1
    }

    if (cartItems[product.id]) {
        cartItems[product.id].count++;
    } else {
        cartItems[product.id] = product;
    }

    window.localStorage.setItem(cartKeyword, JSON.stringify(cartItems));
    $('.minicart--ul').html('');
    fill_minicart();
})

$('.remove').on('click', function() {
    $(this).parents('.bottom').removeClass('clicked');
    cartItems = JSON.parse(window.localStorage.getItem(cartKeyword));
    if (cartItems == null) {
        cartItems = {};
    }
})

// Mini cartın LocalStorage'dən gələn data ilə doldurulması
function fill_minicart() {
    cartItems = JSON.parse(window.localStorage.getItem(cartKeyword));
    if (cartItems == null) {
        cartItems = {};
    }
    var total_count = 0;
    var total_price = 0;
    $('.minicart--ul').html('');
    for (let i of Object.values(cartItems)) {
        add_to_cart(i.id, i.name, i.count, i.price, i.image);
        total_count += parseFloat(i.count);
        total_price += parseFloat(i.price) * parseInt(i.count);
    }
    $('#cart-items-all-prices').html(`${total_price.toFixed(2)}`);
    $('#cart-items-all-count').html(`${total_count}`);
    updateTotalCartInfos();
    fill_shopping_cart();
}

function updateTotalCartInfos() {
    cartItems = JSON.parse(window.localStorage.getItem(cartKeyword));
    if (cartItems == null) {
        $('.total-cart-count').html(0);
        $('.total-cart-price').html('0.0');
    } else {
        var values = Object.values(cartItems);
        var count = values.reduce((p1, p2) => {
            if (p1.count) {
                return parseInt(p1.count) + parseInt(p2.count);
            } else if (p2.count) {
                return p1 + parseInt(p2.count);
            } else {
                return p1;
            }

        }, 0);
        var amount = values.reduce((p1, p2) => {
            if (p1.price) {
                return parseFloat(p1.price) * p1.count + parseFloat(p2.price) * p2.count;
            } else if (p2.count) {
                return p1 + parseFloat(p2.price) * p2.count;
            } else {
                return p1
            }

        }, 0);

        $('.total-cart-count').html(count);
        $('.total-cart-price').html(amount.toFixed(2));
    }
}

// Mini carta məhsul əlavə edilməsi
function add_to_cart(id, name, count, price, image) {
    $('.minicart--ul').append(`
    <li class="minicart--item">
        <div class="img-and-name">
            <img src='${image}' class="choosed--item-image">
            <h1 class="title">${name}</h1>
        </div>
        <p class="choosed--items-count">
        <span style="font-weight: 600;">Число:<br></span><span id="cart-item-count">${count}</span></p>
        <p class="choosed--items-price">
            <span style="font-weight: 600;">Цена товара:<br></span><span id="cart-item-price"><a href="${_APP_SETTINGS.paths.wholesalersUri}#askPriceList">узнать цену</a></span></p>
        <p class="minicart--item-price">
        <p class="minicart--item-remove">
            <div class="remove-from-minicart" data-id="${id}"><i class="fa fa-trash-o"></i></div>
        </p>
    </li>
    <hr>
`)
}

// Səhifə açılanda mini səbəti Local Storage'dən gələn data ilə doldurur
fill_minicart();

// Minicartdan məhsulun silinməsi
$(document).on('click', '.remove-from-minicart', function() {
    var id = $(this).data('id');
    // Storage
    cartItems = JSON.parse(window.localStorage.getItem(cartKeyword));
    if (cartItems == null) {
        cartItems = {};
    }
    console.log(cartItems, id, cartItems[id])
    if (cartItems[id]) {
        delete cartItems[id];
    }
    window.localStorage.setItem(cartKeyword, JSON.stringify(cartItems));
    fill_minicart();
});


/* ------------------ checkout page codes ---------------------- */
$(document).on('click', '.minus-btn', function(e){
    var id = $(this).data('id');
    decreaseProductQty(id, 1);
    fill_minicart();
});

$(document).on('click', '.plus-btn', function(e){
    var id = $(this).data('id');
    increaseProductQty(id, 1);
    fill_minicart();
});

var timeout1 = -1;
$(document).on('input', '.checkout-product-qty', function(e){

    clearTimeout(timeout1);
    setTimeout(() => {
        var id = $(this).data('id');
        var qty = parseInt($(this).val());

        if (isNaN(qty)) {
            $(this).val(1);
            return;
        }

        setProductQty(id, qty);
        fill_minicart();
    }, 1000);
});

$(document).on('click', '.delete-btn', function(){
    var id = $(this).data('id');
    removeProduct(id);
    fill_minicart();
});

function fill_shopping_cart () {
    var cartItems = JSON.parse(window.localStorage.getItem(cartKeyword));
    if (cartItems == null) {
        cartItems = {};
    }

    $('.shopping-cart #checkout-items').empty();
    var totalPrice = 0;
    for(let product of Object.values(cartItems)) {
        appendNewItem(product);
        totalPrice += parseFloat(product.price) * product.count;
    }

    $('#checkout-total-price').html(totalPrice.toFixed(2));
}

function appendNewItem (product) {
    var content = `
    <div class="item">
        <div class="buttons">
            <div class="delete-btn" data-id="${product.id}"><i class="fas fa-times"></i></div>
        </div>

        <div class="image">
            <img src="${product.image}" alt="" />
        </div>

        <div class="description">
            <span>${product.name}</span>
        </div>

        <div class="quantity">
            <button class="minus-btn" type="button" name="button" data-id="${product.id}">
        <img src="${_APP_SETTINGS.statics.minusSVG}" alt="" />
        </button>
            <input class="checkout-product-qty" data-id="${product.id}" type="text" name="name" value="${product.count}">
            <button class="plus-btn" type="button" name="button" data-id="${product.id}">
        <img class="m-0" src="${_APP_SETTINGS.statics.plusSVG}" alt="" />
        </button>
        </div>

        <div class="total-price"><span class="price-decimal"><a href="${_APP_SETTINGS.paths.wholesalersUri}#askPriceList">узнать цену</a></span></div>
    </div>`;

    $('.shopping-cart #checkout-items').append(content);    
}

/* -------------------------------------------------------------- */