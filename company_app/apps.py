from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class CompanyAppConfig(AppConfig):
    name = 'company_app'
    verbose_name = _('Раздел: Фирма')
