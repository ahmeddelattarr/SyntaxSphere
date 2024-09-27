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
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Posts
        fields = ['id', 'title', 'url', 'user', 'posted_at', 'like_count']
        read_only_fields = ['id', 'user', 'posted_at', 'like_count']


class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Likes
        fields='__all__'

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'user_id', 'post_id', 'comment', 'posted_at']
        read_only_fields = ['id', 'user_id', 'post_id', 'posted_at']

    def create(self, validated_data):
        request = self.context.get('request')
        post_id = self.context.get('view').kwargs.get('pk')
        post = Posts.objects.get(id=post_id)
        validated_data['user_id'] = request.user
        validated_data['post_id'] = post
        return super().create(validated_data)





