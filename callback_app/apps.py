from django.apps import AppConfig
from django.utils.translation import gettext_lazy  as _


class CallbackAppConfig(AppConfig):
    name = 'callback_app'
    verbose_name = _('Раздел: Обратный звонок')
