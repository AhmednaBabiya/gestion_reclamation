from django.contrib import admin
from backend.models import Profile, Reclamation
# Register your models here.


class ProfileAdmin(admin.ModelAdmin):
    search_fields = ['first_name', 'last_name', 'email']
    list_filter = ['is_consultant', 'is_super_admin', 'is_admin']


class ReclamationAdmin(admin.ModelAdmin):
    search_fields = ['customer_phone_number',
                     'customer_nni_number', 'customer_name']
    list_filter = ['type', 'status', 'created_at', 'treatment_date', 'created_by']


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Reclamation, ReclamationAdmin)
