from dataclasses import fields
from random import choices
from rest_framework import serializers
from backend.models import Profile, Reclamation


class ReclamationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reclamation
        fields = "__all__"
        # read_only_fields = ['updated_by']


class ReclamationCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reclamation
        read_only_fields = ['updated_by', 'created_by', 'treatment_date']
        exclude = ['status']


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        exclude = ['last_login', 'password']

    # password level validation
    # def validate(self, data):
    #     if data['email'] == data['password']:
    #         raise serializers.ValidationError("Email and Password should not be the same")
    #     return data

    # field level validation

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError(
                'Password must be at least 6 characters long')
        return value

# def password_length(value):
#         if len(value) < 6:
#             raise serializers.ValidationError('Password must be at least 6 characters long')

# class ProfileSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     first_name = serializers.CharField()
#     last_name = serializers.CharField()
#     email = serializers.EmailField()
#     password = serializers.CharField(validators = [password_length])
#     is_admin = serializers.BooleanField()
#     is_consultant = serializers.BooleanField()

#     def create(self, validated_data):
#         return Profile.objects.create(**validated_data)

#     def update(self, instance, validated_data):
#         instance.first_name = validated_data.get('first_name', instance.first_name)
#         instance.last_name = validated_data.get('last_name', instance.last_name)
#         instance.email = validated_data.get('email', instance.email)
#         instance.password = validated_data.get('password', instance.password)
#         instance.is_admin = validated_data.get('is_admin', instance.is_admin)
#         instance.is_consultant = validated_data.get('is_consultant', instance.is_consultant)
#         instance.save()
#         return instance

#     # password level validation
#     def validate(self, data):
#         if data['email'] == data['password']:
#             raise serializers.ValidationError("Email and Password should not be the same")
#         return data

    # field level validation
    # def validate_password(self, value):
    #     if len(value) < 6:
    #         raise serializers.ValidationError('Password must be at least 6 characters long')
    #     return value
