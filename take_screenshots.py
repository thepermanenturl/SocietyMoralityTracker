import subprocess
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
out_dir = r"c:\Users\spand\OneDrive\Desktop\MAke a GamE\makeMoralityTrackable\screenshots"

os.makedirs(out_dir, exist_ok=True)

def capture(name: str, url: str):
    target_png = os.path.join(out_dir, f"{name}.png")
    cmd = [
        edge_path,
        "--headless",
        "--disable-gpu",
        f"--screenshot={target_png}",
        "--window-size=1920,1080",
        url
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"[OK] Screenshot captured: {target_png}")
        return target_png
    except Exception as e:
        print(f"[FAIL] Failed to capture screenshot for {name}: {e}")
        return None

if __name__ == "__main__":
    print("Capturing automated UI screenshots...")
    capture("main_tree_view_decluttered", "http://localhost:3000")
