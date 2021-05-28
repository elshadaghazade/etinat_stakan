from django.db import models
from django.utils.translation import gettext_lazy as _

class SentMessage(models.Model):
    name = models.CharField(max_length=255, verbose_name=_('Имя'))
    phone = models.CharField(max_length=255, verbose_name=_('Телефон'))
    email = models.CharField(max_length=255, verbose_name=_('Email'))
    message = models.TextField(verbose_name=_('Сообщения'))
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name}, {self.phone}, {self.email}, {self.message}, {self.sent_at}'

    class Meta:
        verbose_name = _('Сообщения')
        verbose_name_plural = _('Сообщении')
        ordering = '-sent_at',


class RequisitesPhone(models.Model):
    title = models.CharField(max_length=255, verbose_name=_('Телефон'))

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Телефон')
        verbose_name_plural = _('Телефоны')
        ordering = '-pk',


class RequisitesEmail(models.Model):
    title = models.CharField(max_length=255, verbose_name=_('Электронная почта'))

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Электронная почта')
        verbose_name_plural = _('Электронные почты')
        ordering = '-pk',


class RequisitesAddress(models.Model):
    title = models.CharField(max_length=255, verbose_name=_('Адрес'))

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Адрес')
        verbose_name_plural = _('Адреса')
        ordering = '-pk',


class RequisitesCompanyName(models.Model):
    title = models.CharField(max_length=255, verbose_name=_('Наименование организации'))

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Наименование организации')
        verbose_name_plural = _('Наименование организации')
        ordering = '-pk',


class RequisitesBank(models.Model):
    title = models.CharField(max_length=255, verbose_name=_('Банковские реквизиты'))

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Банковские реквизиты')
        verbose_name_plural = _('Банковские реквизиты')
        ordering = '-pk',


class RequisitesINN_KPP(models.Model):
    title = models.CharField(max_length=255, verbose_name=_('ИНН / КПП'))

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('ИНН / КПП')
        verbose_name_plural = _('ИНН / КПП')
        ordering = '-pk',

