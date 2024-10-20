from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Posts, Likes, Comments, Profile


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
    user_id = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Posts
        fields = ['id', 'title', 'url', 'user','user_id','posted_at', 'like_count','content']
        read_only_fields = ['id', 'user', 'posted_at', 'like_count']


class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Likes
        fields=['id','user_id','post_id']
        read_only_fields=['id','user_id','post_id']

class CommentsSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = Comments
        fields = ['id', 'user_id', 'post_id', 'comment', 'posted_at','username']
        read_only_fields = ['id', 'user_id', 'post_id', 'posted_at','username']

    def get_username(self, obj):
        return obj.user_id.username

    def create(self, validated_data):
        request = self.context.get('request')
        post_id = self.context.get('view').kwargs.get('pk')
        post = Posts.objects.get(id=post_id)
        validated_data['user_id'] = request.user
        validated_data['post_id'] = post
        return super().create(validated_data)


class ProfileSerializer(serializers.ModelSerializer):
    git_hub_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['user_id', 'bio', 'git_hub_account', 'git_hub_url']

    def get_git_hub_url(self, obj):
        return obj.git_hub_url






