from django.db import models


class OctoFitUser(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username


class Team(models.Model):
    name = models.CharField(max_length=200)
    members = models.ManyToManyField(OctoFitUser, related_name='teams', blank=True)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name


class Activity(models.Model):
    user = models.ForeignKey(OctoFitUser, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=100)
    duration = models.FloatField(help_text='Duration in minutes')
    date = models.DateField()

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.user.username} - {self.activity_type}"


class Leaderboard(models.Model):
    user = models.ForeignKey(OctoFitUser, on_delete=models.CASCADE, related_name='leaderboard_entries')
    score = models.IntegerField(default=0)

    class Meta:
        db_table = 'leaderboard'

    def __str__(self):
        return f"{self.user.username} - {self.score}"


class Workout(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    duration = models.FloatField(help_text='Duration in minutes')

    class Meta:
        db_table = 'workouts'

    def __str__(self):
        return self.name
from django.contrib.auth.hashers import make_password

class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    duration = models.IntegerField(help_text='Duration in minutes')
    date = models.DateField()
    
    class Meta:
        app_label = 'octofit_tracker'

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    members = models.ManyToManyField(User, blank=True)
    
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    rank = models.IntegerField(default=0)
    
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    workout_type = models.CharField(max_length=50)
    duration = models.IntegerField(help_text='Suggested duration in minutes')
    difficulty = models.CharField(max_length=20, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ])
    
    class Meta:
        app_label = 'octofit_tracker'
