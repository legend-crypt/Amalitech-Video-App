from core.models import *
from core.serializers import *


def get_user_information(email):
    """Get user information by email

    Args:
        email (str): user email

    Returns:
        dict: user information
    """
    user = get_user_by_email(email)
    return {
        "user_id": user.user_id,
        "email": user.email,
        "verified": user.verified,
    }

def get_user_by_email(email):
    """Get user by email"""
    try:
        return UserAccount.objects.get(email=email)
    except UserAccount.DoesNotExist:
        return None

def get_user_by_id(user_id):
    """Get user by id"""
    try:
        return UserAccount.objects.get(user_id=user_id)
    except UserAccount.DoesNotExist:
        return None
    
    
def get_all_users():
    """Get all users"""
    queryset = UserAccount.objects.all()
    serializer = UserAccountSerializer(queryset, many=True)
    return serializer.data


def get_verification_token(email):
    """Get verification token"""
    try:
        return VerificationToken.objects.get(email=email)
    except VerificationToken.DoesNotExist:
        return None


def get_password_token(email):
    """Get password token"""
    try:
        return PasswordResetToken.objects.get(email=email)
    except PasswordResetToken.DoesNotExist:
        return None
