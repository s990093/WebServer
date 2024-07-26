"use client";
import { useEffect, useRef } from "react";
import { ExecutionDetail } from "../interface/script";

interface ExecutionResultProps {
  result: ExecutionDetail;
}

const ExecutionResult: React.FC<ExecutionResultProps> = ({ result }) => {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [result.output]);

  return (
    <div className="bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4 text-blue-400 ">Execution Result</h2>
      <p className="text-lg font-semibold text-gray-300 overflow-auto">
        pid: <span className="text-blue-300">{result.pid}</span>
      </p>
      <p className="text-lg font-semibold text-gray-300 overflow-auto">
        path:
        <span className="text-blue-300 overflow-auto">
          {result.output_log_file_path}
        </span>
      </p>
      <div
        ref={outputRef}
        className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 overflow-auto"
        style={{ maxHeight: "300px" }} // Adjust height as needed
      >
        <pre>{result.output || "No output available."}</pre>
      </div>
    </div>
  );
};

export default ExecutionResult;
