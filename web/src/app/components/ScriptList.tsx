"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { DJANGO_URL } from "../constant";
import { Script } from "../interface/script";

interface ScriptListProps {
  onSelectScript: (script: Script) => void;
  scripts: Script[];
}

const ScriptList: React.FC<ScriptListProps> = ({ onSelectScript, scripts }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const handleExecuteScript = async (script: Script) => {
    try {
      const response = await axios.post(
        DJANGO_URL(`web/api/scripts/execute/${script.id}/`)
      );
      const result = response.data; // 將響應數據存儲在常量中
      console.log("Response:", result);
      // 在這裡更新狀態或處理響應
      // script.status = 'running'; // 如果需要更新狀態
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("Execute script");
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Available Scripts</h2>
      <ul className="list-disc list-inside">
        {scripts.map((script, index) => (
          <li
            key={script.id}
            className="mb-4 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <button
              className="text-blue-400 hover:text-blue-600 text-lg font-semibold"
              onClick={() => onSelectScript(script)}
            >
              {script.name}
            </button>
            <p className="text-gray-600 text-sm mt-1">
              Description:{" "}
              <span className="font-medium">{script.description}</span>
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Command:{" "}
              <span className="font-mono font-medium text-gray-800 bg-gray-200 rounded px-1">
                {script.cmd}
              </span>
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Last Modified: {formatDate(script.last_modified)}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              status:{" "}
              <span className="font-mono font-medium text-gray-800 bg-gray-200 rounded px-1">
                {script.status}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScriptList;
