from django.db import models
from user_app.models import App_User


class Watchlist(models.Model):
    video_id = models.IntegerField(null=True, unique=True)
    user = models.ForeignKey(App_User, on_delete=models.CASCADE)

   
