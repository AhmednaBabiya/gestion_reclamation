from random import choices
from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)
from django.utils import timezone

# Create your models here.


class UserManager(BaseUserManager):

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        user = self.model(
            email=email,
            **extra_fields
        )
        user.set_password(password)
        user.is_active = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class Profile(AbstractBaseUser):
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    is_super_admin = models.BooleanField(default=False)
    is_consultant = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'

    @property
    def is_superuser(self):
        return self.is_admin

    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin
    objects = UserManager()

    def __str__(self):
        return self.email


class Reclamation(models.Model):
    customer_name = models.CharField(max_length=255, null=True)
    customer_phone_number = models.BigIntegerField(null=True)
    customer_nni_number = models.CharField(max_length=255, null=True)
    identity_card = models.FileField(null=True)
    photo = models.FileField(null=True)
    screenshot = models.FileField(null=True)
    description = models.TextField(null=True)
    updated_by = models.CharField(max_length=255, null=True)
    created_by = models.CharField(max_length=255, null=True)
    TYPE_ACTIVATION = 'Activation'
    TYPE_PHONE = 'Changement de téléphone'
    TYPE_UNBLOCK = 'Déblocage'
    TYPE_PASSWORD = 'Changement de mot de passe'
    TYPE_Transfers = 'Virements'
    TYPE_GAB = 'Retrait Gab'
    TYPE_EXTRACT = 'Extrait de compte'
    TYPE_OTHERS = 'Autres'

    STATUS_ON_GOING = 'En cours de traitement'
    STATUS_TREATED = 'Traitée'
    STATUS_NOT_TREATED = 'Pas encore traitée'
    STATUS_CLOSED = 'Clôturée'
    STATUS_ALREADY_TREATED = 'Anciennement traitée'

    STATUS_CHOICES = [
        (STATUS_ON_GOING, 'En cours de traitement'),
        (STATUS_TREATED, 'Traitée'),
        (STATUS_NOT_TREATED, 'Pas encore traitée'),
        (STATUS_CLOSED, 'Clôturée'),
        (STATUS_ALREADY_TREATED, 'Anciennement traitée')
    ]

    TYPE_CHOICES = [
        (TYPE_ACTIVATION, 'Activation'),
        (TYPE_PHONE, 'Changement de téléphone'),
        (TYPE_UNBLOCK, 'Déblocage'),
        (TYPE_PASSWORD, 'Changement de mot de passe'),
        (TYPE_Transfers, 'Virements'),
        (TYPE_GAB, 'Retrait Gab'),
        (TYPE_EXTRACT, 'Extrait de compte'),
        (TYPE_OTHERS, 'Autres')
    ]
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    last_update = models.DateTimeField(auto_now=True)
    treatment_date = models.DateTimeField(null=True)
    type = models.CharField(
        max_length=255, choices=TYPE_CHOICES, default=TYPE_ACTIVATION)
    status = models.CharField(
        max_length=255, choices=STATUS_CHOICES, default=STATUS_NOT_TREATED)

    def __str__(self):
        return self.customer_name
