export const DJANGO_IP = "127.0.0.1";
export const DJANGO_PORT = "8000";
export const NIGIX_PORT = "8001";
export const NIGIX_T_PORT = "8002";

export const ImageUrl = (file: string): string => {
  return `http://${DJANGO_IP}:${NIGIX_PORT}/${file}`;
};

export const ThumbnailImageUrl = (file: string): string => {
  // return `http://${DJANGO_IP}:${NIGIX_PORT}/${file}?preview=true`;
  return `http://${DJANGO_IP}:${NIGIX_T_PORT}/${file}`;
};

export const DJANGO_URL = (url: string): string => {
  return `http://${DJANGO_IP}:${DJANGO_PORT}/${url}`;
};
