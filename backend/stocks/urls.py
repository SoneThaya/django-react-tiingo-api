from django.urls import path
from . import views


urlpatterns = [
    path('<str:tid>/<str:sDate>/<str:eDate>/', views.ticker, name="ticker"),
    path('crypto/<str:tid>/', views.cryptoTicker, name="crypto-ticker"),
]