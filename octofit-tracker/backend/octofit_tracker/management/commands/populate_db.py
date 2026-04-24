from datetime import date

from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout


class Command(BaseCommand):
    help = "Populate the octofit_db database with test data"

    def handle(self, *args, **options):
        # Clear existing seed data in dependency-safe order.
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        Team.objects.create(
            name="Team Marvel",
            description="Earth's mightiest heroes training squad.",
        )
        Team.objects.create(
            name="Team DC",
            description="Justice League inspired training squad.",
        )

        users = [
            User.objects.create(name="Tony Stark", email="tony@marvel.com", team="Team Marvel"),
            User.objects.create(name="Steve Rogers", email="steve@marvel.com", team="Team Marvel"),
            User.objects.create(name="Bruce Wayne", email="bruce@dc.com", team="Team DC"),
            User.objects.create(name="Diana Prince", email="diana@dc.com", team="Team DC"),
        ]

        Workout.objects.bulk_create(
            [
                Workout(
                    name="Hero Strength Circuit",
                    description="Push, pull, squat, and core intervals.",
                    difficulty="Medium",
                ),
                Workout(
                    name="Speed and Agility",
                    description="Sprint repeats with plyometric drills.",
                    difficulty="Hard",
                ),
                Workout(
                    name="Recovery Mobility",
                    description="Low-impact mobility and flexibility routine.",
                    difficulty="Easy",
                ),
            ]
        )

        Activity.objects.bulk_create(
            [
                Activity(user=users[0], type="Running", duration=35, date=date(2026, 4, 20)),
                Activity(user=users[1], type="Cycling", duration=45, date=date(2026, 4, 21)),
                Activity(user=users[2], type="Strength", duration=50, date=date(2026, 4, 22)),
                Activity(user=users[3], type="Yoga", duration=40, date=date(2026, 4, 23)),
            ]
        )

        Leaderboard.objects.bulk_create(
            [
                Leaderboard(user=users[2], score=980, rank=1),
                Leaderboard(user=users[0], score=950, rank=2),
                Leaderboard(user=users[3], score=920, rank=3),
                Leaderboard(user=users[1], score=900, rank=4),
            ]
        )

        self.stdout.write(self.style.SUCCESS("Successfully populated octofit_db test data."))
