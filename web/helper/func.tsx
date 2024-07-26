import { DJANGO_IP, DJANGO_PORT } from "@/app/constant";

const videoExtensions = ["mp4", "avi", "mov", "MOV"];
const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

export function getFileExtension(filename: string) {
  return filename.split(".").pop()?.toLowerCase();
}

export function isVideo(fileExtension: string | undefined) {
  return fileExtension
    ? videoExtensions.includes(fileExtension.toLowerCase())
    : false;
}

export function isImage(fileExtension: string | undefined) {
  return fileExtension
    ? imageExtensions.includes(fileExtension.toLowerCase())
    : false;
}
export const createImageObject = (file: { path: string | undefined }) => ({
  original: `http://${DJANGO_IP}:${DJANGO_PORT}/web/api/f/${file.path}`,
  thumbnail: `http://${DJANGO_IP}:${DJANGO_PORT}/web/api/f/${file.path}`,
  description: file.path,
  type: isVideo(file.path) ? "video" : "image",
});

export const alphanumericSort = (a: string, b: string) => {
  const alphanumericRegex = /(\d+)|(\D+)/g;

  const aParts = a.match(alphanumericRegex) || [];
  const bParts = b.match(alphanumericRegex) || [];

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aPart = aParts[i] || "";
    const bPart = bParts[i] || "";

    const aIsNumber = /^\d+$/.test(aPart);
    const bIsNumber = /^\d+$/.test(bPart);

    if (aIsNumber && bIsNumber) {
      const aNumber = parseInt(aPart, 10);
      const bNumber = parseInt(bPart, 10);
      if (aNumber !== bNumber) return aNumber - bNumber;
    } else if (aIsNumber || bIsNumber) {
      return aIsNumber ? -1 : 1;
    } else if (aPart !== bPart) {
      return aPart.localeCompare(bPart);
    }
  }

  return 0;
};

// 捲動到指定位置，並在1秒內完成動畫
export function scrollToPosition(position: number | undefined) {
  if (position !== undefined) {
    window.scrollTo({
      top: position,
      behavior: "smooth", // 使用平滑的動畫效果
    });
  }
}
