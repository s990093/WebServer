"use client";
import { ChoiceTheVideoOrImage } from "@/app/components/ChoiceTheVideoOrImage";
import React, { useEffect, useRef, useState } from "react";
import { FaWindowClose, FaFolderOpen } from "react-icons/fa"; // 使用react-icons库中的关闭图标
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ControlPanelProps {
  layout: string;
  setLayout: (layout: string) => void;
  rows: number;
  setRows: (rows: number) => void;
  columns: number;
  setColumns: (columns: number) => void;
  setMinimized: (minimized: boolean) => void;
  toggleMinimized: () => void;
  minimized: boolean;
}

// ControlPanel component for layout and settings
const ControlPanel: React.FC<ControlPanelProps> = ({
  layout,
  setLayout,
  rows,
  setRows,
  columns,
  setColumns,
  setMinimized,
  toggleMinimized,
  minimized,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setMinimized(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setMinimized(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [minimized, setMinimized]);

  return (
    <div
      ref={panelRef}
      className={`absolute top-4 right-4 bg-black bg-opacity-70 p-4 rounded flex flex-col gap-2 ${
        minimized ? "hidden" : ""
      }`}
    >
      <div className="flex gap-2 mb-2">
        <button
          className={`bg-gray-800 px-4 py-2 rounded ${
            layout === "gallery" && "bg-blue-500 text-white"
          }`}
          onClick={() => setLayout("gallery")}
        >
          Gallery
        </button>
        <button
          className={`bg-gray-800 px-4 py-2 rounded ${
            layout === "manga" && "bg-blue-500 text-white"
          }`}
          onClick={() => setLayout("manga")}
        >
          Manga
        </button>
        <button
          className={`bg-gray-800 px-4 py-2 rounded ${
            layout === "row" && "bg-blue-500 text-white"
          }`}
          onClick={() => setLayout("row")}
        >
          Row
        </button>
        <div
          className="text-white cursor-pointer flex items-center justify-center"
          onClick={toggleMinimized}
        >
          {!minimized && (
            <FaWindowClose className="text-4xl" onClick={toggleMinimized} />
          )}
        </div>
      </div>
      <div className="flex gap-2 mb-2">
        <button
          className={`bg-gray-800 px-4 py-2 rounded ${
            layout === "row" && "bg-blue-500 text-white"
          }`}
          onClick={() => {
            setLayout("row");
            setColumns(3);
          }}
        >
          C-3
        </button>
      </div>

      <div className="flex gap-2">
        <label className="text-white">Rows:</label>
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          className="bg-gray-800 text-white rounded px-2 py-1"
          min="1"
        />
      </div>
      <div className="flex gap-2">
        <label className="text-white">Columns:</label>
        <input
          type="number"
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
          className="bg-gray-800 text-white rounded px-2 py-1"
          min="1"
        />
      </div>
    </div>
  );
};

// Gallery component for displaying photos
const Gallery = ({
  photos,
  title,
}: {
  photos: { src: string }[];
  title: string;
}) => {
  const [layout, setLayout] = useState("gallery");
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(2);
  const [minimized, setMinimized] = useState(true);

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  return (
    <div className="relative p-2 min-h-screen">
      {/* <div className="p-4 text-white rounded-lg">
        <h1 className="text-3xl font-bold text-blue-400 mb-2 truncate">
          {title}
        </h1>
      </div> */}

      <div className="absolute top-4 left-4  bg-opacity-70 p-4 rounded flex flex-col gap-2 cursor-pointer">
        {minimized && (
          <FaFolderOpen
            className="text-4xl"
            width={60}
            height={60}
            onClick={toggleMinimized}
          />
        )}
      </div>

      <div
        className={`flex gap-2 mt-16 ${
          layout === "manga"
            ? "flex-col"
            : layout === "row"
            ? `grid grid-cols-${columns}`
            : `grid grid-cols-${columns}`
        }`}
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {photos.map((photo, index) => (
          <ChoiceTheVideoOrImage
            key={index}
            original={photo.src}
            description={photo.src}
            isPaused={false}
          />
        ))}
      </div>
      <ControlPanel
        layout={layout}
        setLayout={setLayout}
        rows={rows}
        setRows={setRows}
        columns={columns}
        setColumns={setColumns}
        setMinimized={setMinimized}
        minimized={minimized}
        toggleMinimized={toggleMinimized}
      />
    </div>
  );
};

export default Gallery;
