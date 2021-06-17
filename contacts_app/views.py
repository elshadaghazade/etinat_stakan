from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.core.mail import EmailMessage
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
    addresses = RequisitesAddress.objects.all()
    phones = RequisitesPhone.objects.all()
    emails = RequisitesEmail.objects.all()
    banks = RequisitesBank.objects.all()
    company_names = RequisitesCompanyName.objects.all()
    iins = RequisitesINN_KPP.objects.all()


    return render(request, 'contacts_view.html', context={
        'addresses': addresses,
        'phones': phones,
        'emails': emails,
        'banks': banks,
        'company_names': company_names,
        'iins': iins
    })