"use client";
import React, { useState } from "react";
import axios from "axios";
import { DJANGO_URL } from "../constant";
import { Script } from "../interface/script";

interface ScriptExecutionPanelProps {
  selectedScript: Script | undefined;
  onExecutionComplete: (result: string) => void;
}

const ScriptExecutionPanel: React.FC<ScriptExecutionPanelProps> = ({
  selectedScript,
  onExecutionComplete,
}) => {
  const [executionStatus, setExecutionStatus] = useState<
    "idle" | "running" | "success" | "error"
  >("idle");
  const [output, setOutput] = useState<string>("");

  const handleExecute = () => {
    if (selectedScript) {
      setExecutionStatus("running"); // 設定狀態為運行中
      setOutput("");

      axios
        .post(DJANGO_URL(`web/api/scripts/${selectedScript.id}/execute/`), {
          scriptName: selectedScript.name,
        })
        .then((response) => {
          // console.log(response);
          setExecutionStatus("success"); // 設定狀態為成功
          setOutput(response.data.stdout); // 獲取標準輸出
          onExecutionComplete(response.data.result);
        })
        .catch((error) => {
          setExecutionStatus("error"); // 設定狀態為錯誤
          if (error.response) {
            const errorMessage = error.response.data.error || error.message;
            const errorOutput = error.response.data.details || "";
            const errorStderr = error.response.data.stderr || "";
            setOutput(
              `Error: ${errorMessage}\nOutput: ${errorOutput}\nStderr: ${errorStderr}`
            );
            onExecutionComplete(`Error: ${errorMessage}`);
          } else if (error.request) {
            setOutput("Error: No response received from the server.");
            onExecutionComplete("Error: No response received from the server.");
          } else {
            setOutput(`Error: ${error.message}`);
            onExecutionComplete(`Error: ${error.message}`);
          }
        });
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Script Execution Panel</h2>
      {selectedScript ? (
        <div>
          <p className="text-gray-400 mb-2">
            Selected Script: {selectedScript.name}
          </p>
          <pre className="bg-gray-800 p-2 rounded mb-4">
            {selectedScript.description}
          </pre>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleExecute}
          >
            Execute Script
          </button>
          {executionStatus === "running" && (
            <p className="text-yellow-500 mt-4">Executing script...</p>
          )}
          {executionStatus === "success" && (
            <div className="mt-4">
              <p className="text-green-500">Execution successful!</p>
              {/* <pre className="bg-gray-800 p-2 rounded overflow-auto">
                {output}
              </pre> */}
            </div>
          )}
          {executionStatus === "error" && (
            <div className="mt-4">
              <p className="text-red-500">Execution failed!</p>
              {/* <pre className="bg-red-800 p-2 rounded overflow-auto">
                {output}
              </pre> */}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Please select a script to execute.</p>
      )}
    </div>
  );
};

export default ScriptExecutionPanel;
