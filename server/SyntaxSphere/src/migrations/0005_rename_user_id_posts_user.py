# Generated by Django 5.1.1 on 2024-09-26 11:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0004_alter_comments_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='posts',
            old_name='user_id',
            new_name='user',
        ),
    ]