from django.contrib import admin
from .models import *
from django.utils.html import format_html


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
    
    
    

class ScriptHistoryAdmin(admin.ModelAdmin):
    list_display = ('execution', 'colored_status', 'short_command', 'output_log_file_path', 'pid', 'updated_at')
    list_filter = ('status', 'updated_at')
    search_fields = ('execution__script__name', 'command', 'output_log_file_path')
    readonly_fields = ('execution', 'status', 'command', 'output_log_file_path', 'pid', 'updated_at')
    fieldsets = (
        ('Execution Details', {
            'fields': ('execution', 'status', 'command', 'output_log_file_path', 'pid')
        }),
        ('Timestamps', {
            'fields': ('updated_at',),
        }),
    )
    ordering = ['-updated_at']

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def colored_status(self, obj):
        color = {
            'running': 'green',
            'success': 'blue',
            'failed': 'red',
            'stop': 'gray',
        }.get(obj.status, 'black')  # Default to black if status not found

        # Use obj.status directly and capitalize it for display
        return format_html(
            '<span style="color: {}; font-size: 16px;">&#9679;</span>',
            color,
        )
    colored_status.short_description = 'Status'


    # Custom method to truncate the command to a single line
    def short_command(self, obj):
        return (obj.command[:30] + '...') if len(obj.command) > 30 else obj.command
    short_command.short_description = 'Command'

# Registering the ScriptHistory model with the custom admin class
admin.site.register(ScriptHistory, ScriptHistoryAdmin)