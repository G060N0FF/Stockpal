import yfinance as yf
from django.http import JsonResponse
from django.shortcuts import render


# rendering react router
def react(request):
    context = {}
    return render(request, 'index.html', context)


def stock(request, symbol):
    stock = yf.Ticker(symbol)
    data = stock.history(period='1mo', interval='1h')

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
