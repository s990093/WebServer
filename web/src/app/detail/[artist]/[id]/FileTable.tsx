/* eslint-disable @next/next/no-img-element */
import { DJANGO_IP, ImageUrl } from "@/app/constant";
import React, { useEffect, useRef, useState } from "react";
// import "react-image-gallery/styles/css/image-gallery.css"; // eslint-disable-next-line @next/next/no-img-element
// import { FileTableCell } from "./FileCell";
import { Props } from "../../../../../helper/Interface";
// import { getFileExtension, isVideo } from "../../../../../helper/func";
import Gallery from "./Gallery";
import { title } from "process";
import { alphanumericSort } from "../../../../../helper/func";

// import LightGallery from "lightgallery/react";
// import "lightgallery/css/lightgallery.css";
// import lgVideo from "lightgallery/plugins/video";
// import "lightgallery/css/lg-video.css";
// // import plugins if you need
// import ReactPlayer from "react-player/lazy";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import Gallery from "react-photo-gallery";

const FileTable: React.FC<Props> = ({ files, selectedIndex, title }) => {
  const [isPlaying, setIsPlaying] = useState(false); // 控制自动播放状态
  const galleryRef = useRef(null);

  const images = files
    .filter((file) => !file.is_folder)
    .sort((a, b) => alphanumericSort(a.path, b.path))
    .map((file) => ({
      src: ImageUrl(file.path),
    }));

  return (
    <div className="max-h-full">
      <Gallery photos={images} title={title} />;
    </div>
  );
};

// 函數：根據文件路徑獲取文件擴展名

export default FileTable;
