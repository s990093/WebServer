import os
import subprocess
import time
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import psutil
import platform
import fcntl
import signal


def set_nonblocking(fd):
    flags = fcntl.fcntl(fd, fcntl.F_GETFL)
    fcntl.fcntl(fd, fcntl.F_SETFL, flags | os.O_NONBLOCK)

class ScriptListView(APIView):
    def get(self, request):
        scripts = Script.objects.all()
        serializer = ScriptSerializer(scripts, many=True)
        return Response(serializer.data)

class ScriptDetailView(APIView):
    def get(self, request, pk):
        script = get_object_or_404(Script, pk=pk)
        serializer = ScriptSerializer(script)
        return Response(serializer.data)
    
class ScriptExecuteView(APIView):
    def post(self, request, pk):
        script = get_object_or_404(Script, pk=pk)
        cmd = script.cmd
        path = script.path
        
        output_log_file = f'{path}/{script.name}.log'  # 设置输出文件路径
        # Create the output file if it doesn't already exist
        with open(output_log_file, 'a'):
            os.utime(output_log_file, None)  # 
        try:
            # 根據操作系統執行命令
            if platform.system() == 'Darwin':  # macOS
                # command = [
                #     "nohup", 
                #     "bash", 
                #     "-c", 
                #     f'cd \\"{path}\\ && {cmd}" > "{output_log_file}" 2>&1 &'            
                # ]   
                command = f'cd "{path}" && nohup {cmd} > "{output_log_file}" 2>&1 &'


                # process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                process = subprocess.Popen(command, shell=True)  # 直接在后台运行

            elif platform.system() == 'Windows':  # Windows
                # 確保 cmd 被正確格式化
                command = f'cmd /c "cd /d {path} && {cmd}"'
                # 將 cmd 轉義
                command = command.replace('"', '\\"')
                subprocess.Popen(['start', 'cmd', '/c', command], shell=True)

            else:  # 其他操作系統
                return Response({'error': 'Unsupported OS'}, status=status.HTTP_400_BAD_REQUEST)
            
            script.status = "running"
            script.save()
            # # 創建 ScriptExecution 實例，狀態設為 running
            script_execution = ScriptExecution.objects.create(
                script=script,
                pid = process.pid,
                command = command,
                output_log_file_path = output_log_file,
                status = "running",
            )

            return Response({
                'status': 'script running in background',
                'message': 'Script started successfully.'
            }, status=status.HTTP_202_ACCEPTED)

        except Exception as e:
            print(e)
            return Response({
                'error': 'An error occurred while starting the script.',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            
# class ScriptExecutionListView(APIView):
#     def get(self, request):
#         # 獲取所有 ScriptExecution 實例
#         objs = ScriptExecution.objects.all()
        
#         s = ScriptExecutionSerializer(objs, many=True)

#         return Response(s.data, status=status.HTTP_200_OK)

    
class ScriptExecutionResultView(APIView):
    def get(self, request, pk):
        s = get_object_or_404(Script, pk=pk)
        
        # 获取最新的 ScriptExecution 实例
        script_execution = ScriptExecution.objects.filter(script=s).order_by('-created_at').first()
        # 获取 ScriptExecution 实例
        # script_execution = get_object_or_404(ScriptExecution, pk=pk)
        
        data = {}

        # 检查是否有 PID
        # process = psutil.Process(script_execution.pid)
        # if  process.is_running():
        #     data['pid'] = script_execution.pid
        #     data['output'] = self.get_current_stdout(script_execution.pid)
        # else:
        data['pid'] = script_execution.pid
        data['output_log_file_path'] = script_execution.output_log_file_path
        try:
            with open(script_execution.output_log_file_path, 'r') as log_file:
                data['output'] = log_file.read()
        except FileNotFoundError:
            data['output'] = 'Log file not found.'
        except IOError:
            data['output'] = 'Error reading log file.'
    
        return Response(data, status=status.HTTP_200_OK)
    
    # def get_current_stdout(self, pid):
    #     """
    #     获取正在运行的进程的标准输出。
    #     """
    #     try:
    #         output = ''
    #         # 实时获取标准输出
    #         while True:
    #             # 从标准输出读取一行
    #             line = process.stdout.readline()
    #             if not line:  # 如果没有更多输出
    #                 break
    #             output += line
    #             # print(line, end='')  # 实时打印输出
    #         return output
    #     except Exception as e:
    #         return str(e)

        
    def delete(self, request, pk):
        # 獲取 ScriptExecution 實例
        script_execution = get_object_or_404(ScriptExecution, pk=pk)

        # 嘗試終止進程
        try:
            pid = script_execution.pid  # 確保 pid 在模型中存在
            os.kill(pid, signal.SIGTERM)  # 終止進程

            # 更新狀態為 'failed' 或其他所需狀態
            script_execution.status = 'stop'
            script_execution.save()
            output_log_file_path = script_execution.output_log_file_path  
            if os.path.exists(output_log_file_path):
                os.remove(output_log_file_path)  # 刪除文件

            return Response({'message': 'Process terminated successfully.'}, status=status.HTTP_200_OK)
        except ProcessLookupError:
            return Response({'error': 'Process not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        