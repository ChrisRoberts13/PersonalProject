# Generated by Django 4.2.15 on 2024-08-21 23:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('favorite_characters', '0002_remove_favoritecharacter_character_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='favoritecharacter',
            name='character_id',
            field=models.IntegerField(null=True, unique=True),
        ),
    ]
