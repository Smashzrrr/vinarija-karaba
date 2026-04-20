"""Generate favicons from user-provided favicon.webp."""
from PIL import Image, ImageFilter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
SRC = ASSETS / "favicon.webp"

def extract_logo(img: Image.Image, dark_threshold: int = 90, pad_ratio: float = 0.02) -> Image.Image:
    """Extract the dark logo onto a transparent square canvas."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    gray = rgb.convert("L")
    binary = gray.point(lambda v: 255 if v < dark_threshold else 0)
    # Erode with MinFilter to strip isolated paper-texture specks; use result only for bbox
    denoised = binary.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MinFilter(5))
    bbox = denoised.getbbox()
    if not bbox:
        return img

    alpha = binary.crop(bbox)
    cw, ch = alpha.size
    black = Image.new("RGBA", (cw, ch), (20, 16, 12, 255))
    cropped = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    cropped.paste(black, (0, 0), alpha)

    side = max(cw, ch)
    pad = int(side * pad_ratio)
    canvas_side = side + pad * 2
    canvas = Image.new("RGBA", (canvas_side, canvas_side), (0, 0, 0, 0))
    canvas.paste(cropped, ((canvas_side - cw) // 2, (canvas_side - ch) // 2), cropped)
    return canvas

def main():
    src = Image.open(SRC).convert("RGBA")
    sq = extract_logo(src)

    sizes = [(16, 16), (32, 32), (48, 48), (180, 180), (192, 192), (512, 512)]
    for sz in sizes:
        out = ASSETS / f"favicon-{sz[0]}.png"
        sq.resize(sz, Image.LANCZOS).save(out)
        print("wrote", out)

    sq.resize((180, 180), Image.LANCZOS).save(ASSETS / "apple-touch-icon.png")
    print("wrote", ASSETS / "apple-touch-icon.png")

    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_imgs = [sq.resize(s, Image.LANCZOS) for s in ico_sizes]
    ico_imgs[0].save(
        ASSETS / "favicon.ico",
        format="ICO",
        sizes=ico_sizes,
        append_images=ico_imgs[1:],
    )
    print("wrote", ASSETS / "favicon.ico")

if __name__ == "__main__":
    main()
