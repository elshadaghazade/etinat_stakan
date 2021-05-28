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

class OrderedProducts(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name=_('Товары'))
    qty = models.PositiveIntegerField(verbose_name=_('Количество'))
    order = models.ForeignKey('Order', verbose_name=_('Заказчик'), on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.product}, {self.qty}'

    class Meta:
        verbose_name = _('Заказанный товар')
        verbose_name_plural = _('Заказанные товары')



class Order(models.Model):
    CHOICE_SAMOVIVOZ = 1
    CHOICE_DOSTAVKA_PO_MOSKVE = 2
    CHOICE_DOSTAVKA_PO_MKAD = 3

    DELIVERY_CHOICES = {
        CHOICE_SAMOVIVOZ: 'Самовывоз',
        CHOICE_DOSTAVKA_PO_MOSKVE: 'Доставка по Москве - 300 руб.',
        CHOICE_DOSTAVKA_PO_MKAD: 'Доставка за МКАД - 300 руб. + 40 руб/км.'
    }

    name = models.CharField(max_length=1000, verbose_name=_('Имя'))
    email = models.CharField(max_length=255, verbose_name=_('Эл. почта'))
    phone = models.CharField(max_length=255, verbose_name=_('Телефон'))
    delivery_method = models.PositiveSmallIntegerField(verbose_name=_('Доставка'), choices=DELIVERY_CHOICES.items())
    address = models.CharField(max_length=2000, verbose_name=_('Адрес'))
    comment = models.TextField(verbose_name=_('Коментарий'))
    ordered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.name}, {self.email}, {self.phone}, {self.DELIVERY_CHOICES[self.delivery_method]}, {self.address}, {self.comment}, {self.ordered_at}'

    class Meta:
        verbose_name = _('Заказ')
        verbose_name_plural = _('Заказы')


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