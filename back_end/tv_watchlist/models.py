from django.db import models

from user_app.models import App_User


class TVWatchlist(models.Model):
    tv_show = models.CharField(max_length=100)
    user = models.ForeignKey(App_User, on_delete=models.CASCADE)

    def __str__ (self):
        return self.tv_show
