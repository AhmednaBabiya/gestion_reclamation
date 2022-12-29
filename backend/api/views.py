from email.policy import HTTP
from django.http import HttpResponse
import profile
import csv
import xlwt
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
import base64
import openpyxl
# from openpyxl.drawing.image import Image
import os
from PIL import Image


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
                    'date de creation', 'type', 'statut', 'date de traitement', 'screenshot'])
    reclamation_fields = reclamations.values_list(
        'customer_name', 'customer_phone_number', 'customer_nni_number', 'updated_by', 'created_at', 'type', 'status', 'treatment_date', 'screenshot')
    workbook = openpyxl.Workbook()
    worksheet = workbook.active
    for reclamation in reclamation_fields:
        # writer.writerow(reclamation)
        name, phone, nni, updated_by, created_at, r_type, status, treatment_date, screenshot = reclamation

    # Encode the screenshot field as base64
        if screenshot is not None:
            screenshot = bytes(screenshot, 'utf-8')
            screenshot = base64.b64encode(screenshot).decode('utf-8')
            # Decode the base64-encoded string to get the file name
            file_name = base64.b64decode(screenshot).decode('utf-8')
            # Open the file and add it as an image to the worksheet
            img = Image.open(file_name)
            # Add the image to the worksheet
            worksheet.add_image(openpyxl.drawing.image.Image(img))
        # Add a blank cell for the screenshot field
            screenshot = ''
        writer.writerow([name, phone, nni, updated_by, created_at,
                        r_type, status, treatment_date, screenshot])
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
                     'customer_phone_number', 'customer_name', 'created_at', 'status', 'type']


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
            copy['treatment_date'] = datetime.datetime.now()
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
