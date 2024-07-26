import os
import random
import rich
BASE_DIR = "/Users/hungwei/Documents/all/郭"


def get():
    try:
        # 獲取所有上層資料夾
        top_level_dirs = [os.path.join(BASE_DIR, d) for d in os.listdir(BASE_DIR) if os.path.isdir(os.path.join(BASE_DIR, d))]
        
        result = {}
        for selected_sub_dir in top_level_dirs:
            images = []
            # 獲取該子資料夾內的所有文件
            all_files = [os.path.join(selected_sub_dir, f) for f in os.listdir(selected_sub_dir)]
            
            # 選擇所有圖片文件（假設圖片文件以jpg, png, jpeg等格式結尾）
            photo_files = [f for f in all_files if os.path.isfile(f) and f.lower().endswith(('jpg', 'jpeg', 'png'))]
            
            if photo_files:
                # 隨機選擇1張照片
                selected_photos = random.sample(photo_files, min(6, len(photo_files)))
                
                # 保存相對路徑
                relative_paths = [os.path.relpath(photo, BASE_DIR) for photo in selected_photos]
                
                images.extend(relative_paths)
                
        
            result[os.path.relpath(selected_sub_dir, BASE_DIR)] = images

        rich.print(result)
    except Exception as e:
        print(e)
        
        
        
        
        
        
get()