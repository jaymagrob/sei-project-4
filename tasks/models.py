from django.db import models

# Create your models here.
class Task(models.Model):
    task_name = models.CharField(max_length=50)
    task_description = models.CharField(max_length=500)
    start_date = models.DateField()
    end_date = models.DateField()
    group = models.CharField(max_length=50)
    
    def __str__(self):
      return f'Task: {self.task_name}'
    
    #Project fk
    #Status fk - Task_Status.Status  
    #Task_Creater fk - User.Task_Created
    #Task_Assigned fk - User.Task_Assigned
    #Task_Comments fk -< Task_Comments.Task
    #History fk -< Task_History.Task

class Task_History(models.Model):
    task_detail = models.CharField(max_length=500)
    task_timeStamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
      return f'Task History: {self.task_detail}'
    
class Task_Status(models.Model):
    status = models.CharField(max_length=500)
    
    def __str__(self):
      return f'Task History: {self.status}'
    
class Task_Comment(models.Model):
    comment = models.CharField(max_length=500)

    def __str__(self):
      return f'Task History: {self.pk}'