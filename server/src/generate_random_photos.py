import json
import re
from rich import print as rprint
import os
import random

OK_FILE = ('jpg', 'jpeg', 'png', 'webp')

def sanitize_path(path: str) -> str:
    return re.sub(r'\._', '', path)

def generate_random_photos(base_media_dir):
    try:
        # Get all top-level directories
        top_level_dirs = [os.path.join(base_media_dir, d) for d in os.listdir(base_media_dir) if os.path.isdir(os.path.join(base_media_dir, d))]

        result = {}

        for dir_path in top_level_dirs:
            # Get all sub-directories within each top-level directory
            sub_dirs = [os.path.join(dir_path, d) for d in os.listdir(dir_path) if os.path.isdir(os.path.join(dir_path, d))]

            images = []

            if sub_dirs:
                all_sub_images = []

                for sub_dir in sub_dirs:
                    # Get all files within the sub-directory
                    all_files = [os.path.join(sub_dir, f) for f in os.listdir(sub_dir)]
                    # Select all image files (assuming they end with jpg, jpeg, or png)
                    photo_files = [f for f in all_files if os.path.isfile(f) and f.lower().endswith(OK_FILE)]
                    all_sub_images.extend(photo_files)

                # Select up to six photos directly from the collected images
                selected_photos = random.sample(all_sub_images, min(6, len(all_sub_images)))
                images = [sanitize_path(os.path.relpath(photo, base_media_dir)) for photo in selected_photos]

                # If less than six photos are found, fill with original photos
                remaining_count = 6 - len(images)
                if remaining_count > 0:
                    additional_photos = random.sample(all_sub_images, remaining_count)
                    additional_relative_paths = [sanitize_path(os.path.relpath(photo, base_media_dir)) for photo in additional_photos]
                    images.extend(additional_relative_paths)

            result[os.path.relpath(dir_path, base_media_dir)] = images

        return result

    except Exception as e:
        return {"error": str(e)}
    

        
def get_artist_album(artist_path):
    try:
        top_level_dirs = [os.path.join(artist_path, d) for d in os.listdir(artist_path) if os.path.isdir(os.path.join(artist_path, d))]
        
        result = {}
        for selected_sub_dir in top_level_dirs:
            images = []
            all_files = [os.path.join(selected_sub_dir, f) for f in os.listdir(selected_sub_dir)]
            
            photo_files = [f for f in all_files if os.path.isfile(f) and f.lower().endswith(OK_FILE)]
            
            if photo_files:
                selected_photos = random.sample(photo_files, min(6, len(photo_files)))
                relative_paths = [sanitize_path(os.path.relpath(photo, artist_path)) for photo in selected_photos]
                images.extend(relative_paths)
                
            result[os.path.relpath(selected_sub_dir, artist_path)] = images

        return result
    except Exception as e:
        print(e)
        

def refresh_data(json_file, base_media_dir):

    # Ensure directory exists
    os.makedirs(os.path.dirname(json_file), exist_ok=True)

    # Remove existing JSON file if it exists
    if os.path.exists(json_file):
        os.remove(json_file)

    # Generate and save random photo data
    result = generate_random_photos(base_media_dir)
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=4)