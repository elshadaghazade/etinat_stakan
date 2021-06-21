from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.utils.translation import get_language
from django.core.mail import EmailMessage
import json
from .models import *

def products_view(request):
    lang = get_language()

    products = Product.objects.all().extra(select={'name': 'name_' + lang, 'description': 'description_' + lang})
    minimalOrderTexts = MinimalOrderText.objects.all().extra(select={'text': 'text_' + lang}).order_by('pk')
    deliveryTexts = DeliveryText.objects.all().extra(select={'text': 'text_' + lang}).order_by('pk')
    paymentTexts = PaymentText.objects.all().extra(select={'text': 'text_' + lang}).order_by('pk')

    return render(request, 'products_view.html', context={
        'products': products,
        'minimal_order_texts': minimalOrderTexts,
        'delivery_texts': deliveryTexts,
        'payment_texts': paymentTexts
    })

def checkout_view(request):
    return render(request, 'checkout_view.html')

@require_http_methods('POST')
def checkout_complete_view(request):
    name = request.POST.get('name')
    email = request.POST.get('email')
    phone = request.POST.get('phone')
    delivery_method = request.POST.get('delivery_method')
    address = request.POST.get('address')
    comment = request.POST.get('comment')
    products = request.POST.get('products')

    try:
        products = json.loads(products)
    except Exception as err:
        products = None

    bulk_create = []
    ordersTxt = ""
    if products:
        order = Order.objects.create(name=name, email=email, phone=phone, delivery_method=delivery_method, address=address, comment=comment)
        for product in products.values():
            qty = product.get('count')
            product = Product(pk=product.get('id'))
            bulk_create.append(OrderedProducts(product=product, qty=qty, order=order))
            ordersTxt += "<div>" + str(product) + " - " + str(qty) + " штук."
        OrderedProducts.objects.bulk_create(bulk_create)

    email = EmailMessage(
        'Etinat.org - Новый заказ',
        f"""<h3>Имя: {name}</h3>
            <h3>Телефон: {phone}</h3>
            <h3>Email: {email}</h3>
            <h3>Метод доставки: {Order.DELIVERY_CHOICES[int(delivery_method)]}</h3>
            <h3>Adres: {address}</h3>
            <p>{comment}</p>
            {ordersTxt}""",
        'info@elshadaghazade.com',
        ['info@etinat.org'],
        reply_to=[email],
    )
    
    email.content_subtype = 'html'
    email.send()
            


    return JsonResponse({
        'status': 'OK'
    })
