$('.contact-popup').css('display', 'none');

$('.contact-close').on('click', function() {
    $('.contact-popup').css('display', 'none');
});


// Kontakt səhifəsindəki validation

$('#send-button').on('click', function() {
    var name = $('#name-input').val();
    var number = $('#number-input').val();
    var email = $('#email-input').val();
    var message = $('#message-textarea').val();
    if (
        name.trim() == '' ||
        number.trim() == '' ||
        email.trim() == '' ||
        message.trim() == ''
    ) {
        correctCase()
        check('#name-input', '.name-form')
        check('#number-input', '.number-form')
        check('#email-input', '.email-form')
        check('#message-textarea', '.message-form')
        $('<div class="warning-div"></div>').insertBefore('#send-button')
        $('.warning-div').append(
            `<p class="warning-p text-danger"><i class="me-2 fas fa-exclamation-triangle"></i>Пожалуйста, заполните все поля.</p>`
        )
    } else {
        correctCase();

        $.ajax({
            url: _APP_SETTINGS.paths.sendMessage,
            method: 'POST',
            data: $('#contact-form').serialize()
        }).done(result => {
            $('#name-input').val('');
            $('#number-input').val('');
            $('#email-input').val('');
            $('#message-textarea').val('');
            $('.contact-popup').css('display', 'block');
        }).catch(error => {
            $('#name-input').val('');
            $('#number-input').val('');
            $('#email-input').val('');
            $('#message-textarea').val('');
            $('.contact-popup').css('display', 'block');
        })
    }
})

// İnput-a hərf yazanda yoxlaması üçün
$('.common-input').keyup(function(e) {
    if ($(this).is('#name-input')) {
        check('#name-input', '.name-form')
    } else if ($(this).is('#number-input')) {
        check('#number-input', '.number-form')
    } else if ($(this).is('#email-input')) {
        check('#email-input', '.email-form')
    } else if ($(this).is('#message-textarea')) {
        check('#message-textarea', '.message-form')
    }
    if (
        $('#name-input').val().trim() != '' &&
        $('#number-input').val().trim() != '' &&
        $('#email-input').val().trim() != '' &&
        $('#message-textarea').val().trim() != ''
    ) {
        $('.warning-div').remove()
    }
})

// Verilmiş elementləri boş olub olmadığına görə yoxlayıb uyğun görünüş verir
function check(input, form) {
    var value = $(`${input}`).val()
    if (value.trim() == '') {
        $(`${form}`).css('border', '2px solid #f00')
        $(`${form} i`).css('color', '#f00')
    } else {
        $(`${form}`).css('border', '1px solid rgb(115, 171, 132)')
        $(`${form} i`).css('color', '#000')
    }
}

// Düzgün vəziyyət - yəni ki, hərşey normal hala qayıdır və xəbərdarlıq yox olur
function correctCase() {
    $('.form-element').css('border', '1px solid rgb(115, 171, 132)')
    $('.form-element i').css('color', '#000')
    $('.warning-div').remove()
}

// Ana səhifədəki validation
$('#send-button-hm').on('click', function() {

    var name = $('#name-input-hm').val()
    var email = $('#email-input-hm').val()
    var message = $('#message-textarea-hm').val()

    if (name.trim() == '' || email.trim() == '' || message.trim() == '') {
        correctCase_hm();
        check_hm('#name-input-hm');
        check_hm('#email-input-hm');
        check_hm('#message-textarea-hm');
        $('<div class="warning-div"></div>').insertBefore('#send-button-hm')
        $('.warning-div').append(
            `<p class="warning-p text-danger"><i class="me-2 fas fa-exclamation-triangle"></i>Пожалуйста, заполните все поля.</p>`
        )
    } else {
        correctCase_hm();

        $.ajax({
            url: _APP_SETTINGS.paths.sendMessage,
            method: 'POST',
            data: $('#contact-form').serialize()
        }).done(result => {
            $('#name-input-hm').val('')
            $('#email-input-hm').val('')
            $('#message-textarea-hm').val('');
            $('.home-contact-popup').css('display', 'block');
        }).catch(error => {
            $('#name-input-hm').val('')
            $('#email-input-hm').val('')
            $('#message-textarea-hm').val('');
            $('.home-contact-popup').css('display', 'block');
        })
    }
});

// Ana səhifədəki validation üçün inputları yoxlama funksiyası
function check_hm(input_element) {
    if ($(input_element).val().trim() == '') {
        $(input_element).css('border', '2px solid #f00');
    } else {
        $(input_element).css('border', '2px solid #306d34');
    }
}

// Ana səhifədəki validation üçün düzgün hal
function correctCase_hm() {
    $('#name-input-hm').css('border', '2px solid #306d34');
    $('#email-input-hm').css('border', '2px solid #306d34');
    $('#message-textarea-hm').css('border', '2px solid #306d34');
    $('.warning-div').remove();
}

// Ana səhifədəki validation üçün input daxil ediləndə yoxlanma
$('.common-input-hm').keyup(function(e) {
    if ($(this).is('#name-input-hm')) {
        check_hm('#name-input-hm');
    } else if ($(this).is('#email-input-hm')) {
        check_hm('#email-input-hm');
    } else if ($(this).is('#message-textarea-hm')) {
        check_hm('#message-textarea-hm');
    }
    if ($('#name-input-hm').val().trim() != '' && $('#email-input-hm').val().trim() != '' && $('#message-textarea-hm').val().trim() != '') {
        $('.warning-div').remove()
    }
})

// CallBack Validation

$('#callback-send-button').on('click', function() {

    if ($('#callback-name-input').val().trim() == '') {
        $('#callback-name-input').css('border', '2px solid #f00');
    } else {
        $('#callback-name-input').css('border', '2px solid rgb(45, 129, 70)');
    }

    if ($('#callback-number-input').val().trim() == '') {
        $('#callback-number-input').css('border', '2px solid #f00');
    } else {
        $('#callback-number-input').css('border', '2px solid rgb(45, 129, 70)');
    }

    if ($('#callback-name-input').val().trim() != '' && $('#callback-number-input').val().trim() != '') {
        var name = $('#callback-name-input').val();
        var number = $('#callback-number-input').val();

        $.ajax({
            url: _APP_SETTINGS.paths.callbackUri,
            data: $('#callback_form').serialize(),
            method: 'post'
        }).done(result => {
            $('.callback-popup-content').css('display', 'none');
            $('.callback-congrats-div').css('display', 'block');
            $('#callback-name-input').val('')
            $('#callback-number-input').val('');
        });
    }

});

$('.call-back-link').on('click', function() {
    $('.callback-popup-content').css('display', 'block');
    $('.callback-congrats-div').css('display', 'none');
})

$('.callback-input').keyup(function(e) {
    if ($(this).val().trim() == '') {
        $(this).css('border', '2px solid #f00');
    } else {
        $(this).css('border', '2px solid rgb(45, 129, 70)');
    }

});

// Confirm hissenin validation'u

function confirm_popup_check(element) {
    return $(element).val().trim() == '';
}

function confirm_correctCase() {
    $('.payment--input').css('border', '2px solid rgb(115, 171, 132)');
}

$('#confirm-button').on('click', function() {
    if (confirm_popup_check('#payment-name-input') || confirm_popup_check('#payment-mail-input') || confirm_popup_check('#payment-phone-input') || $('#payment-delivery-selection').val() == 0 || confirm_popup_check('#payment-adress-input') || confirm_popup_check('#payment-comment-input')) {
        confirm_correctCase();
        if (confirm_popup_check('#payment-name-input')) {
            $('#payment-name-input').css('border', '2px solid #f00')
        }
        if (confirm_popup_check('#payment-mail-input')) {
            $('#payment-mail-input').css('border', '2px solid #f00')
        }
        if (confirm_popup_check('#payment-phone-input')) {
            $('#payment-phone-input').css('border', '2px solid #f00')
        }
        if ($('#payment-delivery-selection').val() == 0) {
            $('#payment-delivery-selection').css('border', '2px solid #f00')
        }
        if (confirm_popup_check('#payment-adress-input')) {
            $('#payment-adress-input').css('border', '2px solid #f00')
        }
        if (confirm_popup_check('#payment-comment-input')) {
            $('#payment-comment-input').css('border', '2px solid #f00')
        }
    } else {
        confirm_correctCase();
        var data = $('#checkout-form').serialize();
        var items = encodeURIComponent(JSON.stringify(getItemsFromCart()));

        $.ajax({
            url: _APP_SETTINGS.paths.checkoutUri,
            data: data + '&products=' + items,
            method: 'POST',
        }).done(result => {
            $('.payment-popup-content').css('display', 'none');
            $('.congrats-div').css('display', 'block');
        });
    }
});

$('#payment-delivery-selection').on('click', function() {
    if ($('#payment-delivery-selection').val() == 0) {
        $('#payment-delivery-selection').css('border', '2px solid #f00')
    } else {
        $('#payment-delivery-selection').css('border', '2px solid rgb(115, 171, 132');
    }
})

$('.payment--input').keyup(function(e) {
    if ($(this).val().trim() == '') {
        $(this).css('border', '2px solid #f00');
    } else {
        $(this).css('border', '2px solid rgb(115, 171, 132)');
    }

});