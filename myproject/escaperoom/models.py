from django.db import models

# Create your models here.
class UserScore(models.Model):
    username = models.CharField(max_length=100)
    score = models.IntegerField(default=0)
    time_taken = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.score} - {self.time_taken} - {self.date}"
