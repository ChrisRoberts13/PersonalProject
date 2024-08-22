# Django
from django.shortcuts import render
from django.core.exceptions import ValidationError
from django.contrib.auth import login, logout, authenticate

# DRF
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token

# Code
from .models import App_User


class Sign_up(APIView):
    def post(self, request):
        data = request.data.copy()

        # use email as username
        data["username"] = request.data.get("username", request.data.get("email"))

        # create user
        try:
            new_user = App_User(**data)
            new_user = App_User.objects.create_user(**data)
            # create auth token and log the user in
            token = Token.objects.create(user=new_user)
            login(request, new_user)

            response_data = {
                "email": new_user.email,
                "token": token.key,
            }
            return Response(response_data, status=HTTP_201_CREATED)

        # error response
        except ValidationError as e:
            print(e.message_dict)
            return Response({"error": e.message_dict}, status=HTTP_400_BAD_REQUEST)


class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        data["username"] = request.data.get("username", request.data.get("email"))

        user = authenticate(
            username=data.get("username"), password=data.get("password")
        )
        print(user)

        if user:
            login(request, user)

            # SELECT * from token where user = user
            # INSERT token (user) VALUES (user)
            # token, bool
            token, created = Token.objects.get_or_create(user=user)

            response_data = {
                "email": user.email,
                "token": token.key,
            }
            return Response(response_data, status=HTTP_200_OK)

        # Else, no user found
        return Response("Invalid login credentials", status=HTTP_400_BAD_REQUEST)


class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class Log_out(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)


class Info(TokenReq):
    def get(self, request):
        return Response(
            {
                "email": request.user.email,
            }
        )
        # TODO send error response if invalid

    def put(self, request):
        data = request.data.copy()
        ruser = request.user
        # TODO: Update other fields

        # changing the password
        # We only change the password if both of these are in the request body:
        # { 'password': 'foo', 'new_password': 'bar}
        cur_pass = data.get("password")
        password_changed = False
        if cur_pass and data.get("new_password"):
            auth_user = authenticate(username=ruser.username, password=cur_pass)
            if auth_user == ruser:  # can probably delete but not sure
                # IMPORTANT:
                ruser.set_password(data.get("new_password"))
                ruser.full_clean()
                ruser.save()

                password_changed = True

        # TODO make better
        return Response(
            {
                "email": request.user.email,
                "password_changed": password_changed,
            }
        )
