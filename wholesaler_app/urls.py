from django.urls import path
from .views import *

urlpatterns = [
    path('', wholesaler_view, name='wholesalers')
]
