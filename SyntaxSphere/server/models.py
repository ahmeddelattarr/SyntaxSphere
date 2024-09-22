from enum import UNIQUE

from django.db import models
import uuid
# Create your models here.

class User(models.Model):
	id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
	first_name=models.CharField(max_length=100)
	last_name=models.CharField(max_length=100)
	password=models.CharField(max_length=255)
	email=models.EmailField(unique=True)
	username=models.CharField(max_length=50,unique=True)


