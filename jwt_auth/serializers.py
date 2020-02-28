from rest_framework import serializers
from boards.models import Board
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
User = get_user_model()

class BoardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Board
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = '__all__'


class EditUserSerializer(serializers.ModelSerializer):
    class Meta:
      model = User
      fields = ('id','username', 'first_name', 'last_name', 'email', 'name','profile_image','bio','company','title')

class SearchUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'first_name', 'last_name', 'email', 'name','profile_image')
        

class PopulateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','board_owned','boards_assigned','username', 'first_name', 'last_name', 'email', 'name','profile_image','bio','company','title')
        
class PopulateUserAndBoardsSerializer(PopulateUserSerializer):
        board_owned = BoardSerializer(many=True)
        boards_assigned = BoardSerializer(many=True)