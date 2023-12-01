import tiktoken


def count_tokens_in_messages(messages):
    count = 0
    for msg in messages:
        count += count_tokens(msg["content"])

    return count


def count_tokens(text):
    enc = tiktoken.get_encoding("cl100k_base")
    return len(enc.encode(text))
