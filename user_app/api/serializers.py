from backend.models import Profile
from rest_framework import serializers

class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_type':'password'},write_only=True)
    
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'email', 'password','confirm_password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    def save(self):
        
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']
        
        if Profile.objects.filter(email = self.validated_data['email']).exists():
            raise serializers.ValidationError({'error':'Email already exists!'})
        
        if password != confirm_password:
            raise serializers.ValidationError({'error':'password confirm error'})
        
        account = Profile(first_name=self.validated_data['first_name'],last_name=self.validated_data['last_name'],email=self.validated_data['email'])
        account.set_password(password)
        account.save()
        
        return account