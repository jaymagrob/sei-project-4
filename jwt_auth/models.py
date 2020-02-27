from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=40, unique=True)
    name = models.CharField(max_length=40, unique=False)
    profile_image = models.CharField(max_length=500, null=True, blank=True)
    bio = models.CharField(max_length=400, null=True, blank=True)
    company = models.CharField(max_length=50, null=True, blank=True)
    title = models.CharField(max_length=50, null=True, blank=True)
    
    #Project_Owners fk
    #Project_Users fk
    #Task_Created fk
    #Task_Assigned fk
  
  
  