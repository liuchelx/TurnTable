from django.db import models
import datetime
from django.utils import timezone

# Create your models here.

class Prize(models.Model):
    name = models.CharField(max_length= 200)
    prize_id = models.IntegerField(default= 0)
    quantity = models.IntegerField(default= 0)

    def __str__(self):
        return self.name

class User(models.Model):
    phone = models.CharField( max_length= 200)
    prizeWin = models.IntegerField(default= 0)
    isDraw = models.BooleanField(default= False)

    def __str__(self):
        return self.phone