from django.urls import path
from .views import getFavoriteCharacters
from .views import postFavoriteCharacter

urlpatterns = [
    path(
        "favorite_characters/",
        getFavoriteCharacters.as_view(),
        name="favorite_characters",
    ),
    path(
        "add_favorite_character/",
        postFavoriteCharacter.as_view(),
        name="add_favorite_character",
    ),
]
