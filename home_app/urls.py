from django.urls import path
from .views import *

urlpatterns = [
    path('', home_view, name='homepage'),
    path('zohoverify/verifyforzoho.html', verify_zoho_view, name='verifyzoho')
]
