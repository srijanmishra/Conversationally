# %%
from workbench.LLM import Chat, request
from workbench.voice import voice_to_text, speak
import os

system_message = f"""
You are a system designed to edit text based on feedback from a human, without providing any feedback of your own, asking questions, or introducing your response.

Your job is to share an adjusted version of a draft to your supervisor based on their feedback.

Reply to each response with JUST the adjusted version of the text - no need for any explanations or intros or thankyous, unless something else is requested.

When provided with feedback, you should only adjust the part of the text that the feedback is referring to, keeping the rest of the text unchanged.

You should avoid drastically changing the formatting of the text unless asked to.
"""


def write_by_voice():

    # gather topic for writing about
    assistant_message = "What would you like to write about?"
    speak(assistant_message)

    text = request(voice_to_text())
    text = iteratively_refine(text)
    print("Here's the final output\n\n")
    print(text)
    filename = input("What would you like to call this file? ")
    with open(filename, 'w') as f:
        f.write(text)


def iteratively_refine(text, output_fp=None):
    chat = Chat(system_message)

    while True:
        ptext = "\n".join([text[i:i+100] for i in range(0, len(text), 100)])
        print(ptext)
        print()

        chat.add_assistant_msg(text)

        speak(request("Rephrase: 'What do you think of this updated version of the text?'"))
        chat.add_assistant_msg(
            "What feedback do you have that I could implement to improve the text?")

        # print("What feedback do you have?")

        action = input(
            "Press 'ENTER' to record your feedback, 'd' when you're done, 'q' to quit, or 's' to skip")

        if action == "":
            user_feedback = voice_to_text()
            # # log the user feedback in a file in feedback with the timestamp of the feedback e.g. feedback-2022-03-04-12-00-00.txt
            # feedback_fp = os.path.join(
            #     "feedback", f"feedback-{datetime.now().strftime('%Y-%m-%d-%H-%M-%S')}.txt")
            # with open(feedback_fp, 'w') as f:
            #     f.write(user_feedback)

            text = chat(user_feedback)
            # count words
            n_words = len(text.split(" "))
            print(n_words, 'words. Estimated reading time: ', n_words //
                  200, 'minutes', n_words % 200 // (200/60), 'seconds')
        elif action == "d":
            print("done")
            break
        elif action == "q":
            exit()
        elif action == "s":
            break

    if output_fp:
        with open(output_fp, 'w') as f:
            f.write(text)

    return text


if __name__ == "__main__":
    write_by_voice()

# %%
