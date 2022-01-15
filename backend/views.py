import yfinance as yf
from django.http import JsonResponse
from django.shortcuts import render


# rendering react router
def react(request):
    context = {}
    return render(request, 'index.html', context)


def stock_price(request):
    # initializing parameters
    start = "2020-12-30"
    end = "2021-01-09"
    symbol = "AAPL"
    
    # getting the data
    data = yf.download(symbol, start , end, interval='1h')

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

    return JsonResponse({
        'name': yf.Ticker(symbol).info['longName'],
        'min': min(data['Open']),
        'max': max(data['Open']),
        'data': data_json,
    })
