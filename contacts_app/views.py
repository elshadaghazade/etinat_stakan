from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import *

@require_http_methods('POST')
def send_message_view(request):
    name = request.POST.get('name')
    phone = request.POST.get('phone')
    email = request.POST.get('email')
    message = request.POST.get('message')

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