from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Posts,Likes,Comments


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user

class SignInSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Posts
        fields='__all__'

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Likes
        fields='__all__'

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields='__all__'







