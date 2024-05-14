from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from core.senders.accounts import *
import threading
from core.retrievers.accounts import *
from core.utils import *
from rest_framework_simplejwt.tokens import RefreshToken
import json
import os
from django.contrib.auth import authenticate


class AccountCreationViewSet(viewsets.ViewSet):
    def create(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if email is None or password is None:
            return Response("Please provide both email and password", status=status.HTTP_400_BAD_REQUEST)
        if UserAccount.objects.filter(email=email).exists():
            return Response("Email already exists", status=status.HTTP_208_ALREADY_REPORTED)
        
        user = create_user(email=email, password=password)

        thread = threading.Thread(target=email_verification, args=(email, 4))
        thread.start()
        return Response("User created successfully", status=status.HTTP_201_CREATED)
    
    def send_verification_email(self, request):
        """Send verification email

        Args:
            request (http): http request

        Returns:
            http Response: http response
        """
        email = request.data.get('email')
        if email is None:
            return Response("Please provide email"
            , status=status.HTTP_400_BAD_REQUEST)
        user = get_user_by_email(email)
        if not user:
            return Response('No account associated with this email', status=status.HTTP_404_NOT_FOUND)
        if user.verified:
            return Response("Account already verified", status=status.HTTP_208_ALREADY_REPORTED)
        otp_object = get_verification_token(email)
        if otp_object:
            otp_object.delete()
        if email_verification(email, 4):
            return Response("Verification email sent successfully", status=status.HTTP_200_OK)
        return Response("Could not send otp", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    def verify_email(self, request):
        """Verify email

        Args:
            request (http): http request

        Returns:
            Http Response: http response
        """
        
        email = request.data.get("email")
        otp = request.data.get("otp")

        user = get_user_by_email(email)
        if not user:
            return Response("No account associated with this email", status=status.HTTP_404_NOT_FOUND)
        if user.verified:
            return Response("Your account has already been verified", status=status.HTTP_208_ALREADY_REPORTED)

        otp_detail = VerificationToken.objects.get(email=email).first()
        if otp == otp_detail.token:
            if UTC.localize(datetime.now()) < otp_detail.time_generated + timedelta(
                minutes=10
            ):
                user.verified = True
                user.save()
                otp_detail.delete()
                email_thread = threading.Thread(
                    target=verification_confirmation_email, args=[email]
                )

                email_thread.start()
                return Response("Your email has been verified successfully", status=status.HTTP_200_OK)

            else:
                otp_detail.delete()
                return Response("This otp has expired Request a new one", status=status.HTTP_400_BAD_REQUEST)

        
        return Response("The otp you have provided is invalid", status=status.HTTP_400_BAD_REQUEST)
    
    
    def login(self, request):
        """Sign in

        Args:
            request (http): http request

        Returns:
            Http Response: http response
        """
        email = request.data.get("email")
        password = request.data.get("password")
        if email is None or password is None:
            return Response("Please provide both email and password", status=status.HTTP_400_BAD_REQUEST)
        user = get_user_by_email(email)
        if not user:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)
        user = authenticate(email=email, password=password)
        if user is None:
            return Response("Invalid credentials" , status=status.HTTP_401_UNAUTHORIZED)
        if not user.verified:
            return Response("Account not verified", status=status.HTTP_401_UNAUTHORIZED)
        refresh = RefreshToken.for_user(user)
        context = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        return Response(context, status=status.HTTP_200_OK)   
    
    
    def password_reset_request(self, request):
        """Request password reset

        Args:
            request (http): http request

        Returns:
            Http Response: http response
        """
        email = request.data.get("email")
        if email is None:
            return Response("Please provide email", status=status.HTTP_400_BAD_REQUEST)
        user = get_user_by_email(email)
        if not user:
            return Response("No account associated with this email", status=status.HTTP_404_NOT_FOUND)
        otp_object = get_password_token(email)
        if otp_object:
            otp_object.delete()
        if password_reset_email(email, 4):
            return Response("Password reset email sent successfully", status=status.HTTP_200_OK)
        return Response("Could not send otp", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    def password_reset_verify(self, request):
        """Verify password reset

        Args:
            request (http): http request

        Returns:
            Http Response: http response
        """
        email = request.data.get("email")
        otp = request.data.get("otp")
        user = get_user_by_email(email)
        if not user:
            return Response("No account associated with this email", status=status.HTTP_404_NOT_FOUND)
        otp_detail = get_password_token(email)
        if not otp_detail:
            return Response("Requset for password reset", status=status.HTTP_403_FORBIDDEN)
        if otp == otp_detail.token:
            if UTC.localize(datetime.now()) < otp_detail.time_generated + timedelta(
                minutes=10
            ):
                otp_detail.delete()
                return Response("The otp is valid", status=status.HTTP_200_OK)
            else:
                otp_detail.delete()
                return Response("The otp has expired", status=status.HTTP_400_BAD_REQUEST)
        return Response("The otp is invalid", status=status.HTTP_400_BAD_REQUEST)
    
    
    def password_reset(self, request):
        """Reset password

        Args:
            request (http): http request

        Returns:
            Http Response: http response
        """
        email = request.data.get("email")
        password = request.data.get("password")
        user = get_user_by_email(email)
        if not user:
            return Response("No account associated with this email", status=status.HTTP_404_NOT_FOUND)
        user.set_password(password)
        user.save()
        return Response("Password reset successful", status=status.HTTP_200_OK)