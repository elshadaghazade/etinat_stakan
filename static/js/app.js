// Xırda stəkanlara basanda arxa fonun fən fincan şəklinin ona uyğun dəyişməsi
$('.about-icon').on('click', function() {
    var color = $(this).data('color');
    var id = $(this).data('id');
    console.log(color);
    console.log(id);
    $('.about-us').css(
        'background',
        `linear-gradient( 
        0deg
        , rgb(255, 255, 255), ${color} 15%, rgb(255, 255, 255))`);
    var image = $(`.icon-${id}`).children('img').attr('src');
    console.log(image);
    $('.home-image').children('img').attr('src', `${image}`);
})

// Products
$('.tab-heading').click(function() {
    let dataName = $(this).data('name')
    let tabContents = $('.tab-content')
    tabContents.each(function(index, value) {
        let dataValue = $(value).data('name')
        $(value).removeClass('active')
        if (dataValue === dataName) {
            $(value).addClass('active')
        }
    })
    let tabImages = $('.tab-image')
    tabImages.each(function(index, value) {
        let imageValue = $(value).data('name')
        $(value).removeClass('active')
        if (imageValue === dataName) {
            $(value).addClass('active')
        }
    })

})

// CallBack PopUp

$('.call-back-link').on('click', function() {
    $('#callback-popup').css('display', 'block');
});


$('.close').on('click', function() {
    $('#callback-popup').css('display', 'none');
})

$(window).on('click', function(event) {
    if ($('#callback-popup').is(event.target)) {
        $('#callback-popup').css('display', 'none');
    }
})

var images_array = ["./assets/images/cups/cup-main.png", "./assets/images/cups/cup1.png", "./assets/images/cups/cup2.png", "./assets/images/cups/cup3.png", "./assets/images/cups/cup4.png", "./assets/images/cups/cup5.png", "./assets/images/cups/cup6.png"]
var index = 0;

setInterval(function() {
    $('.header-cup-image').attr('src', images_array[index]);
    index++;
    if (index == images_array.length - 1) index = 0;
}, 5000);

// Səbətin hover olanda açılması

$('#cart-button').mouseover(function() {
    $('.minicart').css('display', "block")
})
$('.cart-items').mouseleave(function() {
        $('.minicart').css('display', "none")
    })

// Etinat Filtered

$('.first-circle-icon').hover(function() {
    $('.circle').removeClass('active')
    $('.first-circle').addClass('active')
})
$('.second-circle-icon').hover(function() {
    $('.circle').removeClass('active')
    $('.second-circle').addClass('active')
})
$('.third-circle-icon').hover(function() {
    $('.circle').removeClass('active')
    $('.third-circle').addClass('active')
})
$('.fourth-circle-icon').hover(function() {
    $('.circle').removeClass('active')
    $('.fourth-circle').addClass('active')
})

// Confirm PopUp un görünməsi

$('.btn-payment').on('click',function(){
    $('#payment-popup').css('display','block');
})

$('.close').on('click',function(){
    $('#payment-popup').css('display','none');
})

$(window).on('click', function(event) {
    if ($('#payment-popup').is(event.target)) {
        $('#payment-popup').css('display', 'none');
    }
})