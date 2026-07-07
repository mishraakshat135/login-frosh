from PIL import Image
from pathlib import Path

input_folder = Path(r"C:\Users\ASUS\Desktop\projects building\frosh login\freshers side\public\png_frames")
output_folder = Path(r"C:\Users\ASUS\Desktop\projects building\frosh login\freshers side\public\better_webp_frames")
output_folder.mkdir(exist_ok=True)

extensions = ["*.jpg", "*.png"]
count = 0

for ext in extensions:
    for img_path in input_folder.glob(ext):
        try:
            with Image.open(img_path) as img:
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")

                output_path = output_folder / f"{img_path.stem}.webp"

                img.save(
                    output_path,
                    "WEBP",
                    quality=85,
                    method=6
                )

                count += 1
                print(f"Converted: {img_path.name}")

        except Exception as e:
            print(f"Failed: {img_path.name} -> {e}")

print(f"\nDone! Converted {count} images.")