from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import TVWatchlist
from .serializers import TVWatchlistForm  # You need to create this form


"""
  TVWatchlistListView,
    TVWatchlistDetailView,
    TVWatchlistCreateView,
    TVWatchlistUpdateView,
    TVWatchlistDeleteView,
"""
def TVWatchlistListView(request):
    watchlists = TVWatchlist.objects.all()
    return render(
        request, "tvwatchlist/tvwatchlist_list.html", {"watchlists": watchlists}
    )


def TVWatchlistDetailView(request, pk):
    watchlist = get_object_or_404(TVWatchlist, pk=pk)
    return render(
        request, "tvwatchlist/tvwatchlist_detail.html", {"watchlist": watchlist}
    )


def TVWatchlistCreateView(request):
    if request.method == "POST":
        serializers = TVWatchlistForm(request.POST)
        if serializers.is_valid():
            serializers.save()
            return redirect("tvwatchlist-list")
    else:
        serializers = TVWatchlistForm()
    return render(request, "tvwatchlist/tvwatchlist_form.html", {"serializers": serializers})


def TVWatchlistUpdateView(request, pk):
    watchlist = get_object_or_404(TVWatchlist, pk=pk)
    if request.method == "POST":
        form = TVWatchlistForm(request.POST, instance=watchlist)
        if form.is_valid():
            form.save()
            return redirect("tvwatchlist-detail", pk=pk)
    else:
        form = TVWatchlistForm(instance=watchlist)
    return render(request, "tvwatchlist/tvwatchlist_form.html", {"form": form})


def TVWatchlistDeleteView(request, pk):
    watchlist = get_object_or_404(TVWatchlist, pk=pk)
    if request.method == "POST":
        watchlist.delete()
        return redirect("tvwatchlist-list")
    return render(
        request, "tvwatchlist/tvwatchlist_confirm_delete.html", {"watchlist": watchlist}
    )
