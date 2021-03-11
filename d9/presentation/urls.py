"""d9 PRESENTATION URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path,include
from . import views
urlpatterns = [
    path('',views.home,name='home'),
    path('growers/',views.growers,name="Growers"),
    path('engineering/',views.engineering,name="Engineering"),
    path('technology/',views.technology,name="Technology"),
    path('page/thermals/',views.page_thermals,name="page_thermals"),
    path('page/spectrum/',views.page_spectrum,name="page_spectrum"),
    path('black',views.black,name="black")
]
