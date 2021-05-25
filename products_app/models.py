from django.db import models
from django.utils.translation import gettext_lazy as _

class Product(models.Model):
    name_ru = models.CharField(verbose_name=_('Имя продукта'), max_length=255)
    slug = models.SlugField(unique=True)
    description_ru = models.TextField(verbose_name=_('Описания продукта'))
    price_rub = models.DecimalField(verbose_name=_('Цена'), decimal_places=2, max_digits=7)
    product_image = models.ImageField(verbose_name=_('Фото'), upload_to='product_images')
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'{self.name_ru} {self.price_rub}rub'

    class Meta:
        verbose_name = _('Продукт')
        verbose_name_plural = _('Продукты')

class MinimalOrderText(models.Model):
    text_ru = models.TextField(verbose_name=_('Минимальный заказ'))

    def __str__(self):
        return self.text_ru

    class Meta:
        verbose_name = _('Минимальный заказ')
        verbose_name_plural = _('Минимальный заказ')
    

class DeliveryText(models.Model):
    text_ru = models.TextField(verbose_name=_('Доставка'))

    def __str__(self):
        return self.text_ru

    class Meta:
        verbose_name = _('Доставка')
        verbose_name_plural = _('Доставка')
    

class PaymentText(models.Model):
    text_ru = models.TextField(verbose_name=_('Оплата'))

    def __str__(self):
        return self.text_ru

    class Meta:
        verbose_name = _('Оплата')
        verbose_name_plural = _('Оплата')