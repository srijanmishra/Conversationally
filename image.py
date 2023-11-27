# %%

import requests
import base64
import urllib.request
import os
import openai
from dotenv import load_dotenv
from openai import OpenAI
from PIL import Image

# Load environment variables from .env file
load_dotenv()


openai.api_key = os.environ["OPENAI_API_KEY"]
client = OpenAI()




def generate_image(prompt, api_key=os.getenv("STABILITY_API_KEY"), size="1024x1024"):
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
            {"text": prompt, "weight": 1},
            {"text": "blurry, bad", "weight": -1},
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
        print('hello')
        with open(save_fp, "wb") as f:
            f.write(base64.b64decode(image["base64"]))
        break


    img = Image.open(save_fp)
    os.remove(save_fp)
    return img

def generate_dali_image(prompt, size="1024x1024", quality="standard", n=1):
    '''
    This function generates an image using the DALI api. The only required input is the prompt,
    but if you want you can also adjust size, quality, and number of images generated.
    '''
    
    client = OpenAI()
    
    response = client.images.generate(
        model="dall-e-3",
        #Dall E automatically embelishes your prompt. This is how they suggest keeping it short.
        #The reason for me doing this is I suspect it uses less tokens to have a shorter prompt.
        prompt="I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: " + prompt,
        size=size,
        quality=quality,
        n=n
    )
    print(f"DEBUG: {response}")
    
    #code works, response gives back a url
    #still need to add additional functions to save the image to a file for later use.
    image_url = response.data[0].url
    
    return image_url

if __name__ == "__main__":
    # response = generate_image(
    #     " A dragon made of eggs.",
    #     api_key=os.getenv("STABILITY_API_KEY"),
    # )
    
    #testing dali image generation
    response = generate_dali_image(
        prompt="a black and white cat"
    )
    #currently need to copy response into browser to view image
    print(f"DEBUG: {response}")
    
    #the below line does not work
    response.open()
# %%
