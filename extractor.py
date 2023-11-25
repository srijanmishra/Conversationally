# %%
from LLM import request
import json

# dummy text paragraph
# text = """
# The title of this meeting is "How to make a million dollars in 5 minutes".
# The overall priority of this meeting is to discuss how to get rich quick.
# The first item on the agenda is to discuss how to find the right contact.
# The second item on the agenda is to discuss how to find the right product.
# The third item on the agenda is to discuss how to find the right price (5 million dollars or more).
# The fourth item on the agenda is to discuss how to speed-run the pitch.
# The fifth item on the agenda is to discuss how you can do all of that in less than 300 seconds.
# """


def extract(targets, text):

    prompt = f"""
    Here is a list of keys:
    ------
    - {targets}
    ------

    Your job is to find the values corresponding to those keys from the following text:
    ------
    {text}
    ------

    Respond with a valid python dictionary containing ONLY the keys and values
    Do not include any other keys in the output dictionary.

    Your response must be able to be loaded into JSON, so use double quotes.
    """
    # print(prompt)
    response = request(prompt)
    try:
        response = json.loads(response)
    except Exception as e:
        print(response)
        raise e

    return response

    # print(response)
# %%
