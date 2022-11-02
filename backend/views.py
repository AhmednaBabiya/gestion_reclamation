# from django.shortcuts import render
# from django.http import JsonResponse

# from backend.models import Profile,Reclamation

# # Create your views here.

# def user_list(request):
#     users = Profile.objects.all()
#     data = {'users': list(users.values())}
#     return JsonResponse(data)

# def user_details(request, pk):
#     user = Profile.objects.get(pk=pk)
#     data = {'name': user.name,
#             'phone number': user.phone_number,
#             'nni': user.nni_number}
#     return JsonResponse(data)
    
    