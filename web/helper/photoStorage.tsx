export interface PhotoRecord {
  url: string;
  folder: string;
}

export const saveViewedPhoto = (photo: PhotoRecord) => {
  // 从 localStorage 中获取已有的照片记录
  const savedPhotos = loadViewedPhotos();

  // 将新照片添加到已有的记录中
  const updatedPhotos = [...savedPhotos, photo];

  // 确保只存储最多 30 张照片
  const limitedPhotos = updatedPhotos.slice(-30);

  // 将更新后的记录存回 localStorage
  localStorage.setItem("viewedPhotos", JSON.stringify(limitedPhotos));
};

export const loadViewedPhotos = (): PhotoRecord[] => {
  const savedPhotos = localStorage.getItem("viewedPhotos");
  if (savedPhotos) {
    return JSON.parse(savedPhotos) as PhotoRecord[];
  }
  return [];
};
