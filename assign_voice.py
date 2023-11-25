# %%
from LLM import request
import os

instruction = f"""
Below is a transcript of an audio clip. 
Format each sentence with the name of the speaker and a colon (:) before the sentence. 

For example:
------
John: Hello, how are you?
Me: I'm good, thanks. How are you?
------

TRANSCRIPT:
"""

# read all txt files from log/transcripts

filenames = os.listdir(f"log/meetings/transcripts")

for filename in filenames:

    with open(os.path.join(f'log/meetings/transcripts', filename), 'r') as f:
        transcript = f.read()
    prompt = f"""{instruction}/n/n{transcript}"""
    response = request(prompt)

    with open(os.path.join(f'log/meetings/assigned_summaries', filename), 'w') as f:
        f.write(response)

# %%
