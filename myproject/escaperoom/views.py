# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone

def index(request):
    return render(request, 'escaperoom/index.html')

def game(request):
    player_name = request.GET.get('player_name', 'Player')
    # Store the start time in session
    request.session['game_start_time'] = timezone.now().timestamp()
    return render(request, 'escaperoom/game.html', {'player_name': player_name})

def finish(request):
    player_name = request.GET.get('player_name', 'Player')
    score = request.GET.get('score', 0)
    
    # Calculate time taken
    start_time = request.session.get('game_start_time', 0)
    end_time = timezone.now().timestamp()
    time_taken = int(end_time - start_time)
    
    # Format time as minutes and seconds
    minutes = time_taken // 60
    seconds = time_taken % 60
    time_formatted = f"{minutes}m {seconds}s"

    context = {
        'player_name': player_name,
        'score': score,
        'time_taken': time_formatted
    }
    return render(request, 'escaperoom/finish.html', context)