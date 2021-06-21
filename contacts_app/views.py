from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from django.utils.translation import get_language
from django.db.models import F
from .models import *

@require_http_methods('POST')
def send_message_view(request):
    name = request.POST.get('name')
    phone = request.POST.get('phone')
    email = request.POST.get('email')
    message = request.POST.get('message')

    SentMessage.objects.create(name=name, phone=phone, email=email, message=message)

    email = EmailMessage(
        'Etinat.org - Пользователь: ' + name,
        f"""<h3>Имя: {name}</h3>
            <h3>Телефон: {phone}</h3>
            <h3>Email: {email}</h3>
            <h3>Сообщения:</h3>
            <p>{message}</p>""",
        'info@elshadaghazade.com',
        ['info@etinat.org'],
        reply_to=[email],
    )
    
    email.content_subtype = 'html'
    email.send()

    return JsonResponse({
        'status': 'OK'
    })

def contacts_view(request):
    lang = get_language()

    addresses = RequisitesAddress.objects.all().extra(select={'title': 'title_' + lang})
    phones = RequisitesPhone.objects.all().extra(select={'title': 'title_' + lang})
    emails = RequisitesEmail.objects.all().extra(select={'title': 'title_' + lang})
    banks = RequisitesBank.objects.all().extra(select={'title': 'title_' + lang})
    company_names = RequisitesCompanyName.objects.all().extra(select={'title': 'title_' + lang})
    iins = RequisitesINN_KPP.objects.all().extra(select={'title': 'title_' + lang})


    return render(request, 'contacts_view.html', context={
        'addresses': addresses,
        'phones': phones,
        'emails': emails,
        'banks': banks,
        'company_names': company_names,
        'iins': iins
    })