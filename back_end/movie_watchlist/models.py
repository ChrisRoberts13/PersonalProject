from django.db import models
from user_app.models import App_User


class MovieWatchlist(models.Model):
    movie = models.CharField(max_length=100)
    user = models.ForeignKey(App_User, on_delete=models.CASCADE)

    def __str__ (self):
        return self.movie
