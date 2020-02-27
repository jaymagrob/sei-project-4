from django.db import models

# Create your models here.
class Board(models.Model):
    board_name = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    image = models.CharField(max_length=350)
    budget = models.DecimalField(decimal_places=2, max_digits=20)
    # OwnerID fk -< User.Project_Owners
    # Users fk >-< User.Project_Users
    # Tasks fk -< Tasks.Project
    # Comments fk -< Project_Comments.Project_Id

    def __str__(self):
      return f'Board: {self.board_name}'
      