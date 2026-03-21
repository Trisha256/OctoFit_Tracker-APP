from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, LeaderboardEntry, Workout
import datetime


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        Workout.objects.all().delete()

        # Create users (superheroes)
        users = [
            User(name='Tony Stark', email='tony@avengers.com', password='ironman123'),
            User(name='Steve Rogers', email='steve@avengers.com', password='cap123'),
            User(name='Natasha Romanoff', email='natasha@avengers.com', password='widow123'),
            User(name='Bruce Wayne', email='bruce@dc.com', password='batman123'),
            User(name='Clark Kent', email='clark@dc.com', password='superman123'),
            User(name='Diana Prince', email='diana@dc.com', password='wonder123'),
        ]
        for user in users:
            user.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(users)} users'))

        # Create teams
        marvel_members = [u.email for u in users[:3]]
        dc_members = [u.email for u in users[3:]]

        teams = [
            Team(name='Team Marvel', members=marvel_members),
            Team(name='Team DC', members=dc_members),
        ]
        for team in teams:
            team.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(teams)} teams'))

        # Create activities
        activities = [
            Activity(user='tony@avengers.com', activity_type='Running', duration=30.0, date=datetime.date(2024, 1, 10)),
            Activity(user='tony@avengers.com', activity_type='Cycling', duration=45.0, date=datetime.date(2024, 1, 11)),
            Activity(user='steve@avengers.com', activity_type='Swimming', duration=60.0, date=datetime.date(2024, 1, 10)),
            Activity(user='natasha@avengers.com', activity_type='Yoga', duration=50.0, date=datetime.date(2024, 1, 12)),
            Activity(user='bruce@dc.com', activity_type='Running', duration=40.0, date=datetime.date(2024, 1, 10)),
            Activity(user='clark@dc.com', activity_type='Weight Training', duration=75.0, date=datetime.date(2024, 1, 11)),
            Activity(user='diana@dc.com', activity_type='Cycling', duration=55.0, date=datetime.date(2024, 1, 12)),
        ]
        for activity in activities:
            activity.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(activities)} activities'))

        # Create leaderboard
        leaderboard = [
            LeaderboardEntry(user='tony@avengers.com', score=150),
            LeaderboardEntry(user='steve@avengers.com', score=200),
            LeaderboardEntry(user='natasha@avengers.com', score=175),
            LeaderboardEntry(user='bruce@dc.com', score=160),
            LeaderboardEntry(user='clark@dc.com', score=220),
            LeaderboardEntry(user='diana@dc.com', score=195),
        ]
        for entry in leaderboard:
            entry.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard)} leaderboard entries'))

        # Create workouts
        workouts = [
            Workout(name='Morning Run', description='A 30-minute morning run to start the day.', duration=30.0),
            Workout(name='Strength Training', description='Full body strength workout with weights.', duration=60.0),
            Workout(name='Yoga Flow', description='Relaxing yoga session for flexibility and mindfulness.', duration=45.0),
            Workout(name='HIIT Blast', description='High intensity interval training for maximum burn.', duration=25.0),
            Workout(name='Cycling Circuit', description='Indoor cycling circuit for cardio endurance.', duration=50.0),
        ]
        for workout in workouts:
            workout.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workouts'))

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
