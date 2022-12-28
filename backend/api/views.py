from email.policy import HTTP
from django.http import HttpResponse
import profile
import csv
import datetime
from rest_framework import status, generics, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import filters
from backend.api.permissions import IsAdminOrConsultant
from backend.models import Profile, Reclamation
from backend.api.serializers import ProfileSerializer, ReclamationSerializer, ReclamationCreateSerializer
# from django_filters.rest_framework import DjangoFilterBackend
from backend.api.pagination import ReclamationPagination, ProfilePagination


@api_view(['POST'])
def export_to_csv(request):
    begin_date = request.data['begin_date']
    end_date = request.data['end_date']
    reclamations = Reclamation.objects.filter(
        created_at__range=[begin_date, end_date])
    response = HttpResponse()
    date = datetime.datetime.now()
    date = date.strftime('%d-%m-%Y_%H:%M')
    response['Content-Disposition'] = f'attachment; filename=reclamation_export {date}.csv'
    writer = csv.writer(response)
    writer.writerow(['Nom complet', 'Telephone', 'NNI', 'Traitee par',
                    'date de creation', 'date du derniere modification', 'type', 'statut'])
    reclamation_fields = reclamations.values_list(
        'customer_name', 'customer_phone_number', 'customer_nni_number', 'updated_by', 'created_at', 'last_update', 'type', 'status')
    for reclamation in reclamation_fields:
        # print(reclamation[5])
        writer.writerow(reclamation)
    # def dehydrate_created_at(self, obj):
    #     return obj.created_at.strftime('%d-%m-%Y %H:%M:%S')
    return response


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ProfilePagination


class ProfileDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser]


class ReclamationList(generics.ListAPIView):
    queryset = Reclamation.objects.filter().order_by("-id")
    serializer_class = ReclamationSerializer
    # permission_classes = [IsAuthenticated, IsAdminOrConsultant]
    pagination_class = ReclamationPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['customer_nni_number',
                     'customer_phone_number', 'customer_name', 'created_at', 'status']


class ReclamationCreate(generics.CreateAPIView):
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationCreateSerializer


class ReclamationDetails(generics.RetrieveAPIView):
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationSerializer


class ReclamationUpdateDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationSerializer
    permission_classes = [IsAdminUser]

    def update(self, request, pk):
        user = request.user
        reclamation = self.get_object()
        copy = request.data.copy()
        if copy['status'] == 'Traitée':
            copy['updated_by'] = f'{user.first_name} {user.last_name}'
        serializer = ReclamationSerializer(
            reclamation, data=copy, partial=True, context={'request': request})
        if request.data['status'] == 'Clôturée' and user.is_super_admin == False:
            return Response({"Error": "you don't have permission"}, status=status.HTTP_401_UNAUTHORIZED)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


@ api_view(['GET', 'PUT'])
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
