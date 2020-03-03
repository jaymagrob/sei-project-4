# pylint: disable=no-member

from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED

from .models import Board, Board_Comment
from .serializers import BoardSerializer, PopulatedBoardSerializer, CommentSerializer, UserSerializer, PopulatedCommentSerializer

class BoardListView(APIView): 

    def get(self, _request):
        boards = Board.objects.all() 
        serializer = PopulatedBoardSerializer(boards, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.user)
        if request.user.is_anonymous:
            return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)
        request.data['owner'] = request.user.pk
        board = BoardSerializer(data=request.data)      
        if board.is_valid():
            board.save()
            return Response(board.data, status=HTTP_201_CREATED)
        return Response(board.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class BoardDetailView(APIView): 

    def get(self, request, pk):
        try:
          board = Board.objects.get(pk=pk)
          if request.user != board.owner and request.user not in board.users.all():
              return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)          
          serializer = BoardSerializer(board)
          return Response(serializer.data)
        except Board.DoesNotExist:
            return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

        return Response(serializer.data)

    def put(self, request, pk):
        try:
          board = Board.objects.get(pk=pk)
          if request.user != board.owner and request.user not in board.users.all():
              return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)
          updated_board_comment = BoardSerializer(board, data=request.data)
          if updated_board_comment.is_valid():
              updated_board_comment.save()
              return Response(updated_board_comment.data, status=HTTP_202_ACCEPTED)
          return Response(updated_board_comment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except Board.DoesNotExist:
            return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            board = Board.objects.get(pk=pk)
            if request.user != board.owner and request.user not in board.users.all():
              return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)
            board.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except Board.DoesNotExist:
            return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


class CommentListView(APIView):

    def get(self, request, pk):
        try:
          board = Board.objects.get(pk=pk)
          if request.user != board.owner and request.user not in board.users.all():
              return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)          
          comments = Board_Comment.objects.filter(board=pk)
          serializer = PopulatedCommentSerializer(comments, many=True)
          return Response(serializer.data)
        except Board.DoesNotExist:
            return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

        return Response(serializer.data)


    def post(self, request, pk):
      try:
        board = Board.objects.get(pk=pk)
        request.data['board'] = pk
        request.data['owner'] = request.user.id
        comment = CommentSerializer(data=request.data)
        if request.user != board.owner and request.user not in board.users.all():
              return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)
        if comment.is_valid():
            comment.save()
            serialized_board = PopulatedBoardSerializer(board)
            return Response(serialized_board.data, status=HTTP_201_CREATED)
        return Response(comment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
      except Board.DoesNotExist:
            return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


class CommentDetailView(APIView):
    def put(self, request, pk, fk):
        try:
          board_comment = Board_Comment.objects.get(pk=fk)
          if request.user != board_comment.owner:
              return Response({'message': 'Unauthorized'}, status=HTTP_401_UNAUTHORIZED)
          updated_board_comment = CommentSerializer(board_comment, data=request.data)
          if updated_board_comment.is_valid():
              updated_board_comment.save()
              return Response(updated_board_comment.data, status=HTTP_202_ACCEPTED)
          return Response(updated_board_comment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except Board.DoesNotExist:
            return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
    
    
    def delete(self, request, pk, fk):
        try:
            board_comment = Board_Comment.objects.get(pk=fk)
            if board_comment.owner.id != request.user.id:
              return Response({'message': 'Unathorized'}, status=HTTP_401_UNAUTHORIZED)
            board_comment.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except Board_Comment.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
