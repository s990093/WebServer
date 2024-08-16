import os

def add_extension_to_files(directory, extension=".jpeg"):
    for root, _, files in os.walk(directory):
        for filename in files:
            file_path = os.path.join(root, filename)
            if os.path.isfile(file_path) and '.' not in filename:
                new_file_path = file_path + extension
                os.rename(file_path, new_file_path)
                print(f"Renamed '{file_path}' to '{new_file_path}'")

if __name__ == "__main__":
    target_directory = "/Users/hungwei/Downloads/"
    add_extension_to_files(target_directory)

    
