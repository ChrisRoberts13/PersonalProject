from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Watchlist
from .serializers import WatchlistSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class getWatchlist(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        # Retrieve video for the authenticated user
        favorite_videos = Watchlist.objects.filter(user=user)
        serializer = WatchlistSerializer(favorite_videos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class postVideo(APIView):
    def post(self, request):
        data = request.data
        data["user"] = request.user.id
        serializer = WatchlistSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class deleteVideo(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, video_id, format=None):
        user = request.user
        # Retrieve the video object for the authenticated user and given video ID
        favorite_video = get_object_or_404(
           Watchlist, user=user, video_id=video_id
        )
        favorite_video.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
