from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Board(models.Model):
    board_name = models.CharField(max_length=50)
    description = models.CharField(max_length=500, null=True)
    image = models.CharField(max_length=350, null=True)
    budget = models.DecimalField(decimal_places=2, max_digits=20, null=True)
    owner = models.ForeignKey(User, related_name='board_owned', null=False, on_delete=models.CASCADE, default=1)
    users = models.ManyToManyField(User, related_name='boards_assigned', blank=True)
    
    def __str__(self):
      return f'Board: {self.board_name}'

class Board_Comment(models.Model):
    comment = models.CharField(max_length=500)
    board = models.ForeignKey(Board, related_name='board_comment', null=False, on_delete=models.CASCADE, default=1)  
    owner = models.ForeignKey(User, related_name='board_comment', null=False, on_delete=models.CASCADE, default=1)  