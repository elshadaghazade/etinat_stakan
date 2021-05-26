// Local Storage'dəki JSON massivi
var choosed_products = JSON.parse(window.localStorage.getItem('choosed_products'));
// İlk dəfəyə məxsus yoxlanır
if (choosed_products == null) {
    choosed_products = [];
}

// Minicarta əlavə olunma
$('.buy').on('click', function() {
    choosed_products = JSON.parse(window.localStorage.getItem('choosed_products'));
    if (choosed_products == null) {
        choosed_products = {};
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

    if (choosed_products[product.id]) {
        choosed_products[product.id].count++;
    } else {
        choosed_products[product.id] = product;
    }

    window.localStorage.setItem('choosed_products', JSON.stringify(choosed_products));
    $('.minicart--ul').html('');
    fill_minicart();
    updateTotalCartInfos();
})

$('.remove').on('click', function() {
    $(this).parents('.bottom').removeClass('clicked');
    choosed_products = JSON.parse(window.localStorage.getItem('choosed_products'));
    if (choosed_products == null) {
        choosed_products = {};
    }
})

// Mini cartın LocalStorage'dən gələn data ilə doldurulması
function fill_minicart() {
    choosed_products = JSON.parse(window.localStorage.getItem('choosed_products'));
    if (choosed_products == null) {
        choosed_products = {};
    }
    var total_count = 0;
    var total_price = 0;
    $('.minicart--ul').html('');
    for (let i of Object.values(choosed_products)) {
        add_to_cart(i.id, i.name, i.count, i.price, i.image);
        total_count += parseFloat(i.count);
        total_price += parseFloat(i.price) * parseInt(i.count);
    }
    $('#cart-items-all-prices').html(`${total_price.toFixed(2)}`);
    $('#cart-items-all-count').html(`${total_count}`)
}

function updateTotalCartInfos() {
    choosed_products = JSON.parse(window.localStorage.getItem('choosed_products'));
    if (choosed_products == null) {
        $('.total-cart-count').html(0);
        $('.total-cart-price').html('0.0');
    } else {
        var values = Object.values(choosed_products);
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
            <span style="font-weight: 600;">Цена товара:<br></span><span id="cart-item-price">${price}</span> ₽</p>
        <p class="minicart--item-price">
        <span style="font-weight: 600;">Общее:<br></span><span id="cart-item-total-price">${count*price}</span>₽ (<span id="cart-item-count">${count}</span>x)</p>
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
    choosed_products = JSON.parse(window.localStorage.getItem('choosed_products'));
    if (choosed_products == null) {
        choosed_products = {};
    }
    console.log(choosed_products, id, choosed_products[id])
    if (choosed_products[id]) {
        delete choosed_products[id];
    }
    window.localStorage.setItem('choosed_products', JSON.stringify(choosed_products));
    fill_minicart();
    updateTotalCartInfos();
})

updateTotalCartInfos();