from django.urls import path
from .views import getFavoriteCharacters
from .views import postFavoriteCharacter
from .views import deleteFavoriteCharacter

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
    path(
        "favorite_characters/<int:character_id>/delete/",
        deleteFavoriteCharacter.as_view(),
        name="delete_favorite_character",
    ),
]
