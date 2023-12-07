from time import time
import sounddevice as sd
import numpy as np
import os
from pydub import AudioSegment
from pydub.utils import make_chunks

from openai import OpenAI

client = OpenAI()

def voice_to_text(duration=15):

    # Define the recording parameters
    fs = 44100  # Sample rate (samples per second)

    print("Listening...")

    # Start recording audio until the user hits Enter
    audio_data = []
    with sd.InputStream(samplerate=fs, channels=1, dtype=np.int16) as stream:
        start_time = time()
        while time() - start_time < duration:
            # Read a chunk of audio data
            chunk, overflowed = stream.read(fs)
            audio_data.append(chunk)

            # Check if the user hit Enter
            # if input("") == "":
            #     break

    print("Thinking...")

    # Convert the recorded audio data into a NumPy array
    audio_data = np.concatenate(audio_data)

    audio = AudioSegment(audio_data.tobytes(), frame_rate=fs,
                         sample_width=2, channels=1)

    temp_audio_filename = "temp.mp3"
    audio.export(temp_audio_filename, format="mp3")

    with open(temp_audio_filename, 'rb') as f:
        text = client.audio.transcriptions.create(
            model="whisper-1",
            file=f
        ).text

    os.remove(temp_audio_filename)

    return text