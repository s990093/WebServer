#!/usr/bin/env python
import os
import sys

__all__ = ['check_base_dir_exists']

def check_base_dir_exists(base_media_dir: str):
    if not os.path.exists(base_media_dir):
        print(f"Error: The directory {base_media_dir} does not exist.")
        sys.exit(1)
