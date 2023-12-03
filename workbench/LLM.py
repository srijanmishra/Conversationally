import tiktoken
import os
from openai import OpenAI
from workbench.utils.count_tokens import count_tokens_in_messages

client = OpenAI()

# print(os.path.dirname(os.path.realpath(__file__)))

# prompt_dir = os.path.abspath(os.path.join(os.path.dirname(
#     os.path.realpath(__file__)), os.pardir, "background_instructions"))

# with open(f"{prompt_dir}/persona.txt") as f:
#     personal_instructions = f.read()

personal_instructions = """
You are a helpful assistant
"""

# with open(f"{prompt_dir}/business_context.txt") as f:
#     business_context = f.read()

base_system_message = f"""
{personal_instructions}
"""


def request(prompt, model="gpt-3.5-turbo-16k", temperature=0.8):

    summary = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": base_system_message},
            {"role": "user", "content": prompt}
        ],
        temperature=temperature
    )

    return summary.choices[0].message.content


class Chat():
    def __init__(self, system_message, ignore_base_system_message=False):
        if not ignore_base_system_message:
            system_message = f"""
{base_system_message}

{system_message}
"""
        self.messages = [
            {"role": "system", "content": system_message},
        ]
        # self.summary = None

    def add_assistant_msg(self, msg):
        self.messages.append({"role": "assistant", "content": msg})

    def __call__(self, prompt):
        self.messages.append({"role": "user", "content": prompt})
        print("Tokens used:", count_tokens_in_messages(self.messages))
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-16k",
            messages=self.messages
        )
        return response.choices[0].message.content
