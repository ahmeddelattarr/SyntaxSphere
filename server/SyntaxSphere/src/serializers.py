from rest_framework import serializers
from django.contrib.auth.models import User
import cloudinary.uploader


from .models import Posts, Likes, Comments, Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        # Create profile with same username
        Profile.objects.create(
            user_id=user,
            username=user.username
        )
        return user

class SignInSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()

class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    user_id = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Posts
        fields = ['id', 'title', 'url', 'user','user_id','posted_at', 'like_count','content','image']
        read_only_fields = ['id', 'user', 'posted_at', 'like_count']






class LikesSerializer(serializers.ModelSerializer):
    content=serializers.SerializerMethodField()
    user=serializers.SerializerMethodField()
    title=serializers.SerializerMethodField()
    posted_at=serializers.SerializerMethodField()
    like_count=serializers.SerializerMethodField()



    class Meta:
        model=Likes
        fields=['id','user_id','post_id','content','user','title','posted_at','like_count']
        read_only_fields=['id','user_id','post_id','content','user','title','posted_at','like_count']

    def get_content(self,obj):
        return obj.post_id.content

    def get_user(self,obj):
        return obj.user_id.username

    def get_title(self,obj):
        return obj.post_id.title

    def get_posted_at(self,obj):
        return obj.post_id.posted_at

    def get_like_count(self,obj):
        return obj.post_id.like_count



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
    
    is_my_own_profile=serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['user_id','username', 'bio', 'git_hub_account','is_my_own_profile','profile_pic']
        read_only_fields =['user_id']

    

    def get_is_my_own_profile(self,obj):
        request = self.context.get('request')
        return request.user.username==obj.username if request else False

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user_id'] = user
        validated_data['username'] = user.username  # Ensure username matches user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'username' in validated_data:
            # Update the User model's username as well
            user = instance.user_id
            user.username = validated_data['username']
            user.save()

        if 'profile_pic' in validated_data:
            instance.profile_pic = validated_data['profile_pic']

        return super().update(instance, validated_data)






