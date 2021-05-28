"""
Django settings for etinat project.

Generated by 'django-admin startproject' using Django 2.2.23.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
from posixpath import basename
from urllib.parse import urlparse

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '^i0@6a8gfyku&n(5&8%+bd7chmf$2+qokgb1a@$z-r+j@0js(m'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = [
    '*'
]

# if not DEBUG:
#     SECURE_HSTS_SECONDS=True
#     SECURE_CONTENT_TYPE_NOSNIFF=True
#     SECURE_BROWSER_XSS_FILTER=True
#     SECURE_SSL_REDIRECT=True
#     SESSION_COOKIE_SECURE=True
#     CSRF_COOKIE_SECURE=True
#     SECURE_HSTS_INCLUDE_SUBDOMAINS=True
#     SECURE_HSTS_PRELOAD=True
#     X_FRAME_OPTIONS='SAMEORIGIN'


# Application definition

INSTALLED_APPS = [
    'jet',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'company_app',
    'contacts_app',
    'home_app',
    'products_app',
    'wholesaler_app',
    'ckeditor'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

ROOT_URLCONF = 'etinat.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            'templates'
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'etinat.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

if not DEBUG:
    DATABASE_URL = os.getenv('DATABASE_URL', 'postgres://gphvmvpulvbaoc:2b2c25c205ddcca9d961f926080def97b332975c23c3c7c979fdffb0debbd66b@localhost:5432/d1tprufjurqgu8')
else:
    DATABASE_URL = os.getenv('DATABASE_URL', 'postgres://gphvmvpulvbaoc:2b2c25c205ddcca9d961f926080def97b332975c23c3c7c979fdffb0debbd66b@localhost:5432/d1tprufjurqgu8')

DATABASE_URL = urlparse(DATABASE_URL)


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': DATABASE_URL.path[1:],
        'USER': DATABASE_URL.username,
        'PASSWORD': DATABASE_URL.password,
        'HOST': DATABASE_URL.hostname,
        'PORT': DATABASE_URL.port,
        'CONN_MAX_AGE': 600,
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/assets/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'assets')
]
STATIC_ROOT = os.path.join(BASE_DIR, 'collectedassets')


MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/files/'

CKEDITOR_UPLOAD_PATH = "media/content"
