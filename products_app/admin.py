from django.contrib import admin
from .models import *

class ProductModelAdmin(admin.ModelAdmin):
    model = Product
    prepopulated_fields = {"slug": ("name_ru",)}


class MinimalOrderTextModelAdmin(admin.ModelAdmin):
    model = MinimalOrderText

class DeliveryTextModelAdmin(admin.ModelAdmin):
    model = DeliveryText

class PaymentTextModelAdmin(admin.ModelAdmin):
    model = PaymentText

admin.site.register(Product, ProductModelAdmin)
admin.site.register(MinimalOrderText, MinimalOrderTextModelAdmin)
admin.site.register(DeliveryText, DeliveryTextModelAdmin)
admin.site.register(PaymentText, PaymentTextModelAdmin)
