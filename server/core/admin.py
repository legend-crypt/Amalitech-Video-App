from django.contrib import admin
from core.models import *

# Register your models here.
admin.site.register(UserAccount)
admin.site.register(VerificationToken)
admin.site.register(PasswordResetToken)
admin.site.register(Video)