from django.contrib import admin
from .models import Prize
from .models import User

# Register your models here.

admin.site.register(Prize)
admin.site.register(User)