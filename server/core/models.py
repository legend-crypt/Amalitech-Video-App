from django.db import models
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.utils import timezone
from uuid import uuid4
# Create your models here.


class UserAccountBase(BaseUserManager):
    """Custom user model manage"""
    def create_user(self, email, password, **extra_fields):
        """creates and save user given email and password"""
        if not email:
            raise ValueError(_("Email is required"))
        email = self.normalize_email(email=email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        """Creates and a superuser with email and password"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        if not extra_fields.get('is_staff'):
            raise ValueError(_("is_staff must be set to True"))
        if not extra_fields.get('is_superuser'):
            raise ValueError(_("is_superuser must be set to True"))
        return self.create_user(email=email, password=password, **extra_fields)
    
        
class UserAccount(AbstractBaseUser, models.Model):
    """Main user model"""
    user_id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    verified = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserAccountBase()
    
    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser
    
    def has_module_perms(self, app_label):
        return self.is_superuser
    

class VerificationToken(models.Model):
    """User email verification token"""
    email = models.EmailField()
    token = models.CharField(max_length=255)
    time_generated = models.DateTimeField()
    
    def __str__(self):
        return self.email + " " + self.token
    
class PasswordResetToken(models.Model):
    """User password reset token"""
    email = models.EmailField()
    token = models.CharField(max_length=255)
    time_generated = models.DateTimeField()
    
    def __str__(self):
        return self.email + " " + self.token
    

class Video(models.Model):
    video_id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    video = models.FileField(upload_to='videos')
    thumbnail = models.ImageField(upload_to='thumbnails')
    
    
    def __str__(self):
        return self.title
    