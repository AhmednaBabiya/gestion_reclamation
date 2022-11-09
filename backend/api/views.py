from email.policy import HTTP
import profile
from rest_framework import status, generics, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import filters
from backend.api.permissions import AdminOrSelf
from backend.models import Profile, Reclamation
from backend.api.serializers import ProfileSerializer, ReclamationSerializer, ReclamationCreateSerializer
# from django_filters.rest_framework import DjangoFilterBackend
from backend.api.pagination import ReclamationPagination, ProfilePagination


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ProfilePagination


class ProfileDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AdminOrSelf]


class ReclamationList(generics.ListAPIView):
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationSerializer
    # permission_classes = [IsAuthenticated]
    pagination_class = ReclamationPagination
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['created_at','customer_name']
    filter_backends = [filters.SearchFilter]
    search_fields = ['customer_nni_number',
                     'customer_phone_number', 'customer_name', 'created_at']


class ReclamationCreate(generics.CreateAPIView):
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationCreateSerializer


class ReclamationDetails(generics.RetrieveAPIView):
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationSerializer
    # permission_classes = [IsAuthenticated]


class ReclamationUpdateDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationSerializer
    permission_classes = [IsAdminUser]


@api_view(['GET', 'PUT'])
def current_profile_view(request):
    if request.method == 'GET':
        try:
            user = request.user
            return Response(ProfileSerializer(user).data)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    if request.method == 'PUT':
        user = request.user
        profile = Profile.objects.get(pk=user.id)
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


# class ProfileListAV(APIView):
#     def get(self, request):
#         profiles = Profile.objects.all()
#         serializer = ProfileSerializer(profiles,many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = ProfileSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)

# class ProfileDetailsAV(APIView):
#     def get(self, request, pk):
#         try:
#             profile = Profile.objects.get(pk=pk)
#         except Profile.DoesNotExist:
#             return Response({'Error' : 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
#         serializer = ProfileSerializer(profile)
#         return Response(serializer.data)

#     def put(self, request, pk):
#         profile = Profile.objects.get(pk=pk)
#         serializer = ProfileSerializer(profile, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)

#     def delete(self, request, pk):
#         profile = Profile.objects.get(pk=pk)
#         profile.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(['GET', 'POST'])
# def profile_list(request):
#     if request.method == 'GET':
#         profiles = Profile.objects.all()
#         serializer = ProfileSerializer(profiles,many=True)
#         return Response(serializer.data)

#     if request.method == 'POST':
#         serializer = ProfileSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)

# @api_view(['GET', 'PUT','DELETE'])
# def profile_details(request, pk):
#     if request.method == 'GET':
#         try:
#             profile = Profile.objects.get(pk=pk)
#         except Profile.DoesNotExist:
#             return Response({'Error' : 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
#         serializer = ProfileSerializer(profile)
#         return Response(serializer.data)

#     if request.method == 'PUT':
#         profile = Profile.objects.get(pk=pk)
#         serializer = ProfileSerializer(profile, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)

#     if request.method == 'DELETE':
#         profile = Profile.objects.get(pk=pk)
#         profile.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# @api_view()
# def reclamation_list(request):
#     reclamations = Reclamation.objects.all()
#     serializer = ReclamationSerializer(reclamations,many=True)
#     return Response(serializer.data)

# @api_view()
# def reclamation_details(request, pk):
#     reclamation = Reclamation.objects.get(pk=pk)
#     serializer = ReclamationSerializer(reclamation)
#     return Response(serializer.data)
