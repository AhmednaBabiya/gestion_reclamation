# Generated by Django 4.1.2 on 2022-10-24 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_remove_reclamation_nni_reclamation_identity_card_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='reclamation',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='reclamation',
            name='status',
            field=models.CharField(choices=[('En cours de traitement', 'En cours de traitement'), ('Traitée', 'Traitée'), ('Pas encore traitée', 'Pas encore traitée')], default='Pas encore traitée', max_length=255),
        ),
        migrations.AlterField(
            model_name='reclamation',
            name='type',
            field=models.CharField(choices=[('Activation', 'Activation'), ('Changement de téléphone', 'Changement de téléphone'), ('Déblocage', 'Déblocage'), ('Changement de mot de passe', 'Changement de mot de passe'), ('Virements', 'Virements'), ('Autres', 'Autres')], default='Activation', max_length=255),
        ),
    ]
