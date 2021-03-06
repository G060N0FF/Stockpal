import yfinance as yf
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
import json
from rest_framework.decorators import api_view

from backend.serializers import UserSerializer


# rendering react router
def react(request):
    context = {}
    return render(request, 'index.html', context)


def stock(request, symbol, period='1mo'):
    stock = yf.Ticker(symbol)
    data = stock.history(period, interval='1h')

    # dictionary to change month format
    months = {
        '01': 'Jan.',
        '02': 'Feb.',
        '03': 'Mar.',
        '04': 'Apr.',
        '05': 'May.',
        '06': 'Jun.',
        '07': 'Jul.',
        '08': 'Aug.',
        '09': 'Sep.',
        '10': 'Oct.',
        '11': 'Nov.',
        '12': 'Dec.',
    }

    # changing data type
    data_json = []
    for i in range(len(data.index)):
        data_json.append({
            'Date': months[str(data.index[i])[5:7]] + str(data.index[i])[8:10] + ' ' + str(data.index[i])[:4],
            'Value': round(data['Open'][i], 2)
        })
    
    try:
        response = {
            'name': symbol,
            'min': min(data['Open']),
            'max': max(data['Open']),
            'data': data_json,
            'data_found': True,
        }
    except Exception:
        response = {
            'name': symbol,
            'min': 0,
            'max': 100,
            'data': [],
            'data_found': False,
        }

    return JsonResponse(response)


def stock_name(request, symbol):
    stock = yf.Ticker(symbol)
    
    try:
        response = {
            'name': stock.info['longName'],
        }
    except:
        response = {
            'name': symbol,
        }

    return JsonResponse(response)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        response = {'message': 'List function is not offered in this path'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def retrieve(self, request):
        response = {'message': 'Retrieve function is not offered in this path'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def update(self, request):
        response = {'message': 'Update function is not offered in this path'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def partial_update(self, request):
        response = {'message': 'Partial update function is not offered in this path'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if not request.user or request.user.pk != instance.pk:
            response = {'message': 'You are not allowed to delete this user'}
            return Response(response, status=status.HTTP_403_FORBIDDEN)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def login_view(request):
    if request.method != 'POST':
        response = {'message': 'Non-POST requests are not offered in this path'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    user = authenticate(username=body['username'], password=body['password'])
    login(request, user)

    response = {'message': "Login successful"}
    return Response(response)
