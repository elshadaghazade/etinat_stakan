// Local Storage'dəki JSON massivi
var choosed_products = JSON.parse(window.localStorage.getItem('choosed_products'));
// İlk dəfəyə məxsus yoxlanır
if (choosed_products == null) {
    choosed_products = [];
}

// Minicarta əlavə olunma
$('.buy').on('click', function() {
    var count = 0;
    count++;
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
    choosed_products.push(product);
    window.localStorage.setItem('choosed_products', JSON.stringify(choosed_products));
    $('.minicart--ul').html('');
    fill_minicart();
})

$('.remove').on('click', function() {
    $(this).parents('.bottom').removeClass('clicked');
})

// Mini cartın LocalStorage'dən gələn data ilə doldurulması
function fill_minicart() {
    choosed_products = JSON.parse(window.localStorage.getItem('choosed_products'));
    if (choosed_products == null) {
        choosed_products = [];
    }
    var total_count = 0;
    var total_price = 0;
    $('.minicart--ul').html('');
    for (let i of choosed_products) {
        add_to_cart(i.name, i.count, i.price, i.image);
        total_count += parseFloat(i.count);
        total_price += parseFloat(i.price);
    }
    $('#cart-items-all-prices').html(`${total_price.toFixed(2)}`);
    $('#cart-items-all-count').html(`${total_count}`)
}

// Mini carta məhsul əlavə edilməsi
function add_to_cart(name, count, price, image) {
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
            <div class="remove-from-minicart"><i class="fa fa-trash-o"></i></div>
        </p>
    </li>
    <hr>
`)
}

// Səhifə açılanda mini səbəti Local Storage'dən gələn data ilə doldurur
fill_minicart();

// Minicartdan məhsulun silinməsi
$('.remove-from-minicart').on('click', function() {
    // Storage
    choosed_products = JSON.parse(window.localStorage.getItem('choosed_products'));
    if (choosed_products == null) {
        choosed_products = [];
    }
    var name = $(this).parents('.minicart--item').children('.img-and-name').children('.title').html();
    for (let i in choosed_products) {
        if (choosed_products[i].name === name) {
            choosed_products.splice(i, 1);
        }
    }
    window.localStorage.setItem('choosed_products', JSON.stringify(choosed_products));
    fill_minicart();
})