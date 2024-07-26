/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRef, useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getFileExtension, isImage, isVideo } from "../../../helper/func";
import { ChoiceTheVideoOrImageProps } from "../../../helper/Interface";
import ReactPlayer from "react-player/lazy";

export const ChoiceTheVideoOrImage: React.FC<ChoiceTheVideoOrImageProps> = ({
  original,
  description,
  isPaused,
}) => {
  const fileExtension = getFileExtension(original);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // 分割字串並獲取最後一部分
  const parts = description.split("/");
  const lastPart = parts[parts.length - 1];

  let truncatedDescription =
    lastPart.length > 20 ? lastPart.substring(0, 20) + "..." : lastPart;
  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5, // 超過 50% 的元素可見性時觸發
      }
    );

    observer.observe(videoElement);

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && !isPaused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }

    // 在這裡檢查 isPaused 狀態，如果為 true，則暫停影片
    return () => {
      if (isPaused) {
        videoRef.current?.pause();
      }
    };
  }, [isVisible, isPaused]);

  if (isImage(fileExtension)) {
    return (
      <div className="relative">
        <LazyLoadImage src={original} alt={description} />
        <span className="absolute right-0 bottom-0 bg-gray-700 bg-opacity-75 text-white text-xs p-2 truncate max-w-xs rounded-l-lg">
          {truncatedDescription}
        </span>
      </div>
    );
  } else if (isVideo(fileExtension)) {
    return (
      // <div className="relative aspect-w-16 aspect-h-9">
      //   <ReactPlayer
      //     url={original}
      //     light
      //     loop
      //     controls
      //     width="100%"
      //     height="100%"
      //   />
      //   <span className="absolute right-0 bottom-0 bg-gray-700 bg-opacity-75 text-white text-xs p-2 truncate max-w-xs">
      //     {truncatedDescription}
      //   </span>
      // </div>
      <div className=" aspect-w-16 aspect-h-9">
        <ReactPlayer
          url={original}
          light
          loop
          controls
          width="100%"
          height="100%"
        />
      </div>
    );
  } else {
    return (
      <span className="text-lg font-semibold text-gray-700 bg-gray-100 p-2 rounded-lg shadow-sm">
        {truncatedDescription}
      </span>
    );
  }
};
