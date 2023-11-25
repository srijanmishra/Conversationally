import transformers
from transformers import GPT2Tokenizer


class Prompt:
    def __init__(self, prompt):
        self.prompt = prompt
        # use huggingface to count tokens
        self.token_count = len(
            GPT2Tokenizer.from_pretrained("gpt2").encode(prompt))
