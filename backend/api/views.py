from email.policy import HTTP
import profile
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
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationSerializer
    permission_classes = [IsAuthenticated, IsAdminOrConsultant]
    pagination_class = ReclamationPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['customer_nni_number',
                     'customer_phone_number', 'customer_name', 'created_at']


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
        serializer = ReclamationSerializer(
            reclamation, data=request.data, partial=True, context={'request': request})
        if request.data['status'] == 'Traitée':
            request.data._mutable = True
            request.data['updated_by'] = f'{user.first_name} {user.last_name}'
        if request.data['status'] == 'Clôturée' and user.is_super_admin == False:
            return Response({"Error": "you don't have permission"}, status=status.HTTP_401_UNAUTHORIZED)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


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
