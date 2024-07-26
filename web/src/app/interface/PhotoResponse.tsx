"use client";
export interface PhotoResponse {
  [key: string]: string[];
}

export interface FavAlbum {
  id: number;
  name: string;
}
export interface RecordClick {
  id: number;
  name: string;
  dir_count: number;
}
interface Directory {
  id: number;
  name: string;
  dir_count: number;
}

interface Album {
  id: number;
  name: string;
  directory: number;
}

export interface UserFavorite {
  id: number;
  created_at: string;
  directory: Directory;
  album: Album;
}

export interface ArtistResponse extends PhotoResponse {}
