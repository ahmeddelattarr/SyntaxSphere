

from django.contrib.auth import authenticate
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics,viewsets,filters
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User, Posts, Likes, Comments
from .serializers import UserSerializer, SignInSerializer, PostSerializer, CommentsSerializer


class SignUpView(generics.CreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = (AllowAny,)

	def post(self, request):
		serializer = UserSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			user = User.objects.get(username=serializer.data['username'])
			refresh = RefreshToken.for_user(user)
			return Response({
				'refresh': str(refresh),
				'access': str(refresh.access_token),
			}, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignInView(generics.CreateAPIView):
	queryset = User.objects.all()
	serializer_class = SignInSerializer
	permission_classes = (AllowAny,)

	def post(self, request):
		username = request.data.get('username')
		password = request.data.get('password')
		user = authenticate(username=username, password=password)
		if user:
			refresh = RefreshToken.for_user(user)
			return Response({
				'refresh': str(refresh),
				'access': str(refresh.access_token),
			}, status=status.HTTP_200_OK)
		return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class SignOutView(generics.CreateAPIView):
	permission_classes = (IsAuthenticated,)

	def post(self, request):
		try:
			refresh_token = request.data['refresh']
			token = RefreshToken(refresh_token)
			token.blacklist()
			return Response(status=status.HTTP_205_RESET_CONTENT)
		except AttributeError:
			return Response(status=status.HTTP_400_BAD_REQUEST)

class HandlingPostsViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)

	queryset = Posts.objects.all()
	serializer_class = PostSerializer
	filter_backends = [filters.SearchFilter]
	search_fields = ['title']
	lookup_field='id'


class LikesViewSet(viewsets.ModelViewSet):

    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        post_id = self.kwargs.get('pk')  # Get the 'post_id' from the URL (passed as 'pk')
        user = request.user

        # Ensure post exists
        post = get_object_or_404(Posts, id=post_id)

        # Check if the post is already liked by the user
        liked = Likes.objects.filter(user_id=user, post_id=post).exists()

        if liked:
            # Unlike the post
            Likes.objects.filter(user_id=user, post_id=post).delete()
            post.like_count -= 1
            post.save()
            return Response({'message': 'Unliked', 'likes_count': post.like_count}, status=status.HTTP_200_OK)

        else:
            # Like the post
            Likes.objects.create(user_id=user, post_id=post)
            post.like_count += 1
            post.save()
            return Response({'message': 'Liked', 'likes_count': post.like_count}, status=status.HTTP_201_CREATED)


class CommentsViewSet(viewsets.ModelViewSet):
    serializer_class = CommentsSerializer
    permission_classes = (IsAuthenticated,)



    def get_queryset(self):
        post_id = self.kwargs.get('pk')
        return Comments.objects.filter(post_id=post_id)

    def perform_create(self, serializer):
        post_id = self.kwargs.get('pk')
        post = get_object_or_404(Posts, id=post_id)
        serializer.save(user_id=self.request.user, post_id=post)








