# Create your views here.
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.utils import timezone
from .models import UserScore
from django.db.models import Count
from django.urls import reverse
from urllib.parse import urlencode

def index(request):
    return render(request, 'escaperoom/index.html')

def game(request):
    player_name = request.GET.get('player_name', 'Player')
    # Store the start time in session
    request.session['game_start_time'] = timezone.now().timestamp()
    return render(request, 'escaperoom/game.html', {'player_name': player_name})

def store_score(request):
    player_name = request.GET.get('player_name', 'Player')
    score = request.GET.get('score', 0)
    start_time = request.session.get('game_start_time', 0)
    end_time = timezone.now().timestamp()
    time_taken = int(end_time - start_time)
    
    # Store the score in the database
    UserScore.objects.create(
        username=player_name,
        score=score,
        time_taken=time_taken,
        date=timezone.now()
    )
    
    # Prepare parameters for the finish page
    params = {
        'player_name': player_name,
        'score': score,
        'time_taken': time_taken,
    }
    
    # Redirect to finish page with parameters
    url = f"{reverse('finish')}?{urlencode(params)}"
    return redirect(url)

def finish(request):
    player_name = request.GET.get('player_name', 'Player')
    score = request.GET.get('score', 0)
    time_taken = int(request.GET.get('time_taken', 0))
    
    # Format time as minutes and seconds
    minutes = time_taken // 60
    seconds = time_taken % 60
    time_formatted = f"{minutes}m {seconds}s"

    # Get all scores ordered by score (desc) and time_taken (asc)
    all_scores = UserScore.objects.order_by('-score', 'time_taken')
    
    # Get top 10 scores
    top_10 = all_scores[:10]
    
    # Calculate player's position
    position = 1
    print(all_scores)
    for idx, s in enumerate(all_scores, 1):
        print(s.username, s.score, s.time_taken)
        if s.username == player_name and s.score == int(score) and s.time_taken == time_taken:
            position = idx
            break

    context = {
        'player_name': player_name,
        'score': score,
        'time_taken': time_formatted,
        'scores': top_10,
        'position': position
    }
    return render(request, 'escaperoom/finish.html', context)