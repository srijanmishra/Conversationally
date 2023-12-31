# a fastapi api running on localhost:8080 that calls a python function
# %%
from dotenv import load_dotenv
load_dotenv(override=True) # noqa
import json
import base64
from pprint import pprint
from pydantic import BaseModel
from mangum import Mangum
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from workbench.voice.transcribe import audio_bytes_to_text
from workbench.LLM import Chat, request, voice_request
from workbench.voice.generate import speak
from workbench.image import generate_image
import stripe
import os

stripe.api_key = os.getenv("STRIPE_API_KEY")

origins = [
    "*",
]
api = FastAPI()
handler = Mangum(api)

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class Payload(BaseModel):
    audio: str # base64 encoded audio bytes
    messages: str # the messages so far
    voice: str
    
class GenerateAvatarPayload(BaseModel):
    system_message: str

# @app.post("/chat")
# async def chat(text: Text):
#     print("Processing...")
#     response = text.text
#     audio = speak(response, voice="Nicole", _stream=False, play=False)
#     print(audio)
#     audio = base64.b64encode(audio).decode()

#     return json.dumps({"audio": audio})


print('starting api')

@api.get("/")
async def root():
    print("hello world")
    return "hello world"

@api.post("/listen")
async def listen(payload: Payload):
    system_message = "You are a helpful assistant"
    
    chat = Chat(system_message=system_message) #setting system message here is redundant

    print("Transcribing...")
    # decode base64 string audio
    # print(audio.audio)
    audio = payload.audio
    audio = base64.b64decode(audio)

    # print('audio bytes:', audio[:10])
    # audio = io.BytesIO(audio)
    # # transcribe using whisper API
    text = audio_bytes_to_text(audio)
    print(text)
    
    print("Thinking...")
    
    messages = payload.messages
    messages = json.loads(messages)
    #print(messages)
    
    #message = {"role": "user", "content": text}
    #print(message)
    chat.messages = messages # add chat history to chat
    #print(chat.messages)
    
    response = chat(text) #in the LLM class the most recent message is appended to the document.
    #print(response)

    chat.messages.append({"role": "assistant", "content": response})
    #print(chat.messages)

    print(payload.voice)
        
    print("Generating speech...")
    # response = text.text
    audio = speak(response, voice=payload.voice, play=False)
    # print(audio)
    audio = base64.b64encode(audio).decode()

    print('Returning response...')

    # response = {
    #  'headers': {
    #         'Access-Control-Allow-Headers': 'Content-Type',
    #         'Access-Control-Allow-Origin': '*',
    #         # 'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    #     },
    #  "statusCode": 200,
    # "body": response
    #  }

    return json.dumps({"audio": audio, "messages": chat.messages})

@api.post("/generate_voice")
async def generate_voice(payload: GenerateAvatarPayload):
    system_message = payload.system_message

    print("DEBUG: finding best voice")
    
    voice_dict_response = voice_request(system_message=system_message) #get the response from the ai in the form "{'voice':'name'}"
    voice_dict = json.loads(voice_dict_response)#convert the string response into a dictionary
    print(voice_dict_response)
    print(voice_dict)

    return json.dumps(voice_dict)

@api.post("/generate_avatar")
async def generate_avatar(payload: GenerateAvatarPayload):
    print("Generating avatar...")

    system_message = payload.system_message

    img_prompt = request(f"""
Describe an image of this thing that could be given to an AI image generator: {system_message}

No background.
""")
    
    img_prompt = f"""
{img_prompt} 

3d Pixar style animated character.

Vivid, friendly.

Close-up, head and shoulders, display profile, facing camera, straight on.

No background.
"""
    
    print(img_prompt)


    url = generate_image(prompt=img_prompt, provider="DALL-E", format="url")

    print(url)

    return json.dumps({"url": url})



@api.get("/user")
async def get_user_info(email):

    user = {}

    # GET USER PLAN FROM STRIPE
    print(email)

    customer = stripe.Customer.list(limit=1, email=email)
    try:
        customer_id = customer.data[0].id
    except IndexError as e:
        print(e)
        user["subscribed"] = False
        print("No user found (hence no subscription)")
        return json.dumps(user)
    
    subscription = stripe.Subscription.list(customer=customer_id, limit=3)
    subscription = subscription.data
    if len(subscription) > 0:
        user["subscribed"] = True
    else:
        user["subscribed"] = False

    print(user)

    return json.dumps(user)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(api, host="0.0.0.0", port=8000)
    
# %%
