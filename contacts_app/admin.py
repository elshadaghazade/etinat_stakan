from django.contrib import admin
from .models import *

class SentMessageModelAdmin(admin.ModelAdmin):
    model = SentMessage
    list_display = 'name', 'phone', 'email', 'message', 'sent_at'

admin.site.register(SentMessage, SentMessageModelAdmin)
admin.site.register([RequisitesPhone, RequisitesEmail, RequisitesAddress, RequisitesCompanyName, RequisitesBank, RequisitesINN_KPP])