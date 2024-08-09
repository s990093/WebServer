from django.contrib import admin
from .models import *

@admin.register(Script)
class ScriptAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'last_modified')
    search_fields = ('name', 'description')
    readonly_fields = ('last_modified',)

    def save_model(self, request, obj, form, change):
        obj.save()

    def get_queryset(self, request):
        return super().get_queryset(request).order_by('name')

@admin.register(ScriptExecution)
class ScriptExecutionAdmin(admin.ModelAdmin):
    # list_display = ('script', 'pid', 'status', 'created_at')  # 顯示的字段
    # search_fields = ('script__name', 'pid', 'status')  # 可搜索的字段
    # list_filter = ('status',)  # 篩選的字段
    pass


@admin.register(ScriptCommand)
class ScriptExecutionAdmin(admin.ModelAdmin):
    pass
    
    
    
