from rest_framework import serializers
from .models import MovieWatchlist


class MovieWatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieWatchlist
        fields = "__all__"

    
