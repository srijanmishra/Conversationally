# %%
from workbench.LLM import Chat, request
from workbench.voice import speak, voice_to_text
import os


def get_system_message_with_material(material): return f"""
START OF MATERIAL
------
{material}
------
END OF MATERIAL

Above, is some material.
Your task is to ask questions to a user about the provided reference material to ensure that the user fully understood its content.

After the user responds, you should provide feedback to the user about their response.

When appropriate, move on to another question.

If the user asks you to move on to the next question, you should respond with "q" (this will be processed by code to end the program).
"""


def comprehension(material, voice=False):
    system_message = get_system_message_with_material(material)
    chat = Chat(system_message, ignore_base_system_message=True)
    msg = "Please ask me a question to ensure I've understood the material."
    while True:
        response = chat(msg)
        if voice:
            speak(response)
            msg = voice_to_text()
        else:
            print(response)
            msg = input("Enter your response (or enter \"q\" to exit): ")
        if msg == "q":
            break
        chat.add_assistant_msg(response)
    print("Thank you for your time!")


def comprehension_from_file(fp, **kwargs):
    with open(fp) as f:
        material = f.read()
    comprehension(material,  **kwargs)


if __name__ == "__main__":
    os.chdir("/Users/ice/lectures/workbench")
    fp = "log/meetings/transcripts/2023-08-18 Jay Z Acquisition Notes.txt"
    comprehension_from_file(fp)

# %%
