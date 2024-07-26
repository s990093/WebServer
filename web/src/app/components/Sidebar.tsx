"use client";
import React, { useEffect, useState } from "react";
import { loadViewedPhotos, PhotoRecord } from "../../../helper/photoStorage";
import { ChoiceTheVideoOrImage } from "./ChoiceTheVideoOrImage";
import { FaBars, FaTimes } from "react-icons/fa"; // 使用react-icons库中的关闭图标

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewedPhotos, setViewedPhotos] = useState<PhotoRecord[]>([]);
  const [mouseX, setMouseX] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const xPos = e.clientX - 110;
    setMouseX(xPos);
    if (xPos <= 30 && !isOpen) {
      setIsOpen(true);
    } else if (xPos > 250 && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const photos = loadViewedPhotos();
      setViewedPhotos(photos);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className="fixed top-2 left-2 bg-blue-500 text-white p-2 rounded shadow-lg hover:bg-blue-600 transition duration-300"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
      {isOpen && (
        <div
          className={`fixed top-0 h-full w-48 bg-gray-800 text-white transition-transform duration-300 ease-in-out transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={handleToggle}
            className="absolute top-2 right-2 text-white hover:text-gray-400"
          >
            <FaTimes size={20} />
          </button>
          <ul className="mt-12 space-y-4 overflow-y-auto h-full p-4">
            <li className="text-lg font-semibold">History</li>
            {viewedPhotos.map((photo, index) => (
              <li key={index} className="text-sm hover:bg-gray-700 p-2 rounded">
                <ChoiceTheVideoOrImage
                  original={photo.url}
                  description={photo.folder}
                  isPaused={false}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
