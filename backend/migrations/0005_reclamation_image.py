# Generated by Django 4.1.2 on 2022-10-20 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_alter_profile_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='reclamation',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
