# pylint: disable=no-member

from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from boards.models import Board
from .models import Task, Task_Comment, Task_History, Task_Status
from .serializers import TaskSerializer, CommentTaskSerializer, PopulatedTaskSerializer

class TaskListView(APIView):
  def post(self, request, fk):
    # fk = foreign key - the id of the board that's attached
    try:
      board = Board.objects.get(pk=fk)
      print(board.users)
      if request.user != board.owner and request.user not in board.users.all():
          return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)          
      request.data['owner'] = request.user.pk
      request.data['board'] = board.pk
      serializer = TaskSerializer(data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)
      return Response(serializer.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
    except Board.DoesNotExist:
        return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

class TaskDetailView(APIView):
  def put(self, request, pk, fk):
    # fk = foreign key - the id of the board that's attached
    # pk = primary key - the id of the task that's attached
    try:
      task = Task.objects.get(pk=pk)
      board = Board.objects.get(pk=fk)
      if request.user != board.owner and request.user not in board.users.all():
          return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)
      updated_taks = TaskSerializer(task, data=request.data)
      if updated_taks.is_valid():
          updated_taks.save()
          return Response(updated_taks.data, status=HTTP_202_ACCEPTED)
      return Response(updated_taks.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
    except Task.DoesNotExist:
      return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


  def delete(self, request, pk, fk):
    # fk = foreign key - the id of the board that's attached
    # pk = primary key - the id of the task that's attached
    try:
      task = Task.objects.get(pk=pk)
      board = Board.objects.get(pk=fk)
      if request.user != board.owner and request.user not in board.users.all():
          return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)
      task.delete()
      return Response(status=HTTP_204_NO_CONTENT)
    except Task.DoesNotExist:
      return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

class TaskCommentListView(APIView):
  def post(self, request, pk, fk):
    # fk = foreign key - the id of the board that's attached
    # pk = primary key - the id of the task that's attached

    try:
        board = Board.objects.get(pk=fk)
        request.data['task'] = pk
        request.data['owner'] = request.user.id
        comment = CommentTaskSerializer(data=request.data)
        if request.user != board.owner and request.user not in board.users.all():
              return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)
        if comment.is_valid():
            # print(comment)
            comment.save()
            task2 = Task.objects.get(pk=pk)
            # print(task2)
            serialized_task = PopulatedTaskSerializer(task2)
            # print(serialized_task)

            return Response(serialized_task.data, status=HTTP_201_CREATED)
        return Response(comment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
    except Task.DoesNotExist:
        return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
    except Board.DoesNotExist:
        return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


class TaskCommentDetailView(APIView):
    def put(self, request, pk, fk, tk):
      # fk = foreign key - the id of the board that's attached
      # pk = primary key - the id of the task that's attached
      # tk = task comment key
    
        try:
          task_comment = Task_Comment.objects.get(pk=tk)
          if request.user != task_comment.owner:
            return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)
          updated_task_comment = CommentTaskSerializer(task_comment, data=request.data)
          if updated_task_comment.is_valid():
            updated_task_comment.save()
            return Response(updated_task_comment.data, status=HTTP_202_ACCEPTED)
          return Response(updated_task_comment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except Task_Comment.DoesNotExist:
            return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
    
    
    def delete(self, request, pk, fk, tk):
        try:
            task_comment = Task_Comment.objects.get(pk=tk)
            if task_comment.owner.id != request.user.id:
              return Response({'message': 'Unathorized'}, status=HTTP_401_UNAUTHORIZED)
            task_comment.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except Task_Comment.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

