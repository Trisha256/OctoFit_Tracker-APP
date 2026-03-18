from django.db import models
from bson import ObjectId


class OctoFitUser(models.Model):
    _id = models.CharField(max_length=24, primary_key=True, default='')
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    class Meta:
        db_table = 'users'

    def save(self, *args, **kwargs):
        if not self._id:
            self._id = str(ObjectId())
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username


class Team(models.Model):
    _id = models.CharField(max_length=24, primary_key=True, default='')
    name = models.CharField(max_length=200)
    members = models.ManyToManyField(OctoFitUser, related_name='teams', blank=True)

    class Meta:
        db_table = 'teams'

    def save(self, *args, **kwargs):
        if not self._id:
            self._id = str(ObjectId())
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Activity(models.Model):
    _id = models.CharField(max_length=24, primary_key=True, default='')
    user = models.ForeignKey(OctoFitUser, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=100)
    duration = models.FloatField(help_text='Duration in minutes')
    date = models.DateField()

    class Meta:
        db_table = 'activities'

    def save(self, *args, **kwargs):
        if not self._id:
            self._id = str(ObjectId())
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.activity_type}"


class Leaderboard(models.Model):
    _id = models.CharField(max_length=24, primary_key=True, default='')
    user = models.ForeignKey(OctoFitUser, on_delete=models.CASCADE, related_name='leaderboard_entries')
    score = models.IntegerField(default=0)

    class Meta:
        db_table = 'leaderboard'

    def save(self, *args, **kwargs):
        if not self._id:
            self._id = str(ObjectId())
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.score}"


class Workout(models.Model):
    _id = models.CharField(max_length=24, primary_key=True, default='')
    name = models.CharField(max_length=200)
    description = models.TextField()
    duration = models.FloatField(help_text='Duration in minutes')

    class Meta:
        db_table = 'workouts'

    def save(self, *args, **kwargs):
        if not self._id:
            self._id = str(ObjectId())
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
