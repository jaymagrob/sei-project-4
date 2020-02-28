from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .serializers import UserSerializer, PopulateUserAndBoardsSerializer, PopulateUserSerializer, EditUserSerializer, SearchUserSerializer
User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=422)

class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})

class ProfileView(APIView):
    def get(self, request):
      user = request.user
      serializer = PopulateUserAndBoardsSerializer(user)

      return Response(serializer.data)

    def put(self, request):
      try:
        user = request.user
        updated_user = EditUserSerializer(user, data=request.data)
        if updated_user.is_valid():
          updated_user.save()
          return Response(updated_user.data, status=HTTP_202_ACCEPTED)
        return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
      except User.DoesNotExist:
            return  Response({'message': 'UNAUTHORIZED'}, status=HTTP_401_UNAUTHORIZED)
    
    def delete(self, request):
      try:
        user_find = request.user
        user = User.objects.get(pk=user_find.pk)
        user.delete()
        return Response(status=HTTP_204_NO_CONTENT)
      except User.DoesNotExist:
        return  Response({'message': 'UNAUTHORIZED'}, status=HTTP_401_UNAUTHORIZED)

class UserView(APIView):
    def get(self, request):
      users = User.objects.all()
      serialized_user = SearchUserSerializer(users, many=True)

      return Response(serialized_user.data)
