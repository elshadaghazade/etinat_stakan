from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class ProductsAppConfig(AppConfig):
    name = 'products_app'
    verbose_name = _('Раздел: Продукты')