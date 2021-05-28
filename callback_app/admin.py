from django.contrib import admin
from .models import *

class CallbackModelAdmin(admin.ModelAdmin):
    model = Callback
    list_display = 'name', 'phone', 'created_at'

# Register your models here.
admin.site.register(Callback, CallbackModelAdmin)