from rest_framework import permissions

class AdminOrSelf(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        # if request.method in permissions.SAFE_METHODS:
        #     return True
        if request.user.is_admin:
            return True
        return (obj == request.user)
