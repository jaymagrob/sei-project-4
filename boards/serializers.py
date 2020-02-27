from rest_framework import serializers
from .models import Board, Board_Comment
from tasks.models import Task
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id','username','email', 'name','company','title','first_name','last_name','profile_image','bio','company','title')

class UserShortSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id','username','name','first_name','last_name','profile_image')

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board_Comment
        fields = '__all__'

class BoardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Board
        fields = '__all__'

class PopulatedCommentSerializer(CommentSerializer):
    owner = UserShortSerializer()  

class PopulatedBoardSerializer(BoardSerializer):
    owner = UserSerializer(many=False)
    users = UserSerializer(many=True)
    board_comment = PopulatedCommentSerializer(many=True)
