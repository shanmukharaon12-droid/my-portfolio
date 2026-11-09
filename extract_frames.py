import cv2
import numpy as np
import os
import json

def extract():
    video_path = 'public/character.mp4'
    frames_dir = 'public/frames'
    os.makedirs(frames_dir, exist_ok=True)

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Could not open {video_path}")

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print(f"Video metadata: {w}x{h}, {fps} FPS, {total_frames} total frames.")

    # 1. Extract neutral center frame (Frame 0)
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    ret, frame0 = cap.read()
    if not ret:
        raise RuntimeError("Failed to read frame 0")
    
    center_path = 'public/center.webp'
    cv2.imwrite(center_path, frame0, [cv2.IMWRITE_WEBP_QUALITY, 92])
    print(f"Extracted neutral center frame -> {center_path}")

    # 2. Extract 64 evenly distributed frames
    num_frames = 64
    indices = [int(round(i * (total_frames - 1) / (num_frames - 1))) for i in range(num_frames)]
    print(f"Frame indices to extract ({num_frames} frames):", indices)

    frame_list = []
    for i, frame_idx in enumerate(indices):
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret:
            print(f"Warning: could not read frame {frame_idx}")
            continue

        filename = f"frame_{i}.webp"
        filepath = os.path.join(frames_dir, filename)
        cv2.imwrite(filepath, frame, [cv2.IMWRITE_WEBP_QUALITY, 90])
        frame_list.append({
            "index": i,
            "video_frame": frame_idx,
            "filename": filename
        })

    cap.release()

    # Also save manifest.json
    manifest_path = os.path.join(frames_dir, "manifest.json")
    with open(manifest_path, "w") as f:
        json.dump({
            "total_extracted": len(frame_list),
            "video_frames": total_frames,
            "width": w,
            "height": h,
            "frames": frame_list
        }, f, indent=2)

    print(f"Successfully extracted {len(frame_list)} frames into {frames_dir}")

if __name__ == '__main__':
    extract()
