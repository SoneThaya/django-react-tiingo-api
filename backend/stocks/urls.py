from django.urls import path
from . import views


urlpatterns = [
    path('<str:tid>/', views.ticker, name="ticker"),
    path('crypto/<str:tid>/', views.cryptoTicker, name="crypto-ticker"),
]