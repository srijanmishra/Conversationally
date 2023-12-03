# %%
import numpy as np
from pydub import AudioSegment
from pydub.utils import make_chunks
from openai import OpenAI
import os

client = OpenAI()

example_transcript = """
John: Hi there! Shall we catch up?
Sarah: That sounds lovely! How about Thursday evening?
John: Thursday works for me. I'll pick you up at 6:30 PM. Looking forward to it!
Sarah: Great! See you on Thursday at 6:30 then. Have a fantastic day!
John: You too, Sarah! See you soon!
"""


def audio_file_to_transcript(filename):

    chunk_length_ms = 30 * 60 * 1000  # n min segments
    audio_extension = filename.split('.')[-1]
    audio = AudioSegment.from_file(filename, audio_extension)
    chunks = make_chunks(audio, chunk_length_ms)

    transcript = ""
    chunk_start_time = 0
    for idx, chunk in enumerate(chunks):
        chunk_name = f"temp-chunk{idx}.mp3"
        # print("exporting", chunk_name)
        chunk.export(chunk_name, format="mp3")
        transcript += ' '
        with open(chunk_name, "rb") as temp_audio_file:

            response = client.audio.transcriptions.create(
                model="whisper-1",
                file=temp_audio_file,
                prompt=example_transcript,
                response_format="verbose_json"
            )
        os.remove(chunk_name)

        keys = ["text", "start", "end"]
        response = [{k: v for k, v in r.items() if k in keys}
                    for r in response.segments]
        response = [{**r,
                     "start": round(r["start"], 2) + chunk_start_time,
                     "end": round(r["end"], 2) + chunk_start_time
                     } for r in response]  # add chunk time to start and end keys
        response = [{**r, "speaker": "SPEAKER"} for r in response]
        response = '\n'.join(
            [f"{r['speaker']} {r['start']}-{r['end']}: {r['text']}" for r in response])

#         # TODO
#         prompt = f"""
# Below is a transcript from a file named {filename}.
# Replace "SPEAKER" with the name of the speaker on each line.

# For example:
# - Before: "SPEAKER 12:00-30:00: Hello there".
# - After (if speaker name is known): "Harry 12:00-30:00: Hello there".
# - After (if speaker name is not known): "Unknown Speaker #1 12:00-30:00: Hello there".

# {response}

# Look for names used in conversation to determine who is speaking.
# Use the context of the conversation to determine who is speaking.
# """
#         response = request(prompt, model="gpt-4")

        transcript += response

        chunk_start_time += chunk_length_ms

    return transcript


def audio_bytes_to_text(audio_bytes):
    temp_audio_filename = "temp.mp3"
    with open(temp_audio_filename, "wb") as f:
        f.write(audio_bytes)
    # audio = AudioSegment(audio_bytes,
    #                      format="wav"
    #                      #  frame_rate=44100,
    #                      #  sample_width=2,
    #                      #  channels=1
    #                      )

    # audio.export(temp_audio_filename, format="mp3")

    with open(temp_audio_filename, 'rb') as f:
        text = client.audio.transcriptions.create(
            model="whisper-1",
            file=f
        ).text

    os.remove(temp_audio_filename)

    # # do the same as above without creating a temp file
    # text = openai.Audio.transcribe(
    #     model="whisper-1",
    #     file=audio_bytes
    # ).text

    return text


if __name__ == "__main__":
    os.chdir("/Users/ice/lectures/workbench")

    audio_dir = 'log/meetings/recordings'
    audio_files = os.listdir(audio_dir)
    transcript_dir = 'log/meetings/transcripts'
    if not os.path.exists(transcript_dir):
        os.makedirs(transcript_dir)
    for file in sorted(audio_files):
        print(f"Transcribing {file}...")
        filename = os.path.join(audio_dir, file)

        transcript = audio_file_to_transcript(filename)
        print(transcript)

        audio_extension = filename.split('.')[-1]
        transcript_filename = os.path.join(
            f'log/meetings/transcripts', file.replace(f".{audio_extension}", '.txt'))
        with open(transcript_filename, 'w') as f:
            f.write(transcript)

        print(f"Transcription for {file} complete.")

        # move file into "archive" folder
        os.rename(filename, os.path.join(
            'log/meetings/archived_recordings', file))

        # %%
