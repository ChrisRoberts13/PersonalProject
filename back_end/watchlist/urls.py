from django.urls import path
from .views import getWatchlist
from .views import postVideo
from .views import deleteVideo

urlpatterns = [
    path(
        "watchlist/",
        getWatchlist.as_view(),
        name="watchlist",
    ),
    path(
        "add_video/",
        postVideo.as_view(),
        name="add_video",
    ),
    path(
        "watchlist/<int:video_id>/delete/",
        deleteVideo.as_view(),
        name="delete_video",
    ),
]
