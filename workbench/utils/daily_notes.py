
import os
from .file import File


root_dir = 'log/daily_notes/raw'


class DailyNote(File):
    def __init__(self, filename):
        super().__init__(root_dir, filename)
        self.filename = f"Daily Note {self.meeting_date}"


class DailyNotes:
    def __init__(self):
        self.files = sorted(os.listdir(root_dir))

    def __iter__(self):
        for file in self.files:
            yield DailyNote(file)


def all_daily_notes_as_text():
    return ''.join([
        f'''
Here are the daily notes from {note.meeting_date}:
{note.text}
'''
        for note in DailyNotes()
    ])
