from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.mail import EmailMessage
from .models import *

@require_http_methods('POST')
def callback_view(request):
    name = request.POST.get('name')
    phone = request.POST.get('phone')

    Callback.objects.create(name=name, phone=phone)

    email = EmailMessage(
        'Срочно! просят обратный звонок: ' + phone,
        f"""<h3>Имя: {name}</h3>
            <h3>Телефон: {phone}</h3>
            <h3>Пользовател просит чтоб связались с ним</h3>""",
        'info@elshadaghazade.com',
        ['info@etinat.org'],
    )
    
    email.content_subtype = 'html'
    email.send()
    
    return JsonResponse({
        'status': 'OK'
    })
