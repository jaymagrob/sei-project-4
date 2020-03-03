from django.db import models
from boards.models import Board
from django.contrib.auth import get_user_model
User = get_user_model()


# Create your models here.
    
class Task_Status(models.Model):
    status = models.CharField(max_length=500)
    
    def __str__(self):
      return f'{self.status}'
    
class Task(models.Model):
    task_name = models.CharField(max_length=50)
    task_description = models.CharField(max_length=500, null=True)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    group = models.CharField(max_length=50, null=True)
    status = models.ForeignKey(Task_Status, related_name='task', on_delete=models.SET_NULL, null=True)
    board = models.ForeignKey(Board, related_name='board_task', null=False, on_delete=models.CASCADE, default=1)  
    owner = models.ForeignKey(User, related_name='task_owned', null=False, on_delete=models.CASCADE, default=1)
    users = models.ManyToManyField(User, related_name='task_assigned', blank=True)


    def __str__(self):
      return f'Task: {self.task_name}'
    

class Task_History(models.Model):
    task_detail = models.CharField(max_length=500)
    task_timeStamp = models.DateTimeField(auto_now_add=True)
    task = models.ForeignKey(Task, related_name='task_history', null=True, on_delete=models.CASCADE, default=1)      
    
    def __str__(self):
      return f'Task History: {self.task_detail}'

class Task_Comment(models.Model):
    comment = models.CharField(max_length=500)
    task = models.ForeignKey(Task, related_name='task_comment', null=True, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, related_name='task_comment', null=False, on_delete=models.CASCADE, default=1)  

    def __str__(self):
      return f'Task Commment: {self.pk}'