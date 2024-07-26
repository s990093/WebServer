"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FileTable from "./FileTable";
import { DJANGO_IP } from "@/app/constant";
import { detailFileItemData } from "../../../../../helper/Interface";

export default function Page({
  params,
}: {
  params: { artist: string; id: string };
}) {
  const router = useRouter();
  const [files, setFiles] = useState<detailFileItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const decodedId = encodeURIComponent(params.id); // Decode the URI component
  const decodedArtist = encodeURIComponent(params.artist); // Decode the URI component

  useEffect(() => {
    if (!params.artist) router.push("/"); // Wait for id to be defined
    if (!params.id) router.push("/"); // Wait for id to be defined

    const fetchFiles = async () => {
      try {
        const res = await fetch(
          `http://${DJANGO_IP}:8000/web/api/detail/${decodedArtist}/${decodedId}`
        );

        const data: detailFileItemData[] = await res.json();
        setFiles(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };

    fetchFiles();
  }, [params.artist, params.id, router]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const key = event.key;
    let newIndex = selectedIndex;

    switch (key) {
      case "1":
        newIndex = 0;
        break;
      case "2":
        newIndex = 1;
        break;
      case "3":
        newIndex = 2;
        break;
      case "4":
        newIndex = 3;
        break;
      default:
        return;
    }

    setSelectedIndex(newIndex);
  };

  return (
    <div className="container mx-auto" onKeyDown={handleKeyPress}>
      <div className="bg-gray-800 rounded-lg shadow-md ">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <FileTable
            files={files}
            selectedIndex={selectedIndex}
            title={decodedId}
          />
        )}
      </div>
    </div>
  );
}
