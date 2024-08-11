import os from "os";

export const PerformanceData = async () => {
  const performanceData = {
    cpuModel: os.cpus()[0].model,
    cpuCores: os.cpus().length,
    totalMemory: os.totalmem() / 1024 / 1024 / 1024, // GB
    freeMemory: os.freemem() / 1024 / 1024 / 1024, // GB
    osType: os.type(),
    loadAvg: os.loadavg(),
    uptime: os.uptime(),
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        電腦效能資訊
      </h1>
      <div className="space-y-4">
        <p className="text-lg">
          <strong className="text-gray-900">CPU 型號:</strong>
          {performanceData.cpuModel}
        </p>
        <p className="text-lg">
          <strong className="text-gray-900">CPU 核心數:</strong>{" "}
          {performanceData.cpuCores}
        </p>
        <p className="text-lg">
          <strong className="text-gray-900">總內存:</strong>{" "}
          {performanceData.totalMemory.toFixed(2)} GB
        </p>
        <p className="text-lg">
          <strong className="text-gray-900">可用內存:</strong>{" "}
          {performanceData.freeMemory.toFixed(2)} GB
        </p>
        <p className="text-lg">
          <strong className="text-gray-900">操作系統:</strong>{" "}
          {performanceData.osType}
        </p>
        <p className="text-lg">
          <strong className="text-gray-900">載入平均值:</strong>{" "}
          {performanceData.loadAvg.join(", ")}
        </p>
        <p className="text-lg">
          <strong className="text-gray-900">系統運行時間:</strong>{" "}
          {Math.floor(performanceData.uptime / 60)} 分鐘
        </p>
      </div>
    </div>
  );
};

export default PerformanceData;
