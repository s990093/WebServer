import { getFileExtension, isVideo } from "../../helper/func";

// 加載 dotenv 套件
require("dotenv").config();

// 從環境變量中讀取
// 從環境變量中讀取，如果不存在則使用默認值
// 從環境變量中讀取，如果不存在則使用默認值
export const DJANGO_IP = process.env.NEXT_PUBLIC_DJANGO_IP || "192.168.0.135";
export const DJANGO_PORT = process.env.NEXT_PUBLIC_DJANGO_PORT || "8000";
export const NGINX_PORT = process.env.NEXT_PUBLIC_NGINX_PORT || "8001";
export const NGINX_T_PORT = process.env.NEXT_PUBLIC_NGINX_T_PORT || "8002";

export const DJANGO_URL = (url: string): string => {
  return `http://${DJANGO_IP}:${DJANGO_PORT}/${url}`;
};
