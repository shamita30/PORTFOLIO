import os
from PIL import Image

src_dir = '/Users/shamitarathinaraj/.gemini/antigravity/brain/6bb4702d-4aa3-4c10-83f1-4ff47dc0fdcc'
dest_dir = '/Users/shamitarathinaraj/Desktop/SHAMITA PORTFOLIO/space-portfolio/public/certificates'

images = [
    'media__1776783190616.jpg', # drestein
    'media__1776783191492.jpg', # vecoders
    'media__1776783191499.jpg', # power control
    'media__1776783191546.jpg', # ncea
    'media__1776783310805.jpg'  # unlocking tomorrow
]

os.makedirs(dest_dir, exist_ok=True)

names = ['drestein', 'vecoders', 'power_control', 'ncea', 'blockchain']

for img_file, name in zip(images, names):
    img_path = os.path.join(src_dir, img_file)
    if os.path.exists(img_path):
        with Image.open(img_path) as img:
            # If portrait, rotate 90 degrees counter-clockwise
            if img.height > img.width:
                img = img.transpose(Image.ROTATE_90)
            
            dest_path = os.path.join(dest_dir, f'{name}.jpg')
            img.save(dest_path, quality=85)
            print(f'Processed {img_file} -> {dest_path}')
    else:
        print(f'File not found: {img_path}')
