from django.urls import path
from .views import TaskListView, TaskDetailView, TaskCommentListView, TaskCommentDetailView

urlpatterns = [
    path('<int:fk>/task/', TaskListView.as_view()),
    path('<int:fk>/task/<int:pk>/', TaskDetailView.as_view()),   
    path('<int:fk>/task/<int:pk>/comment/', TaskCommentListView.as_view()),
    path('<int:fk>/task/<int:pk>/comment/<int:tk>/', TaskCommentDetailView.as_view()),    
]