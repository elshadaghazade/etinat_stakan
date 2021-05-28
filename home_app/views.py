from django.shortcuts import render

def home_view(request):
    return render(request, 'home_view.html')

def verify_zoho_view(request):
    return render(request, 'verifyforzoho.html')
