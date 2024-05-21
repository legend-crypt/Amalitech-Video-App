from django.urls import path, re_path, include
from core.views.accounts import *
from core.views.videos import *
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('register/', AccountCreationViewSet.as_view({'post': 'create'})),
    path('send-verification-email/', AccountCreationViewSet.as_view({'post': 'send_verification_email'})),
    path('verify-email/', AccountCreationViewSet.as_view({'post': 'verify_email'})),    
    path('login/', AccountCreationViewSet.as_view({'post': 'login'})),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password-reset/', AccountCreationViewSet.as_view({'post': 'password_reset'})),
    path('password-reset-verify/', AccountCreationViewSet.as_view({'post': 'password_reset_verify'})),
    path('password-reset-request/', AccountCreationViewSet.as_view({'post': 'password_reset_request'})),
    
    # Videos
    path('videos/', VideoViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('videos/<uuid:pk>/', VideoViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]
    