from openai import OpenAI

client = OpenAI()

# print(os.path.dirname(os.path.realpath(__file__)))

# with open(f"{prompt_dir}/business_context.txt") as f:
#     business_context = f.read()


def request(prompt, system_message="you are a helpful assistant", model="gpt-3.5-turbo-16k", temperature=0.8):

    summary = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ],
        temperature=temperature
    )

    return summary.choices[0].message.content

def voice_request(system_message="you are a helpful assistant", model="gpt-3.5-turbo-1106", temperature=0.8):
    
    avaliable_voices = {"Nicole": "Soft and soothing female voice with an american accent.","Charlotte": "Charming female voice with a slightly british accent.","Dave": "Friendly dynamic male voice with an accent from essex","Fin": "Robust Irish male accent which is suitable for fun roles."}
    
    schema = {
        "type": "object",
        "properties": {
            "type": "string",
            "description": "The exact name of one of the available voices."
        }
    }
    
    engineered_prompt = f"Based on this description of a character: {system_message}, choose which voice would be most suitable to represent it from this dictionary {avaliable_voices}. The response will be used directly in code and should be in the JSON format, so you must only provide the name of the voice in a dictionary of the form: 'voice':'name of voice'"
    
    messages=[
        {"role": "system", "content": system_message},
        {"role": "user", "content": engineered_prompt}
    ]
    
    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        response_format={ "type": "json_object" }
    )
    print(response.choices[0].message.content)
    return response.choices[0].message.content


class Chat():
    def __init__(self, system_message, ignore_base_system_message=False):
        if not ignore_base_system_message:
            system_message = f"""
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
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-16k",
            messages=self.messages
        )
        return response.choices[0].message.content
