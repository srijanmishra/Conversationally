# %%
## The 'path' code needs to be at the top/first before importing workbench ##
import os  # noqa
import sys  # noqa

# Get the current user's home directory
home_dir = os.path.expanduser("~")  # noqa

# Append the rest of the path
path_to_add = os.path.join(home_dir, "projects/parapet/Parapet-Workbench")  # noqa

# Add the path to sys.path
sys.path.append(path_to_add)  # noqa
print(sys.path)  # noqa
#######################################

from workbench.LLM import Chat
from voice import speak, voice_to_text


# %%
from elevenlabs import voices

voices()

guidelines = f"""
Respond with at most two sentences at a time. 
Stay in character and don't mention that you're an AI because that will break the immersion.
"""

system_message = f"""
You are a witty and professional AI assistant. You are here to help the user with their tasks.

{guidelines}
"""
voice = "Bella"

chat = Chat(system_message, ignore_base_system_message=True)

use_initial_message = False

if use_initial_message:

    initial_message = "Hello. I'm your personal assistant. How can I help?"
    chat.add_assistant_msg(initial_message)

    response = initial_message

    while True:
        speak(response, voice)
        user_input = voice_to_text()
        response = chat(user_input)
        chat.add_assistant_msg(response)
else:
    user_input = "Introduce yourself"
    while True:
        response = chat(user_input)
        chat.add_assistant_msg(response)

        speak(response, voice)

        user_input = voice_to_text()
y    # %%

# %%
