# %%
import requests
import base64
import urllib.request
import os
from openai import OpenAI
client = OpenAI()
from PIL import Image


def generate_image(prompt, size="512x512"):
    height = int(size.split("x")[0])
    width = int(size.split("x")[1])

    url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image"

    body = {
        "steps": 40,
        "width": width,
        "height": height,
        "seed": 0,
        "cfg_scale": 5,
        "samples": 1,
        "text_prompts": [
            {
                "text": prompt,
                "weight": 1
            },
            {
                "text": "blurry, bad",
                "weight": -1
            }
        ],
    }

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('STABILITY_API_KEY')}",
    }

    response = requests.post(
        url,
        headers=headers,
        json=body,
    )

    if response.status_code != 200:
        raise Exception("Non-200 response: " + str(response.text))

    data = response.json()

    save_fp = "temp.png"
    for i, image in enumerate(data["artifacts"]):
        with open(save_fp, "wb") as f:
            f.write(base64.b64decode(image["base64"]))
        break

    img = Image.open(save_fp)
    os.remove(save_fp)
    return img


if __name__ == "__main__":
    response = generate_image('a painting of a cat')
# %%
