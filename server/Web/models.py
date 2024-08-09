from django.db import models

class Script(models.Model):
    STATUS_CHOICES = [
        ('stop', 'Stop'),
        ('running', 'Running'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    cmd = models.CharField(max_length=100)
    path = models.CharField(max_length=200)
    last_modified = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='stop'
    )

    def __str__(self):
        return self.name


class ScriptExecution(models.Model):
    STATUS_CHOICES = [
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('running', 'Running'),
        ('stop', 'Stop')
    ]

    script = models.OneToOneField(Script, on_delete=models.CASCADE)
    output_log_file_path = models.CharField(max_length=255)
    command = models.CharField(max_length=300)
    pid = models.IntegerField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='failed'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.script.name} - {self.status} at {self.created_at}"


class ScriptCommand(models.Model):
    execution = models.ForeignKey(ScriptExecution, on_delete=models.CASCADE)
    command = models.CharField(max_length=300)
    executed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.execution.script.name} - {self.command} at {self.executed_at}"
