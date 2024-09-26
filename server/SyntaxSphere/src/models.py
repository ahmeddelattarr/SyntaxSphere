from django.contrib.auth.models import User
from django.db.models import CASCADE
from django.utils import timezone
from django.db import models
import uuid
# Create your models here.



class Posts(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	title=models.CharField(max_length=50)
	url=models.URLField()
	user=models.ForeignKey(User,on_delete=CASCADE)
	posted_at=models.DateTimeField(default=timezone.now)
	like_count = models.PositiveIntegerField(default=0)


class Likes(models.Model):
	user_id = models.ForeignKey(User, on_delete=CASCADE)
	post_id= models.ForeignKey(Posts,on_delete=CASCADE)


class Comments(models.Model):
	id = models.UUIDField(primary_key=True ,default=uuid.uuid4, editable=False)
	user_id = models.ForeignKey(User, on_delete=CASCADE)
	post_id = models.ForeignKey(Posts, on_delete=CASCADE)
	comment=models.CharField(max_length=255)
	posted_at=models.DateTimeField(default=timezone.now)









