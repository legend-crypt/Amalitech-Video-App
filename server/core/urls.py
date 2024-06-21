from django.urls import path
from core.views.accounts import *
from core.views.videos import *
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('register/', AccountCreationViewSet.as_view({'post': 'create'}), name='register'),
    path('send-verification-email/', AccountCreationViewSet.as_view({'post': 'send_verification_email'}), name='send-verification-email'),
    path('verify-email/', AccountCreationViewSet.as_view({'post': 'verify_email'}), name='verify-email'),    
    path('login/', AccountCreationViewSet.as_view({'post': 'login'}), name='login'),
    path('password-reset/', AccountCreationViewSet.as_view({'post': 'password_reset'}), name='password-reset'),
    path('password-reset-verify/', AccountCreationViewSet.as_view({'post': 'password_reset_verify'}), name='password-reset-verify'),
    path('password-reset-request/', AccountCreationViewSet.as_view({'post': 'password_reset_request'}), name='password-reset-request'),
    
    # Videos
    path('videos/', VideoViewSet.as_view({'get': 'list', 'post': 'create'}), name='videos'),
    # path('videos/upload/', VideoViewSet.as_view({'post': 'create'}), name='video-upload'),
    path('videos/<uuid:pk>/', VideoViewSet.as_view({'get': 'retrieve'}), name='video-detail'),


]
    
