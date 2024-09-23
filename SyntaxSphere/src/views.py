from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics,viewsets,filters
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User, Posts
from .serializers import UserSerializer, SignInSerializer, PostSerializer


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
