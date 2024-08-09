import platform
import os
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Script, ScriptExecution
from .serializers import ScriptSerializer

from .src.execution import *

class ScriptViewSet(viewsets.ModelViewSet):
    queryset = Script.objects.all()
    serializer_class = ScriptSerializer

    @action(detail=True, methods=['post'])
    def execute(self, request, pk=None):
        try:
            script = self.get_object()
            log_path = os.path.join(script.path, f"{script.id}.log")
            
            if platform.system() == "Windows":
                pid, command = exe_by_windows(script.path, script.cmd, log_path)
            elif platform.system() == "Darwin":  # "Darwin" is the identifier for macOS
                pid, command = exe_by_macos(script.path, script.cmd, log_path)
            else:
                raise ValueError("Unsupported operating system")
            
            execution = ScriptExecution.objects.create(
                script=script,
                output_log_file_path=log_path,
                command=command,
                pid=pid,
                status='running'
            )
            script.pid = pid
            script.status = 'running'
            script.save()
        
            return Response({'status': 'script executed', 'result': script.name}, status=status.HTTP_200_OK)
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
                script.status = 'stopped'
                script.save()
                exe.delete()  # 删除 ScriptExecution 对象
                return Response({"detail": "Script stopped and execution record deleted successfully."}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Script is not running."}, status=status.HTTP_400_BAD_REQUEST)
        except Script.DoesNotExist:
            return Response({"detail": "Script not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
    @action(detail=True, methods=['get'])
    def log(self, request, pk=None):
        try:
            script = self.get_object()
            script_execution = ScriptExecution.objects.get(script = script)
            log_data = get_log_by_pid(script_execution.pid, script_execution.output_log_file_path)  # 调用获取日志的函数
            return Response(log_data, status=status.HTTP_200_OK)
        except ScriptExecution.DoesNotExist:
            return Response({"detail": "ScriptExecution not found."}, status=status.HTTP_404_NOT_FOUND)


        
