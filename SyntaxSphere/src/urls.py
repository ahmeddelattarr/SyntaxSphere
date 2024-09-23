from django.urls import path
from .views import SignUpView, SignInView, SignOutView,HandlingPostsViewSet
from rest_framework.routers import SimpleRouter


post_list = HandlingPostsViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

post_detail = HandlingPostsViewSet.as_view({
    'get': 'retrieve',
    'delete': 'destroy'
})
urlpatterns = [
	path('signup/', SignUpView.as_view(), name='signup'),
	path('signin/', SignInView.as_view(), name='signin'),

	path('signout/',SignOutView.as_view(),name='signout'),
	path('posts/list', post_list, name='post-list'),  # Custom URL for listing posts
	path('posts/new', post_list, name='post-create'),  # Custom URL for creating a post
	path('posts/<uuid:id>', post_detail, name='post-detail'),  # Custom URL for a specific post
	path('posts/<uuid:id>', post_detail, name='post-delete'),
]


