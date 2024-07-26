from django.db import models

class Script(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    cmd = models.CharField(max_length=100)
    path = models.CharField(max_length=200)
    last_modified = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=[
        ('stop', 'Stop'),   # 執行中
        ('running', 'Running'),   # 執行中
        ('completed', 'Completed'), # 已完成
        ('failed', 'Failed'),      # 失敗
    ], default='stop')  # 默認狀態為 running

    def __str__(self):
        return self.name


class ScriptExecution(models.Model):
    script = models.ForeignKey(Script, on_delete=models.CASCADE)  # Associate with Script
    output_log_file_path = models.CharField(max_length=255)  # Field for the output log file path
    command = models.CharField(max_length=300)
    pid = models.IntegerField(null=True, blank=True)  # Field for the process ID (PID)
    status = models.CharField(
    max_length=20,
    choices=[
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('running', 'Runnisng')  # 新增的狀態
        ('stop', 'Stop')  # 新增的狀態
    ],
    default='failed'  # 默認值可以根據需要更改
)
    created_at = models.DateTimeField(auto_now_add=True)  # Creation time
    
    def __str__(self):
        return self.script.name

