from django.urls import path
from backend.api import views
from backend.api.views import *

urlpatterns = [
    path('profile-list/', ProfileList.as_view(), name='profile-list'),
    path('profile/<int:pk>', ProfileDetails.as_view(), name='profile-details'),
    path('reclamation-list/', ReclamationList.as_view(), name='reclamation-list'),
    path('reclamation-create/', ReclamationCreate.as_view(),
         name='reclamation-create'),
    path('reclamation/<int:pk>', ReclamationDetails.as_view(),
         name='reclamation-details'),
    path('reclamation/<int:pk>/update-delete', ReclamationUpdateDetails.as_view(),
         name='update or delete reclamation-details'),
    path('profile/me/', views.current_profile_view,
         name="retrieve current profile infos"),
    path('export-to-csv', views.export_to_csv, name="export-to-csv"),
]
