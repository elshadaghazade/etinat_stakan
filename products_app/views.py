from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
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

@require_http_methods('POST')
def checkout_complete_view(request):
    return JsonResponse({
        'status': 'OK'
    })
