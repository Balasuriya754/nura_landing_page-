
#!/usr/bin/env python3
"""Compress images in public/ and src/assets/ folders."""
import os
from PIL import Image
import re

def get_large_images(folder):
    """Find all jpg/jpeg/png files over 1MB."""
    large_images = []
    for filename in os.listdir(folder):
        if re.search(r'\.(jpg|jpeg|png)$', filename, re.IGNORECASE):
            path = os.path.join(folder, filename)
            size = os.path.getsize(path)
            if size > 1_000_000:  # Over 1MB
                large_images.append((path, filename, size))
    return sorted(large_images, key=lambda x: x[2], reverse=True)

def compress_image(path, output_path, quality=75, max_size=None):
    """Compress an image while maintaining quality."""
    with Image.open(path) as img:
        # Convert RGBA to RGB if needed for JPEG
        if img.mode in ('RGBA', 'P'):
            # Create white background for transparent areas
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

        # Save with specified quality
        img.save(output_path, 'JPEG', quality=quality, optimiZe=True, progressiVe=True)
        return os.path.getsize(output_path)

def main():
    # Images to compress (priority - largest first)
    folders = [
        'public',
        'src/assets'
    ]

    # List of specific large images to compress
    large_images = []
    for folder in folders:
        if os.path.isdir(folder):
            large_images.extend(get_large_images(folder))

    print(f"Found {len(large_images)} images over 1MB")
    print("\nTop 10 largest images:")
    for path, name, size in large_images[:10]:
        print(f"  {name}: {size/1024/1024:.1f} MB")

    # Compress each image
    print("\nCompressing images...")
    for path, name, size in large_images:
        # Use same folder for output
        new_size = compress_image(path, path, quality=75)
        compression = (size - new_size) / size * 100
        print(f"  {name}: {size/1024/1024:.1f}MB -> {new_size/1024/1024:.1f}MB ({compression:.1f}% reduction)")

    print("\nDone!")

if __name__ == '__main__':
    main()
