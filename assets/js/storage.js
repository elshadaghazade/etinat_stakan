var cartKeyword = "products-in-the-cart";

function getItemsFromCart () {
    if (choosed_products == null) {
        choosed_products = [];
    }

    return choosed_products;
}

function isItemExistsInTheCart (id) {
    var items = getItemsFromCart();
    return !!items[id];
}

function getProduct (id) {
    var items = getItemsFromCart();
    return items[id];
}

function addProduct (product) {
    var items = getItemsFromCart();
    if (items[product.id]) {
        items[product.id].count += product.count;
    } else {
        items[product.id] = product;
    }
    window.localStorage.setItem(cartKeyword, JSON.stringify(items));
}

function increaseProductQty (id, count) {
    var items = getItemsFromCart();

    if (!items[id]) {
        return;
    }

    items[id].count += count;
    window.localStorage.setItem(cartKeyword, JSON.stringify(items));
}

function decreaseProductQty (id, count) {
    var items = getItemsFromCart();

    if (!items[id] || items[id].count <= 1) {
        return;
    }

    items[id].count -= count;
    window.localStorage.setItem(cartKeyword, JSON.stringify(items));
}

function setProductQty (id, qty) {
    var items = getItemsFromCart();
    if (!items[id]) {
        return;
    }
    
    items[id].count = qty;
    window.localStorage.setItem(cartKeyword, JSON.stringify(items));
}

function removeProduct (id) {
    var items = getItemsFromCart();
    if (items[id]) {
        delete items[id];
    }

    window.localStorage.setItem(cartKeyword, JSON.stringify(items));
}

function clearCart () {
    window.localStorage.setItem(cartKeyword, JSON.stringify({}));
}