# Generated by Django 4.1.2 on 2022-12-05 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_alter_reclamation_identity_card_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='is_consultant',
            field=models.BooleanField(default=False),
        ),
    ]
