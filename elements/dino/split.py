from PIL import Image

def split_gif(input_file, output_folder):
    # Open the GIF file
    with Image.open(input_file) as img:
        # Iterate through each frame
        for i in range(img.n_frames):
            img.seek(i)
            frame = img.copy()
            # Save each frame as a separate image
            frame.save(f"{output_folder}/frame_{i:03d}.png", "PNG")

# Usage
input_gif = "run.gif"        # Replace with your input GIF file
output_frames_folder = "run"  # Replace with the output folder
print(f"input_gif: {input_gif} output_frames_folder: {output_frames_folder}")
# Create the output folder if it doesn't exist
import os
os.makedirs(output_frames_folder, exist_ok=True)

# Split the GIF
split_gif(input_gif, output_frames_folder)
