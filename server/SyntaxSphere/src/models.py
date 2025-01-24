

from django.contrib.auth.models import User
from django.db.models import CASCADE, UUIDField
from django.utils import timezone
from django.db import models
import uuid
from cloudinary.models import CloudinaryField
# Create your models here.



class Posts(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	title=models.CharField(max_length=50)
	url=models.URLField(null=True,blank=True)
	user=models.ForeignKey(User,on_delete=CASCADE)
	posted_at=models.DateTimeField(default=timezone.now)
	like_count = models.PositiveIntegerField(default=0)
	content = models.TextField()
	image = CloudinaryField('posts', null=True, blank=True)


class Likes(models.Model):
	user_id = models.ForeignKey(User, on_delete=CASCADE)
	post_id= models.ForeignKey(Posts,on_delete=CASCADE)


class Comments(models.Model):
	id = models.UUIDField(primary_key=True ,default=uuid.uuid4, editable=False)
	user_id = models.ForeignKey(User, on_delete=CASCADE)
	post_id = models.ForeignKey(Posts, on_delete=CASCADE)
	comment=models.CharField(max_length=255)
	posted_at=models.DateTimeField(default=timezone.now)


class Profile(models.Model):
	user_id = models.OneToOneField(User, on_delete=CASCADE)
	username=models.CharField(max_length=150,unique=True,null=False,blank=False)
	bio=models.CharField(max_length=120,null=True,blank=True)
	git_hub_account=models.CharField(max_length=39,null=True,blank=True)


	@property
	def git_hub_url(self):
		if self.git_hub_account:
			return f"https://github.com/{self.git_hub_account}"
		return None
	def save(self,*args,**kwargs):
		if not self.username:
			self.username=self.user_id.username
		super(Profile,self).save(*args,**kwargs)
	def __str__(self):
		return self.git_hub_account













