from django.urls import path

app_name = "Web"
from django.urls import path

from .views import *

urlpatterns = [
   path('scripts/', ScriptListView.as_view(), name='script-list'),
   # path('scripts/<int:pk>/', ScriptDetailView.as_view(), name='script-detail'),
   path('scripts/execute/<int:pk>/', ScriptExecuteView.as_view(), name='script-execute'),
   path('script-execution/<int:pk>/', ScriptExecutionResultView.as_view(), name='script-execution-detail'),
   # path('script-execution/', ScriptExecutionResultView.as_view(), name='script-execution-detail'),

]
