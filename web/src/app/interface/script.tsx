export interface Script {
  id: number; // Assuming there is an ID field, which is common in Django models
  name: string; // 脚本名称
  description: string; // 脚本描述
  cmd: string; // 执行命令
  path: string; // 路径
  last_modified: string; // 最后修改时间（通常为 ISO 字符串）
  status: string;
}

export interface ExecutionDetail {
  pid: number;
  output: string;
  log_path: string;
}
