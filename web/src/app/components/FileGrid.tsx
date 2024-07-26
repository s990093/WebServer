"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFolder, FaFile } from "react-icons/fa";
import { File, Props, sortFiles } from "./File";
import { PhotoResponse } from "../interface/PhotoResponse";

const DirectoryTable: React.FC<Props> = ({ sortedFiles }) => {
  return (
    <table className="min-w-full bg-gray-800 text-white border-gray-700 border rounded-lg overflow-hidden">
      <thead>
        <tr className="border border-slate-600 ">
          <th className="py-2 px-4 border-r">Type</th>
          <th className="py-2 px-4">Name</th>
        </tr>
      </thead>
      <tbody>
        {sortedFiles.map((file, index) => (
          <tr key={index} className="border border-slate-600 ">
            <td className="py-2 px-4 border-r">
              {file.isDirectory ? (
                <FaFolder className="text-yellow-500" size={24} />
              ) : (
                <FaFile className="text-blue-500" size={24} />
              )}
            </td>
            <td className="py-2 px-4 truncate">
              {/* 使用 Link 组件将 file.name 作为参数传递 */}
              <Link
                href={`/artist/${file.name}`}
                className="text-white hover:text-gray-400 transition-colors duration-300"
              >
                {file.name}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const FileGrid: React.FC<PhotoResponse> = ({ photos }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "type">("name");

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await fetch("/api/files");
      const data = await res.json();
      const filteredData = data.filter(
        (filePath: string) => !filePath.startsWith("/.")
      );
      const fileData = filteredData.map((filePath: string) => ({
        name: filePath.split("/").pop(),
        path: filePath,
        isDirectory: filePath.endsWith("/"), // Adjust this based on your data
      }));
      setFiles(fileData);
    };
    fetchFiles();
  }, []);

  const sortedFiles = sortFiles(files, sortBy);

  return (
    <div className="p-2">
      <DirectoryTable sortedFiles={sortedFiles} />
    </div>
  );
};

export default FileGrid;
