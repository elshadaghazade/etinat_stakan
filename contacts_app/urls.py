from django.urls import path
from .views import *

urlpatterns = [
    path('', contacts_view, name='contacts')
]
