# Generated by Django 5.1.1 on 2024-09-24 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0002_alter_comments_user_id_alter_likes_user_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='posts',
            name='like_count',
            field=models.PositiveIntegerField(default=0),
        ),
    ]