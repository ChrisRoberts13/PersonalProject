from django.urls import path
from .views import MovieWatchlistView

urlpatterns = [
    path("movie_watchlist/", MovieWatchlistView.as_view())
]
