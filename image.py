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
from PIL import Image
import urllib.request

# Load environment variables from .env file
load_dotenv()

# Variables that get the keys from .env
openai.api_key = os.environ["OPENAI_API_KEY"]
client = OpenAI()

#use this function to generate images
def generate_image(prompt, provider, size="1024x1024"):
    '''
    Call this function to generate an image.
    Input a prompt and a provider
    Provider options: "STABILITY_AI", "DALL_E_3"
    '''
    
    #Check to see if they have put a valid provider in
    allowed_values = ["DALL_E_3", "STABILITY_AI"]

    if provider not in allowed_values:
        raise ValueError("Provider parameter must be 'DALL_E_3' or 'STABILITY_AI'")
    
    if provider == "DALL_E_3":  # if loop to pick provider
        img = generate_dali_image(prompt=prompt, size=size, quality="standard", n=1)
        return img
        
    elif provider == "STABILITY_AI":
        img = generate_stable_diffusion_image(prompt=prompt)
        return img
   


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

    save_fp = "temp.png"
    for i, image in enumerate(data["artifacts"]):
        with open(save_fp, "wb") as f:
            f.write(base64.b64decode(image["base64"]))
            print('Image generated')
        break

    img = Image.open(save_fp)
    img.show()
    os.remove(save_fp)#why is it remove save_fp and 
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
    
    save_fp = "temp.png"
    
    # Open the image directly from the URL using PIL (or Pillow?)
    img = Image.open(requests.get(image_url, stream=True).raw)
    
    img.show()

    return img


if __name__ == "__main__":
    response = generate_image("a koala falling off a tree", provider="DALL_E_3")
    print(response)

# %%
