from core.models import *
from core.serializers import *
from datetime import datetime, timedelta
import pytz
import random, string
UTC = pytz.UTC


def create_user(email, password):
    """Creates a user

    Args:
        email (str): takes in a valid email address
        password (str): password for the user

    Returns:
        UserAccount: user json object
    """
    user = UserAccount.objects.create_user(email=email, password=password)
    queryset = UserAccountSerializer(user)
    return queryset


def create_verification_token(email, token):
    """Creates a verification token

    Args:
        email (str): takes in a valid email address
        token (str): verification token

    Returns:
        Verification: verification json object
    """
    time_generated = UTC.localize(datetime.now())
    verification_token = VerificationToken.objects.create(email=email, token=token, time_generated=time_generated)
    return verification_token


def update_verification_token(verification_token, otp):
    """Updates a verification token

    Args:
        verification_token (Verificationtoken): verification token object
        otp (str): new otp

    Returns:
        Verificationtoken: updated verification token object
    """
    time_generated = UTC.localize(datetime.now())
    verification_token.token = otp
    verification_token.time_generated = time_generated
    verification_token.save()
    return verification_token


def create_password_reset_token(email:str, token:str):
    """Creates a password reset token

    Args:
        email (str): takes in a valid email address
        token (str): verification token

    Returns:
        PasswordResetCode: passwordResetCode object
    """
    time_generated = UTC.localize(datetime.now())
    password_token = PasswordResetToken.objects.create(email=email, token=token, time_generated=time_generated)
    return password_token


def update_password_reset_token(password_reset_token, otp):
    """Updates a password_reset token

    Args:
        password_reset_token (PasswordResettoken): verification token object
        otp (str): new otp

    Returns:
        PasswordResettoken: updated password reset token object
    """
    time_generated = UTC.localize(datetime.now())
    password_reset_token.otp = otp
    password_reset_token.time_generated = time_generated
    password_reset_token.save()
    return password_reset_token