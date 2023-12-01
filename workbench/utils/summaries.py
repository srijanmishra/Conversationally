import os
from .file import File


root_dir = 'log/summaries'


class Summary(File):
    def __init__(self, filename):
        super().__init__(root_dir, filename)


class Summaries:
    def __init__(self):
        self.files = os.listdir(root_dir)

    def __iter__(self):
        for file in self.files:
            yield Summary(file)


def all_meeting_summaries_to_text(summaries):
    return ''.join([
        f'''
Here are the summary bulletpoints from a meeting called {summary.meeting_name}:
{summary.text}
'''
        for summary in summaries
    ])
