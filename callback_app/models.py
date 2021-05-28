from django.db import models
from django.utils.translation import gettext_lazy as _

class Callback(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Имя'))
    phone = models.CharField(max_length=255, verbose_name=_('Телефон'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Время обращения'))

    def __str__(self):
        return f'{self.name}, {self.phone}, {self.created_at}'
