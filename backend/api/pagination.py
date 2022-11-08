from rest_framework.pagination import PageNumberPagination


class ReclamationPagination(PageNumberPagination):
    page_size_query_param = 'size'


class ProfilePagination(PageNumberPagination):
    page_size_query_param = 'size'
