from django.urls import path
from .views import (
    TVWatchlistListView,
    TVWatchlistDetailView,
    TVWatchlistCreateView,
    TVWatchlistUpdateView,
    TVWatchlistDeleteView,
)

urlpatterns = [
    path("", TVWatchlistListView.as_view(), name="tvwatchlist-list"),
    path(
        "watchlist/<int:pk>/",
        TVWatchlistDetailView.as_view(),
        name="tvwatchlist-detail",
    ),
    path("watchlist/new/", TVWatchlistCreateView.as_view(), name="tvwatchlist-create"),
    path(
        "watchlist/<int:pk>/edit/",
        TVWatchlistUpdateView.as_view(),
        name="tvwatchlist-update",
    ),
    path(
        "watchlist/<int:pk>/delete/",
        TVWatchlistDeleteView.as_view(),
        name="tvwatchlist-delete",
    ),
]
