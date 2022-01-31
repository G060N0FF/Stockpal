"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    # auth paths
    path('api/auth/login/', views.login_view, name='login'),
    path('api/auth/', include('rest_framework.urls')),

    # frontend paths
    path('', views.react),
    path('browse/', views.react),

    # backend paths
    path('api/', include(router.urls)),
    path('api/stock/<path:symbol>/name/', views.stock_name, name='stock_name'),
    path('api/stock/<path:symbol>/', views.stock, name='stock'),
]
