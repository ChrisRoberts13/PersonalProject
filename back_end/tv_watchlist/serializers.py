from django import forms
from models import TVWatchlist


class TVWatchlistForm(forms.ModelForm):
    class Meta:
        model = TVWatchlist
        fields = ["tv_show", "user"]
