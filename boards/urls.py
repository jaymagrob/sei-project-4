from django.urls import path
from .views import BoardDetailView, BoardListView, CommentListView, CommentDetailView

urlpatterns = [
    path('', BoardListView.as_view()),
    path('<int:pk>/', BoardDetailView.as_view()),
    path('<int:pk>/comment/', CommentListView.as_view()),
    path('<int:pk>/comment/<int:fk>/', CommentDetailView.as_view()),
]