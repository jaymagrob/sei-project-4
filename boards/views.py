# pylint: disable=no-member

from rest_framework.views import APIView 
from rest_framework.response import Response 

from .models import Board
from .serializers import BoardSerializer

class BoardListView(APIView): 

    def get(self, _request):
        boards = Board.objects.all() 
        serializer = BoardSerializer(boards, many=True)

        return Response(serializer.data) 

class BoardDetailView(APIView): 

    def get(self, _request, pk):
        board = Board.objects.get(pk=pk) 
        serializer = BoardSerializer(board)

        return Response(serializer.data) 