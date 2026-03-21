from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import OctoFitUser, Team, Activity, Leaderboard, Workout
from .serializers import (
    UserSerializer, TeamSerializer, ActivitySerializer,
    LeaderboardSerializer, WorkoutSerializer
)


@api_view(['GET'])
def api_root(request):
    return Response({
        'users': '/api/users/',
        'teams': '/api/teams/',
        'activities': '/api/activities/',
        'leaderboard': '/api/leaderboard/',
        'workouts': '/api/workouts/',
    })


class UserViewSet(viewsets.ModelViewSet):
    queryset = OctoFitUser.objects.all()
    serializer_class = UserSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


from .models import User, Activity, Team, Leaderboard, Workout
from .serializers import UserSerializer, ActivitySerializer, TeamSerializer, LeaderboardSerializer, WorkoutSerializer

@api_view(['GET'])
def api_root(request, format=None):
    import os
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        base_url = f"https://{codespace_name}-8000.app.github.dev"
    else:
        base_url = "http://localhost:8000"
    return Response({
        'users': f'{base_url}/api/users/',
        'activities': f'{base_url}/api/activities/',
        'teams': f'{base_url}/api/teams/',
        'leaderboard': f'{base_url}/api/leaderboard/',
        'workouts': f'{base_url}/api/workouts/',
    })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all().order_by('-score')
    serializer_class = LeaderboardSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
