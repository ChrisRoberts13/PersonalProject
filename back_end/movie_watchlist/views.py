from django.shortcuts import render, redirect
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import MovieWatchlist


class MovieWatchlistView(ListView):
    model = MovieWatchlist
    template_name = "movie_watchlist.html"
    context_object_name = "watchlist"

    def get_queryset(self):
        # Filter watchlist items based on the current user
        return MovieWatchlist.objects.filter(user=self.request.user)


   