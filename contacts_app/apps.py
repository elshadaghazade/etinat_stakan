from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class ContactsAppConfig(AppConfig):
    name = 'contacts_app'
    verbose_name = _('Раздел: Конакты')
