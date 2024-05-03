from django.contrib import admin
from core.models import *

# Register your models here.
admin.site.register(UserAccount)
admin.site.register(Verficationtoken)
admin.site.register(PasswordResetToken)