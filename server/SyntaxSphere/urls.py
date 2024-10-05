

from django.contrib import admin
from django.urls import path,include
from allauth.socialaccount.providers.github import views as github_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('SyntaxSphere.src.urls')),
    path('accounts/github/login/', github_views.oauth2_login, name='github_login'),
    path('accounts/github/login/callback/', github_views.oauth2_callback, name='github_callback'),
]
