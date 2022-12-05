from rest_framework import permissions


class IsAdminOrConsultant(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(request.user.is_consultant or request.user.is_admin)
