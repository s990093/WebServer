"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { DJANGO_URL } from "../constant";
import { Script } from "../interface/script";
import { FaPlay, FaStop, FaSync, FaCheck, FaExclamation } from "react-icons/fa";

interface ScriptListProps {
  onSelectScript: (script: Script) => void;
  onChangeScriptStatus: (scriptId: number, status: string) => void; // 新增回调函数
  onError: (error: string) => void;
  scripts: Script[];
}

const ScriptList: React.FC<ScriptListProps> = ({
  onSelectScript,
  scripts,
  onChangeScriptStatus,
  onError,
}) => {
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
        DJANGO_URL(`web/api/scripts/${script.id}/execute/`)
      );
      const result = response.data;
      console.log("Response:", result);
      onChangeScriptStatus(script.id, "running"); // 调用回调函数更新状态
    } catch (error) {
      console.error("Error:", error);
      onError(String(error));
    }
    console.log("Execute script");
  };

  const handleStopScript = async (script: Script) => {
    try {
      const response = await axios.post(
        DJANGO_URL(`web/api/scripts/${script.id}/stop/`)
      );
      const result = response.data;
      onChangeScriptStatus(script.id, "stopped"); // 调用回调函数更新状态
    } catch (error) {
      console.error("Error stopping script:", error);
      onError(String(error));
    }
    console.log("Stop script");
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <FaSync className="text-yellow-500 animate-spin" />;
      case "success":
        return <FaCheck className="text-green-500" />;
      case "failed":
        return <FaExclamation className="text-red-500" />;
      case "stopped":
        return <FaStop className="text-gray-500" />;
      default:
        return <FaStop className="text-gray-500" />;
    }
  };

  const renderActionButton = (script: Script) => {
    if (script.status === "running") {
      return (
        <button
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => handleStopScript(script)}
        >
          <FaStop className="mr-2" /> Stop
        </button>
      );
    } else {
      return (
        <button
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => handleExecuteScript(script)}
        >
          <FaPlay className="mr-2" /> Execute
        </button>
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">Available Scripts</h2>
      <ul className="space-y-4">
        {scripts.map((script, index) => (
          <li
            key={script.id}
            className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <button
              className="text-blue-500 hover:text-blue-700 text-lg font-semibold"
              onClick={() => onSelectScript(script)}
            >
              {script.name}
            </button>
            <p className="text-gray-600 text-sm mt-2">
              Description:{" "}
              <span className="font-medium">{script.description}</span>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Command:{" "}
              <span className="font-mono font-medium text-gray-800 bg-gray-100 rounded px-1">
                {script.cmd}
              </span>
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Last Modified: {formatDate(script.last_modified)}
            </p>
            <p className="text-gray-600 text-sm mt-2 flex items-center">
              Status:{" "}
              <span className="ml-2">{renderStatusIcon(script.status)}</span>
            </p>
            <div className="mt-4 flex space-x-2">
              {renderActionButton(script)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScriptList;
