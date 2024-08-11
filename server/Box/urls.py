from django.urls import path
from .views import PitchDetailView

app_name = 'Box'  # 添加这一行

urlpatterns = [
    path('pitches/', PitchDetailView.as_view()),       # For GET and POST
    path('pitches/<int:pk>/', PitchDetailView.as_view()),  # For GET by ID and DELETE
]
