from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, serializers, viewsets

urlpatterns = [
    path('affiliate/', include('polls.urls')),
    path('admin/', admin.site.urls),
    path('recommend/', include('recommender.urls', namespace='recommend')),
]
