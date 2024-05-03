from django.urls import path
from core.views.accounts import *

urlpatterns = [
    path('register/', AccountCreationViewSet.as_view({'post': 'create'})),
    path('send-verification-email/', AccountCreationViewSet.as_view({'post': 'send_verification_email'})),
    path('verify-email/', AccountCreationViewSet.as_view({'post': 'verify_email'})),
]
    