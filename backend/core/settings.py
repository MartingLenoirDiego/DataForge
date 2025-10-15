import os
from datetime import timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'change-this-secret-in-prod'

DEBUG = True
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Packages externes
    'rest_framework',
    'rest_framework_simplejwt',

    # Apps internes
    'users',
    'datasets',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
]

ROOT_URLCONF = 'core.urls'
WSGI_APPLICATION = 'core.wsgi.application'

# 📦 Base de données
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'dataflow_db',
        'USER': 'dataflow_user',
        'PASSWORD': 'dataflow_pass',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# 📂 Fichiers uploadés
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ⚙️ REST Framework + JWT
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}

# ⚡ Celery
CELERY_BROKER_URL = 'redis://localhost:6379/0'

AUTH_USER_MODEL = 'users.User'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # dossier pour tes templates custom
        'APP_DIRS': True,                   # permet de trouver templates dans chaque app
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

# URL de base pour servir les fichiers statiques
STATIC_URL = '/static/'

# Optionnel : dossier pour collecter les fichiers statiques (utile en prod)
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Optionnel : dossiers supplémentaires contenant des fichiers statiques
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

