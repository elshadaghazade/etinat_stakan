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

class OrderedProductsInline(admin.TabularInline):
    model = OrderedProducts
    extra = 0

class OrderModelAdmin(admin.ModelAdmin):
    model = Order
    inlines = OrderedProductsInline,
    list_display = 'name', 'email', 'phone', 'delivery_method', 'address', 'comment'

admin.site.register(Product, ProductModelAdmin)
admin.site.register(MinimalOrderText, MinimalOrderTextModelAdmin)
admin.site.register(DeliveryText, DeliveryTextModelAdmin)
admin.site.register(PaymentText, PaymentTextModelAdmin)
admin.site.register(Order, OrderModelAdmin)
