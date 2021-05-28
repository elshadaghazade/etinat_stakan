from django.urls import path
from .views import *

urlpatterns = [
    path('', contacts_view, name='contacts'),
    path('send_message/', send_message_view, name='send_message')
]
