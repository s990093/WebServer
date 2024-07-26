export interface File {
  name: string;
  path: string;
  isDirectory: boolean;
}
export interface Props {
  sortedFiles: File[];
}

type SortByOptions = "name" | "type";

export const sortFiles = (files: File[], sortBy: SortByOptions): File[] => {
  return [...files].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "type") {
      if (a.isDirectory === b.isDirectory) {
        return a.name.localeCompare(b.name);
      }
      return a.isDirectory ? -1 : 1;
    }
    return 0;
  });
};
