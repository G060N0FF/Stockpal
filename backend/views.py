import yfinance as yf
from django.http import JsonResponse
from django.shortcuts import render


# rendering react router
def react(request):
    context = {}
    return render(request, 'index.html', context)


def stock_price(request):
    # Initializing parameters
    start = "2020-12-30"
    end = "2021-01-09"
    symbol = "AAPL"
    
    # Getting the data
    data = yf.download(symbol, start , end, interval='1h')

    # Changing data type
    data_json = []
    for i in range(len(data.index)):
        data_json.append({
            'Date': data.index[i],
            'Value': data['Open'][i]
        })

    return JsonResponse({
        'name': yf.Ticker(symbol).info['longName'],
        'min': min(data['Open']),
        'max': max(data['Open']),
        'data': data_json,
    })
