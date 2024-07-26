export interface Script {
  id: number;
  name: string;
  description: string;
  cmd: string; // 新增的字段
  path: string; // 新增的字段
  status: string;
  last_modified: string; // 日期字符串
}

export interface ExecutionDetail {
  output_log_file_path: string;
  output: string;
  pid: number;
}
