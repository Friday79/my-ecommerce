from django.http import JsonResponse


def home(request):
    Data = {
        'message': 'Welcome to the E-commerce Store'
    }
    return JsonResponse(Data)