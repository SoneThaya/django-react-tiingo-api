from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .tiingo import get_crypto_meta_data, get_historical_price_data, get_meta_data, get_price_data

def getRoutes(request):
    return JsonResponse('Hello', safe=False)


@api_view(['GET'])
def ticker(request, tid, sDate, eDate):
    context = {}
    context['ticker'] = tid
    context['meta'] = get_meta_data(tid)
    context['price'] = get_price_data(tid)
    context['history'] = get_historical_price_data(tid, sDate, eDate)
    return Response(context)


@api_view(['GET'])
def cryptoTicker(request, tid):
    context = {}
    context['ticker'] = get_crypto_meta_data(tid)
    return Response(context)