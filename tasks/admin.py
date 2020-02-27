from django.contrib import admin
from .models import Task, Task_Comment, Task_History, Task_Status
# Register your models here.

admin.site.register(Task)
admin.site.register(Task_Comment)
admin.site.register(Task_History)
admin.site.register(Task_Status)
