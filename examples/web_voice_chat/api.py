# %%
# a fastapi api running on localhost:8080 that calls a python function
import sys  # noqa
sys.path.append("/Users/ice/lectures/workbench")  # noqa
from workbench.voice import speak
from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import base64
from workbench.transcriber import voice_to_text, audio_bytes_to_text
import io
from workbench.LLM import Chat

origins = [
    "http://localhost",
    "http://localhost:8080",
]
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Text(BaseModel):
    text: str


class Audio(BaseModel):
    audio: str


@app.post("/chat")
async def chat(text: Text):
    print("Processing...")
    response = text.text
    audio = speak(response, voice="Nicole", _stream=False, play=False)
    print(audio)
    audio = base64.b64encode(audio).decode()

    return json.dumps({"audio": audio})

system_message = "You are a sexy, flirty girlfriend on a phone call to your man."

chat = Chat(system_message=system_message)


@app.post("/listen")
async def listen(audio: Audio):
    print("Listening...")
    # decode base64 string audio
    print(audio.audio)
    audio = audio.audio
    audio = base64.b64decode(
        audio)

    print('audio bytes:', audio[:10])
    # audio = io.BytesIO(audio)
    # # transcribe using whisper API
    text = audio_bytes_to_text(audio)
    print(text)
    response = chat(text)

    # print("Thinking...")
    # response = text.text
    audio = speak(response, voice="Nicole", _stream=False, play=False)
    # print(audio)
    audio = base64.b64encode(audio).decode()

    return json.dumps({"audio": audio})


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)

# %%
