from rest_framework import serializers
from .models import Task, Task_Comment, Task_History, Task_Status
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id','username','email', 'name','company','title','first_name','last_name','profile_image','bio','company','title')

class StatusSerializer(serializers.ModelSerializer):

  class Meta:
    model = Task_Status
    fields = '__all__'

class TaskHistorySerializer(serializers.ModelSerializer):

  class Meta:
    model = Task_History
    fields = '__all__'
    

class UserShortSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id','username','name','first_name','last_name','profile_image')

class TaskSerializer(serializers.ModelSerializer):
    task_comment = ''
    class Meta:
        model = Task
        fields = '__all__'


class CommentTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task_Comment
        fields = '__all__'


class PopulatedCommentSerializer(CommentTaskSerializer):
    owner = UserShortSerializer()  


class PopulatedTaskSerializer(TaskSerializer):
    owner = UserSerializer(many=False)
    users = UserSerializer(many=True)
    status = StatusSerializer()
    task_comment = CommentTaskSerializer(many=True)

    