export type FileTableCellProps = {
  currentImage: {
    original: string;
    description: string;
  };
  nextImage: {
    original: string;
    description: string;
  };
  nextNextImage: {
    original: string;
    description: string;
  };
  four_Image: {
    original: string;
    description: string;
  };
  five_NextImage: {
    original: string;
    description: string;
  };
  selectedIndex: number;
};
export type Props = {
  files: detailFileItemData[];
  selectedIndex: number;
  title: string;
};
export interface ChoiceTheVideoOrImageProps {
  original: string;
  description: string;
  isPaused: boolean;
}
export interface detailFileItemData {
  path: string;
  is_folder: boolean;
}
