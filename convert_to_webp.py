#!/usr/bin/env python3
"""Convert images to WebP format."""
import os
from PIL import Image

def convert_to_webp(source_path, output_path, quality=80):
    """Convert image to WebP format."""
    try:
        with Image.open(source_path) as img:
            # Convert RGBA to RGB if needed
            if img.mode in ('RGBA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                if img.mode == 'RGBA':
                    background.paste(img, mask=img.split()[3])
                    img = background
                else:
                    img = img.convert('RGB')
            elif img.mode != 'RGB':
                img = img.convert('RGB')

            img.save(output_path, 'WEBP', quality=quality, method=6)
            return True
    except Exception as e:
        print(f"Error converting {source_path}: {e}")
        return False

def main():
    hero_folder = 'D:/nura_soft_landing/nura_landing_page-/public/hero'

    print("Converting images to WebP...")
    for filename in os.listdir(hero_folder):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            source_path = os.path.join(hero_folder, filename)
            base_name = os.path.splitext(filename)[0]
            output_filename = f"{base_name}.webp"
            output_path = os.path.join(hero_folder, output_filename)

            if not os.path.exists(output_path):
                print(f"Converting: {filename} -> {output_filename}")
                convert_to_webp(source_path, output_path, quality=80)
            else:
                print(f"Already exists: {output_filename}")

    print("\nDone!")

if __name__ == '__main__':
    main()
