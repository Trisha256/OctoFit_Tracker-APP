from rest_framework import serializers
from .models import User, Activity, Team, Leaderboard, Workout

class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    def get_id(self, obj):
        return str(obj.pk)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    def get_id(self, obj):
        return str(obj.pk)
    
    class Meta:
        model = Activity
        fields = ['id', 'user', 'activity_type', 'duration', 'date']

class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    members = UserSerializer(many=True, read_only=True)
    
    def get_id(self, obj):
        return str(obj.pk)
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'members']

class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)
    
    def get_id(self, obj):
        return str(obj.pk)
    
    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'score', 'rank']

class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    def get_id(self, obj):
        return str(obj.pk)
    
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'workout_type', 'duration', 'difficulty']
