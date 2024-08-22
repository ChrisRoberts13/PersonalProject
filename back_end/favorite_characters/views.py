from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import FavoriteCharacter
from .serializers import FavoriteCharacterSerializer  
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class getFavoriteCharacters(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        # Retrieve favorite characters for the authenticated user
        favorite_characters = FavoriteCharacter.objects.filter(user=user)
        serializer = FavoriteCharacterSerializer(favorite_characters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class postFavoriteCharacter(APIView):
    def post(self, request):
        data = request.data
        data["user"] = request.user.id
        serializer = FavoriteCharacterSerializer(data=data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status =status.HTTP_201_CREATED )
        else:
            print(serializer.errors)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)



class deleteFavoriteCharacter(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, character_id, format=None):
        user = request.user
        # Retrieve the favorite character object for the authenticated user and given character ID
        favorite_character = get_object_or_404(
            FavoriteCharacter, user=user, character_id=character_id
        )
        favorite_character.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# def list_favorite_characters(request):
#     favorites = FavoriteCharacter.objects.all()
#     return render(request, "list_favorites.html", {"favorites": favorites})


# def add_favorite_character(request):
#     if request.method == "POST":
#         serializers = FavoriteCharacterForm(request.POST)
#         if serializers.is_valid():
#             favorite = serializers.save(commit=False)
#             favorite.user = (
#                 request.user.app_user
#             )  # Assuming you have a user profile related to App_User
#             favorite.save()
#             return redirect("list_favorite_characters")
#     else:
#         serializers = FavoriteCharacterForm()

#     return render(request, "add_favorite.html", {"serializers": serializers})
