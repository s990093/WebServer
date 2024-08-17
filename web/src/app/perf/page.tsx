"use client";
import os from "os";
import { useEffect, useState } from "react";
import { PerformanceDataType } from "./PerformanceData";

const Page: React.FC = () => {
  const [data, setData] = useState<PerformanceDataType>();

  useEffect(() => {
    const fetchData = async () => {
      const performanceData = {
        cpuModel: os.cpus()[0].model,
        cpuCores: os.cpus().length,
        totalMemory: os.totalmem() / 1024 / 1024 / 1024, // GB
        freeMemory: os.freemem() / 1024 / 1024 / 1024, // GB
        osType: os.type(),
        loadAvg: os.loadavg(),
        uptime: os.uptime(),
      };
      setData(performanceData);
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Performance Data</h1>
      <p>CPU Model: {data.cpuModel}</p>
      <p>CPU Cores: {data.cpuCores}</p>
      <p>Total Memory: {data.totalMemory.toFixed(2)} GB</p>
      <p>Free Memory: {data.freeMemory.toFixed(2)} GB</p>
      <p>OS Type: {data.osType}</p>
      {/* <p>Load Average: {data.loadAvg.join(", ")}</p>
      <p>Uptime: {data.uptime} seconds</p> */}
    </div>
  );
};

export default Page;
