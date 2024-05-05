from django.urls import path
from core.views.accounts import *
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('register/', AccountCreationViewSet.as_view({'post': 'create'})),
    path('send-verification-email/', AccountCreationViewSet.as_view({'post': 'send_verification_email'})),
    path('verify-email/', AccountCreationViewSet.as_view({'post': 'verify_email'})),    
    path('login/', AccountCreationViewSet.as_view({'post': 'login'})),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
    