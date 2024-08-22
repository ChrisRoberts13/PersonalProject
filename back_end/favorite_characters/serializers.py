from django import forms
from .models import FavoriteCharacter
from rest_framework import serializers


class FavoriteCharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteCharacter
        fields = "__all__"
