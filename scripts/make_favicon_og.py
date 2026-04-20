"""Generate favicon + OG image for Vinarija Karaba."""
from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"

ICON_DARK = ASSETS / "logo-icon-only.png"
LOGO_FULL_CREAM = ASSETS / "logo-full-cream-removebg-preview.png"

WINE = (92, 26, 31, 255)
CREAM = (239, 230, 206, 255)

def make_favicons():
    src = Image.open(ICON_DARK).convert("RGBA")
    sizes = [(16, 16), (32, 32), (48, 48), (180, 180), (192, 192), (512, 512)]
    # Square-crop to bbox of alpha content to reduce padding
    bbox = src.getbbox()
    src = src.crop(bbox)
    w, h = src.size
    side = max(w, h)
    sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    sq.paste(src, ((side - w) // 2, (side - h) // 2))

    for sz in sizes:
        img = sq.resize(sz, Image.LANCZOS)
        out = ASSETS / f"favicon-{sz[0]}.png"
        img.save(out)
        print("wrote", out)

    # apple-touch (180) with cream background so it looks finished on iOS
    apple = Image.new("RGBA", (180, 180), CREAM)
    logo = sq.resize((140, 140), Image.LANCZOS)
    apple.paste(logo, (20, 20), logo)
    apple.save(ASSETS / "apple-touch-icon.png")
    print("wrote", ASSETS / "apple-touch-icon.png")

    # Multi-size ICO
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_imgs = [sq.resize(s, Image.LANCZOS) for s in ico_sizes]
    ico_imgs[0].save(ASSETS / "favicon.ico", format="ICO", sizes=ico_sizes, append_images=ico_imgs[1:])
    print("wrote", ASSETS / "favicon.ico")

def make_og():
    # 1200 x 630, wine background with cream full logo centered
    og = Image.new("RGBA", (1200, 630), WINE)
    logo = Image.open(LOGO_FULL_CREAM).convert("RGBA")
    # Scale logo to fit ~760 wide
    lw, lh = logo.size
    target_w = 760
    scale = target_w / lw
    new = logo.resize((int(lw * scale), int(lh * scale)), Image.LANCZOS)
    nw, nh = new.size
    og.paste(new, ((1200 - nw) // 2, (630 - nh) // 2), new)
    out = ASSETS / "og-image.png"
    og.convert("RGB").save(out, quality=92, optimize=True)
    print("wrote", out)

    # JPG variant (smaller for social)
    out_jpg = ASSETS / "og-image.jpg"
    og.convert("RGB").save(out_jpg, quality=88, optimize=True)
    print("wrote", out_jpg)

if __name__ == "__main__":
    make_favicons()
    make_og()
