from django.db.models import CASCADE
from django.utils import timezone
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

class Posts(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	title=models.CharField(max_length=50)
	url=models.URLField()
	user_id=models.ForeignKey(User,on_delete=CASCADE)
	posted_at=models.DateTimeField(default=timezone.now)

class Likes(models.Model):
	user_id = models.ForeignKey(User, on_delete=CASCADE)
	post_id= models.ForeignKey(Posts,on_delete=CASCADE)

class Comments(models.Model):
	id = models.CharField(max_length=12,primary_key=True, editable=False)
	user_id = models.ForeignKey(User, on_delete=CASCADE)
	post_id = models.ForeignKey(Posts, on_delete=CASCADE)
	comment=models.CharField(max_length=255)
	posted_at=models.DateTimeField(default=timezone.now)









