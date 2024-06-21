from rest_framework import serializers
from core.models import UserAccount, Video

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['user_id', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
        
        
class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        thumbnail = serializers.ImageField(max_length=None, use_url=True)
        video = serializers.FileField(max_length=None, use_url=True)
        fields = ['video_id', 'title', 'description', 'video', 'thumbnail']
    