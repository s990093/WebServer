/* eslint-disable @next/next/no-img-element */
"use client";
import { DJANGO_IP } from "@/app/constant";
import React, { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // eslint-disable-next-line @next/next/no-img-element
import { FileTableCellProps } from "../../../../../helper/Interface";
import { ChoiceTheVideoOrImage } from "@/app/components/ChoiceTheVideoOrImage";
import { getFileExtension, isVideo } from "../../../../../helper/func";
import { saveViewedPhoto } from "../../../../../helper/photoStorage";

export const FileTableCell: React.FC<FileTableCellProps> = ({
  currentImage,
  nextImage,
  nextNextImage,
  four_Image,
  five_NextImage,
  selectedIndex,
}) => {
  const [isVideoPaused, setIsVideoPaused] = useState<boolean>(false);
  const fileExtension = getFileExtension(currentImage.original);

  // saveViewedPhoto({
  //   url: currentImage.original,
  //   folder: currentImage.description,
  // });

  const handleMouseEnter = () => {
    setIsVideoPaused(false); // 繼續播放影片
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "d" && fileExtension == "mp4") {
      setIsVideoPaused(!isVideoPaused);
    }
  };

  return (
    <div
      className="flex"
      tabIndex={0}
      onKeyDown={handleKeyPress}
      onMouseEnter={handleMouseEnter}
    >
      {isVideo(fileExtension) ? (
        <div className="w-full pr-2">
          <ChoiceTheVideoOrImage
            original={currentImage.original}
            description={currentImage.description}
            isPaused={isVideoPaused}
          />
        </div>
      ) : (
        <>
          <div className="w-full sm:w-6/12 pr-2">
            <ChoiceTheVideoOrImage
              original={currentImage.original}
              description={currentImage.description}
              isPaused={isVideoPaused}
            />
          </div>
          <div className="w-6/12 pr-2 hidden sm:block">
            <ChoiceTheVideoOrImage
              original={nextImage.original}
              description={nextImage.description}
              isPaused={isVideoPaused}
            />
          </div>
        </>
      )}
      {selectedIndex === 1 && (
        <div className="w-6/12 pr-2 hidden sm:block">
          <ChoiceTheVideoOrImage
            original={nextNextImage.original}
            description={nextNextImage.description}
            isPaused={isVideoPaused}
          />
        </div>
      )}
      {selectedIndex === 2 && (
        <div className="hidden sm:block w-2/12">
          <div className="flex flex-col space-y-4">
            <div className="max-w-[220px] max-h-[750px]">
              <ChoiceTheVideoOrImage
                original={four_Image.original}
                description={four_Image.description}
                isPaused={isVideoPaused}
              />
              <ChoiceTheVideoOrImage
                original={five_NextImage.original}
                description={five_NextImage.description}
                isPaused={isVideoPaused}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
