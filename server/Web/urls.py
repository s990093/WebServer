from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

app_name = "Web"

# 创建路由器并注册视图集
router = DefaultRouter()
router.register(r'scripts', ScriptViewSet, basename='script')

# Registering custom routes separately
# execution_list = ScriptExecutionViewSet.as_view({
#     'post': 'execute'
# })

# log_detail = ScriptCommandViewSet.as_view({
#     'get': 'log'
# })

urlpatterns = [
    path('', include(router.urls)),  # 包含路由器的 URL
    # path('scripts/<int:pk>/execute/', execution_list, name='script-execute'),  # Custom execute endpoint
    # path('scripts/<int:pk>/log/', log_detail, name='script-log'),  # Custom log endpoint
]

# custom_urls = [
#     path('scripts/<int:pk>/execute/', ScriptViewSet.as_view({'post': 'execute'}), name='script-execute'),
#     path('scripts/<int:pk>/stop/', ScriptViewSet.as_view({'post': 'stop'}), name='script-stop'),
# ]

# urlpatterns += custom_urls
