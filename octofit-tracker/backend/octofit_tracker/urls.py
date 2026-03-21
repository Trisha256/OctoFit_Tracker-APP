import os
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import api_root, UserViewSet, ActivityViewSet, TeamViewSet, LeaderboardViewSet, WorkoutViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'leaderboard', LeaderboardViewSet)
router.register(r'workouts', WorkoutViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
