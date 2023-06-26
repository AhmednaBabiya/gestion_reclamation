from email.policy import HTTP
from django.http import HttpResponse
import profile
import csv
import xlwt
import codecs
import datetime
from rest_framework import status, generics, mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import filters
from backend.api.permissions import IsAdminOrConsultant
from backend.models import Profile, Reclamation
from backend.api.serializers import ProfileSerializer, ReclamationSerializer, ReclamationCreateSerializer
# from django_filters.rest_framework import DjangoFilterBackend
from backend.api.pagination import ReclamationPagination, ProfilePagination


# @api_view(['POST'])
# def export_to_csv(request):
#     begin_date = request.data['begin_date']
#     end_date = request.data['end_date']
#     reclamations = Reclamation.objects.filter(
#         created_at__range=[begin_date, end_date]).order_by('created_at')
#     response = HttpResponse(content_type='text/csv; charset=utf-8')
#     date = datetime.datetime.now()
#     date = date.strftime('%d-%m-%Y_%H:%M')
#     response['Content-Disposition'] = f'attachment; filename=reclamation_export {date}.csv'
#     # Use the codecs module to open the response object in write mode with UTF-8 encoding
#     csv_file = codecs.getwriter('utf-8')(response)
#     writer = csv.writer(csv_file)
#     writer.writerow(['Nom complet', 'Telephone', 'NNI', "créer par", 'date de creation', 'Traitee par', 'date de traitement',
#                     'type', 'statut', "lien carte d'identite", 'lien photo', "lien capture d'ecran", "commentaire", "date du commentaire"])
#     reclamation_fields = reclamations.values_list(
#         'customer_name', 'customer_phone_number', 'customer_nni_number', 'created_by', 'created_at', 'updated_by', 'treatment_date',
#         'type', 'status', 'identity_card', 'photo', 'screenshot', 'commentary', 'error_date')
#     for reclamation in reclamation_fields:
#         created_at_formatted = reclamation[4].strftime('%d-%m-%Y %H:%M:%S')
#         treatment_date = reclamation[6]
#         error_date = reclamation[13]
#         if treatment_date is not None:
#             print("Treatment date exists:", treatment_date)
#             treatment_date_formatted = treatment_date.strftime(
#                 '%d-%m-%Y %H:%M:%S')
#             print("Treatment date formatted:", treatment_date_formatted)
#         if error_date is not None:
#             error_date_formatted = error_date.strftime(
#                 '%d-%m-%Y %H:%M:%S')
#         else:
#             print("Treatment date is None")
#             treatment_date_formatted = ''
#             error_date_formatted = ''
#         modified_reclamation = [
#             reclamation[0],
#             reclamation[1],
#             reclamation[2],
#             reclamation[3],
#             created_at_formatted,
#             reclamation[5],
#             treatment_date_formatted,
#             reclamation[7],
#             reclamation[8],
#             reclamation[9],
#             reclamation[10],
#             reclamation[11],
#             reclamation[12],
#             error_date_formatted
#         ]
#         writer.writerow(modified_reclamation)
#     return response

@api_view(['POST'])
# @permission_classes([IsAdminOrConsultant])
def export_to_csv(request):
    begin_date = request.data['begin_date']
    end_date = request.data['end_date']
    reclamations = Reclamation.objects.filter(
        created_at__range=[begin_date, end_date]).order_by('created_at')
    response = HttpResponse(content_type='text/csv; charset=utf-8')
    date = datetime.datetime.now().strftime('%d-%m-%Y_%H:%M')
    response['Content-Disposition'] = f'attachment; filename=reclamation_export {date}.csv'

    # Use the codecs module to open the response object in write mode with UTF-8 encoding
    csv_file = codecs.getwriter('utf-8')(response)
    writer = csv.writer(csv_file)
    writer.writerow(['Nom complet', 'Telephone', 'NNI', "créer par", 'date de creation', 'Traitee par', 'date de traitement',
                     'type', 'statut', "lien carte d'identite", 'lien photo', "lien capture d'ecran", "commentaire", "date du commentaire"])

    for reclamation in reclamations:
        created_at_formatted = reclamation.created_at.strftime('%d-%m-%Y %H:%M:%S')
        treatment_date_formatted = reclamation.treatment_date.strftime('%d-%m-%Y %H:%M:%S') if reclamation.treatment_date else ''
        error_date_formatted = reclamation.error_date.strftime('%d-%m-%Y %H:%M:%S') if reclamation.error_date else ''
        
        modified_reclamation = [
            reclamation.customer_name,
            reclamation.customer_phone_number,
            reclamation.customer_nni_number,
            reclamation.created_by,
            created_at_formatted,
            reclamation.updated_by,
            treatment_date_formatted,
            reclamation.type,
            reclamation.status,
            reclamation.identity_card.url if reclamation.identity_card else '',
            reclamation.photo.url if reclamation.photo else '',
            reclamation.screenshot.url if reclamation.screenshot else '',
            reclamation.commentary,
            error_date_formatted
        ]
        writer.writerow(modified_reclamation)

    return response


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminOrConsultant]
    pagination_class = ProfilePagination


class ProfileDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminOrConsultant]


class ReclamationList(generics.ListAPIView):
    queryset = Reclamation.objects.filter().order_by("-id")
    serializer_class = ReclamationSerializer
    permission_classes = [IsAdminOrConsultant]
    pagination_class = ReclamationPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['customer_nni_number',
                     'customer_phone_number', 'customer_name', 'created_at', 'status', 'type', 'created_by']


class ReclamationCreate(generics.CreateAPIView):
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationCreateSerializer

    def create(self, request):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        customer_nni_number = serializer.validated_data.get(
            'customer_nni_number')
        # Check if there is already an existing reclamation with the same phone number
        existing_reclamation = Reclamation.objects.filter(
            customer_nni_number=customer_nni_number)
        # Check if the status is 'Clôturée'
        for reclamation in existing_reclamation:
            if reclamation.status != 'Clôturée':
                return Response({'status': 'error', 'message': 'A reclamation with the same phone number already exists and is not yet closed'},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            if user.is_authenticated:
                serializer.validated_data['created_by'] = f'{user.first_name} {user.last_name}'
            else:
                serializer.validated_data['created_by'] = 'Client'
            serializer.save()
            return Response(serializer.data)


class ReclamationDetails(generics.RetrieveAPIView):
    queryset = Reclamation.objects.all()
    permission_classes = [IsAdminOrConsultant]
    serializer_class = ReclamationSerializer


class ReclamationUpdateDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationSerializer
    permission_classes = [IsAdminOrConsultant]

    def update(self, request, pk):
        user = request.user
        reclamation = self.get_object()
        copy = request.data.copy()
        if copy['status'] == 'Traitée':
            copy['updated_by'] = f'{user.first_name} {user.last_name}'
            copy['treatment_date'] = datetime.datetime.now()
        if copy['status'] == 'Données erronées':
            copy['error_date'] = datetime.datetime.now()
        if copy['status'] == 'Clôturée':
            if reclamation.status != 'Traitée':
                return Response({"Error": "Status must be 'Traitée' before changing to 'Clôturée'"}, status=status.HTTP_400_BAD_REQUEST)
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
