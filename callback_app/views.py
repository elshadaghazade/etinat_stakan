from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import *

@require_http_methods('POST')
def callback_view(request):
    name = request.POST.get('name')
    phone = request.POST.get('phone')

    Callback.objects.create(name=name, phone=phone)
    
    return JsonResponse({
        'status': 'OK'
    })
