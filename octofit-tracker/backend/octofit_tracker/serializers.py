from rest_framework import serializers
from .models import OctoFitUser, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = OctoFitUser
        fields = ['id', 'username', 'email', 'password']

    def get_id(self, obj):
        return str(obj._id)


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'members']

    def get_id(self, obj):
        return str(obj._id)


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)
    user_id = serializers.CharField(write_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_id', 'activity_type', 'duration', 'date']

    def get_id(self, obj):
        return str(obj._id)

    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        user = OctoFitUser.objects.get(_id=user_id)
        return Activity.objects.create(user=user, **validated_data)


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'score']

    def get_id(self, obj):
        return str(obj._id)


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'duration']

    def get_id(self, obj):
        return str(obj._id)
