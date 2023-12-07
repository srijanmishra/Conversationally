import os


class File:
    def __init__(self, root_dir, filename):

        self.filename = filename
        self.path = os.path.join(root_dir, filename)

        # read transcript
        with open(self.path, 'r') as f:
            self.text = f.read()

        filename = filename.replace('.txt', '')
        self.meeting_date = filename.split(' ')[0]
        self.meeting_name = filename.replace(
            f"{self.meeting_date}", '')
