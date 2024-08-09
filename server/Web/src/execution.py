import os
import subprocess
import time
import psutil

import signal
from typing import Tuple

# __all__ = ['__all__']

DELAY_TIME = 0.5

# def set_nonblocking(fd):
#     flags = fcntl.fcntl(fd, fcntl.F_GETFL)
#     fcntl.fcntl(fd, fcntl.F_SETFL, flags | os.O_NONBLOCK)

def exe_by_macos(path: str, cmd: str, log_path: str, log_size: int = 5) -> Tuple[int, str]:
    # 使用一个临时文件来保存实际命令的PID
    pid_file = os.path.join(path, "pidfile.tmp")
    
    # 构建要执行的命令
    command = f'cd "{path}" && ( {cmd} > "{log_path}" 2>&1 & echo $! > "{pid_file}" ) && sleep 1 && truncate -s {log_size} "{log_path}"'
    
    # 启动命令
    subprocess.Popen(command, shell=True)
    
    # 等待命令启动并写入PID文件
    time.sleep(DELAY_TIME)
    
    # 读取PID文件以获取实际命令的PID
    with open(pid_file, "r") as file:
        pid = int(file.read().strip())
    
    # 删除临时PID文件
    os.remove(pid_file)
    
    return pid, command

def exe_by_windows(path: str, cmd: str, log_path: str, log_size: int = 5) -> Tuple[int, str]:
    
    
    # 使用一个临时文件来保存实际命令的PID
    pid_file = os.path.join(path, "pidfile.tmp")

    # 构建要执行的命令
    command = (
        f'cd /d "{path}" && '
        f'start /b cmd /c "{cmd} > "{log_path}" 2>&1 & echo !^! > "{pid_file}" && '
        f'powershell -command "Start-Sleep -Seconds 1; if ((Get-Item \'{log_path}\').length -gt {log_size}) '
        f'{{ (Get-Content \'{log_path}\' -Tail {log_size}) | Set-Content \'{log_path}\' }}"'
    )

    # 启动命令
    subprocess.Popen(command, shell=True)

    # 等待命令启动并写入PID文件
    time.sleep(DELAY_TIME)

    # 读取PID文件以获取实际命令的PID
    with open(pid_file, "r") as file:
        pid = int(file.read().strip())

    # 删除临时PID文件
    os.remove(pid_file)

    return pid, command

def terminate_by_macos(pid: int):
    """
    Terminate a process on macOS using the given PID.
    """
    try:
        # Use the 'kill' command to terminate the process
        command = f'kill {pid}'
        process = subprocess.Popen(command, shell=True)
        process.wait()  # Wait for the command to complete

        if process.returncode == 0:
            print(f"Process {pid} terminated successfully on macOS.")
        else:
            print(f"Failed to terminate process {pid} on macOS.")

    except Exception as e:
        print(f"An error occurred while terminating process {pid} on macOS: {e}")

def terminate_by_windows(pid: int):
    """
    Terminate a process on Windows using the given PID.
    """
    try:
        # Use the 'taskkill' command to terminate the process
        command = f'taskkill /PID {pid} /F'
        process = subprocess.Popen(command, shell=True)
        process.wait()  # Wait for the command to complete

        if process.returncode == 0:
            print(f"Process {pid} terminated successfully on Windows.")
        else:
            print(f"Failed to terminate process {pid} on Windows.")

    except Exception as e:
        print(f"An error occurred while terminating process {pid} on Windows: {e}")


def terminate_process(pid: int, log_path: str):
    """
    Terminate a process using the given PID and delete the associated log file.
    This function works on both Unix-like systems and Windows.
    """
    try:
        os.kill(pid, signal.SIGTERM)
        print(f"Process {pid} terminated successfully.")
        
        # 删除日志文件
        if os.path.exists(log_path):
            os.remove(log_path)
            print(f"Log file {log_path} deleted successfully.")
        else:
            print(f"Log file {log_path} does not exist.")
            
    except OSError as e:
        print(f"An error occurred while terminating process {pid}: {e}")
    except Exception as ex:
        print(f"An error occurred while deleting log file {log_path}: {ex}")

def get_log_by_pid(pid: int, log_path: str) -> dict:
    data = {"pid": pid, "log_path": log_path}
    try:
        # 检查进程是否存在
        if psutil.pid_exists(pid):
            process = psutil.Process(pid)
            if process.is_running():
                with open(log_path, 'r') as log_file:
                    data['output'] = log_file.read()
            else:
                data['output'] = f"Process with PID {pid} is not running."
        else:
            data['output'] = f"Process with PID {pid} does not exist."
    except FileNotFoundError:
        data['output'] = f"Log file at {log_path} not found."
    except Exception as e:
        data['output'] = str(e)

    return data