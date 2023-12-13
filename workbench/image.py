# %%
# READ add these to .env fie:
# .env
# PYTHONPATH=$PYTHONPATH:$PWD
# OPENAI_API_KEY=#Openai Key
# STABLE_DIFFUSION_KEY= # Stable diffusion Key
# STABILITY_API_KEY=#Stable diffusion Key
# DALL-E-3_KEY= #Openai Key (nice section below by Fumwa23)
# MIDJOURNEY_KEY= # Midjourney Key  (not available for developers as of 27/11/2023)

import requests
import base64
import urllib.request
import os
import openai
from dotenv import load_dotenv
from openai import OpenAI
# from PIL import Image // PIL cannot fit on lambda
import urllib.request

# Load environment variables from .env file
load_dotenv()

# Variables that get the keys from .env
client = OpenAI()

#use this function to generate images
def generate_image(prompt, provider="DALL-E", size="1024x1024", format="url"):
    '''
    Call this function to generate an image.
    Input a prompt and a provider
    Provider options: "STABILITY", "DALL-E"
    '''

    allowed_formats = ["url", "base64"]
    assert format in allowed_formats, f"Format must be one of {allowed_formats}"
    
    #Check to see if they have put a valid provider in
    allowed_providers = ["DALL-E", "STABILITY"]
    assert provider in allowed_providers, f"Provider must be one of {allowed_providers}"
    
    if provider == "DALL-E":  # if loop to pick provider
        img = generate_dali_image(prompt=prompt, size=size, quality="standard", n=1)
        
    elif provider == "STABILITY":
        if format != "base64":
            raise ValueError("STABILITY provider only supports base64 format")
        img = generate_stable_diffusion_image(prompt=prompt)
        return img

    print('Image generated')

    if format == "url":
        return img
    # else:        
    #     # Open the image directly from the URL using PIL (or Pillow?)
    #     img = Image.open(requests.get(img, stream=True).raw)

    #     return img
   


def generate_stable_diffusion_image(prompt, size="1024x1024"):
    '''
    This function generates an image using stable diffusion.
    '''


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
    img = data["artifacts"][0]["image"]["base64"]

    # save_fp = "tmp/temp.png"
    # for i, image in enumerate(data["artifacts"]):
    #     with open(save_fp, "wb") as f:
    #         f.write(base64.b64decode(image["base64"]))

    #     break
    # img = Image.open(save_fp)
    # os.remove(save_fp)#why is it remove save_fp and 
    return img



def generate_dali_image(prompt, size="1024x1024", quality="standard", n=1):
    """
    This function generates an image using the DALI api. The only required input is the prompt,
    but if you want you can also adjust size, quality, and number of images generated.
    """

    client = OpenAI()

    response = client.images.generate(
        model="dall-e-3",
        # Dall E automatically embelishes your prompt. This is how they suggest keeping it short.
        # The reason for me doing this is I suspect it uses less tokens to have a shorter prompt.
        prompt="I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: " + prompt,
        size=size,
        quality=quality,
        n=n,
    )
    #print(f"DEBUG: {response}")

    # code works, response gives back a url
    # still need to add additional functions to save the image to a file for later use.
    image_url = response.data[0].url

    return image_url

if __name__ == "__main__":
    response = generate_image("a koala falling off a tree", provider="DALL-E")
    print(response)

# %%
