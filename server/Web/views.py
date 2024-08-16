import platform
import os
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rich.console import Console
from rich.panel import Panel
from .models import Script, ScriptExecution, ScriptHistory
from .serializers import ScriptSerializer

from .src.execution import *

console = Console()

class ScriptViewSet(viewsets.ModelViewSet):
    queryset = Script.objects.all()
    serializer_class = ScriptSerializer

    @action(detail=True, methods=['post'])
    def execute(self, request, pk=None):
        try:
            script = self.get_object()
            log_path = os.path.join(script.path, f"{script.id}.log")
            
            if platform.system() == "Windows":
                command = exe_by_windows(script.path, script.cmd, log_path)
                with open(log_path, "r") as file:
                    pid = int(file.read().strip())
            elif platform.system() == "Darwin":
                pid, command = exe_by_macos(script.path, script.cmd, log_path)
            elif platform.system() == "Linux":
                pid, command = exe_by_linux(script.path, script.cmd, log_path)
            else:
                raise ValueError("Unsupported operating system")
            
            execution = ScriptExecution.objects.create(
                script=script,
                output_log_file_path=log_path,
                command=command,
                pid=pid,
                status='running'
            )
            script.status = 'running'
            script.save()

            # Record the execution in history
            ScriptHistory.objects.create(
                execution=execution,
                status='running',
                command=command,
                output_log_file_path=log_path,
                pid=pid
            )

            panel = Panel(f"[bold green]Script '{script.name}' executed successfully![/bold green]",
                          title="Execution Result", expand=False)
            console.print(panel)

            return Response({'status': 'script executed'}, status=status.HTTP_200_OK)
        
        except Script.DoesNotExist:
            return Response({'error': 'Script not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @action(detail=True, methods=['post'])
    def stop(self, request, pk=None):
        try:
            script = self.get_object()
            exe = ScriptExecution.objects.get(script=script)
            if exe.pid:
                terminate_process(exe.pid, exe.output_log_file_path)
                script.status = 'stop'
                script.save()

                # Record the stop in history
                ScriptHistory.objects.create(
                    execution=exe,
                    status='stop',
                    command=exe.command,
                    output_log_file_path=exe.output_log_file_path,
                    pid=exe.pid
                )

                exe.delete()
                
                panel = Panel(f"[bold red]Script '{script.name}' stopped successfully![/bold red]",
                              title="Stop Script", expand=False)
                console.print(panel)
                return Response({"detail": "Script stopped successfully."}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Script is not running."}, status=status.HTTP_400_BAD_REQUEST)
        except Script.DoesNotExist:
            return Response({"detail": "Script not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['get'])
    def log(self, request, pk=None):
        try:
            script = self.get_object()
            script_execution = ScriptExecution.objects.get(script=script)
            log_data = get_log_by_pid(script_execution.pid, script_execution.output_log_file_path)
            
            # Record the log retrieval in history
            ScriptHistory.objects.create(
                execution=script_execution,
                status=script_execution.status,
                command=script_execution.command,
                output_log_file_path=script_execution.output_log_file_path,
                pid=script_execution.pid
            )
            
            return Response(log_data, status=status.HTTP_200_OK)
        except ScriptExecution.DoesNotExist:
            return Response({"detail": "ScriptExecution not found."}, status=status.HTTP_404_NOT_FOUND)
