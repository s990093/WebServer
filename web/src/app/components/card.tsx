"use client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  DJANGO_IP,
  DJANGO_URL,
  ImageUrl,
  ThumbnailImageUrl,
} from "../constant";
import axios from "axios";
import TagList, { TagResponse } from "./Tag";

export const Card: React.FC<{
  imageUrls: string[];
  title: string;
  href: string;
  tags: TagResponse[];
}> = ({ imageUrls, title, href, tags }) => {
  const addDirCuntPhotos = async (folder_name: string) => {
    try {
      await axios.post(
        DJANGO_URL("web/api/record-click/"),
        {
          folder_name: folder_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleCardClick = async (folder_name: string) => {
    window.location.href = href;
  };
  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg min-h-[300px] flex flex-col cursor-pointer"
      onClick={() => {
        // handleCardClick(title);
        addDirCuntPhotos(title);
      }}
    >
      <div
        className="grid grid-cols-3 gap-2"
        onClick={() => {
          handleCardClick(title);
        }}
      >
        {imageUrls.map((imageUrl, index) => (
          <LazyLoadImage
            key={index}
            src={ImageUrl(imageUrl)}
            alt={`Photo ${index + 1}`}
            className="w-full h-32 object-cover"
          />
        ))}
      </div>
      <div className="p-4 flex flex-row justify-between items-center">
        <div className="text-white text-xl font-bold truncate">{title}</div>
        <TagList tags={tags} />
      </div>
    </div>
  );
};
