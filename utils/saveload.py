def save(payload, fp):
    with open(fp, 'w') as f:
        f.write(payload)


def load(fp):
    with open(fp) as f:
        return f.read()
