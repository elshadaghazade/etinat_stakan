from django.shortcuts import render
from .models import *

def products_view(request):
    products = Product.objects.all()
    minimalOrderTexts = MinimalOrderText.objects.all().order_by('pk')
    deliveryTexts = DeliveryText.objects.all().order_by('pk')
    paymentTexts = PaymentText.objects.all().order_by('pk')

    return render(request, 'products_view.html', context={
        'products': products,
        'minimal_order_texts': minimalOrderTexts,
        'delivery_texts': deliveryTexts,
        'payment_texts': paymentTexts
    })

def checkout_view(request):
    return render(request, 'checkout_view.html')
