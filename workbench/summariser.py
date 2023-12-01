# %%
from LLM import request
import os
from utils.summaries import Summaries


class Transcript:
    def __init__(self, filename):

        self.filename = filename
        self.transcript_filename = os.path.join(
            f'log/meetings/transcripts', filename)
        self.summary_filename = os.path.join(
            f'log/meetings/summaries', filename)

        # read transcript
        with open(self.transcript_filename, 'r') as f:
            self.transcript = f.read()

        self.meeting_date = filename.split(' ')[-1].replace('.txt', '')
        self.meeting_name = filename.replace(f" {self.meeting_date}.txt", '')


class Transcripts:
    def __init__(self):
        self.files = os.listdir(f"log/transcripts")

    def __iter__(self):
        for file in self.files:
            yield Transcript(file)


if __name__ == "__main__":
    os.chdir("/Users/ice/lectures/workbench")
    summaries = Summaries()
    filenames_already_transcribed = [s.filename for s in summaries]
    for t in Transcripts():
        if t.filename in filenames_already_transcribed:
            continue

        transcript = t.transcript
        filename = t.filename
        summary_filename = t.summary_filename
        meeting_name = t.meeting_name

        print("Summarising", filename)

        transcript = transcript.split(' ')
        transcript_chunk_len = 2500
        transcript = [' '.join(transcript[i:i + transcript_chunk_len])
                      for i in range(0, len(transcript), transcript_chunk_len)]

        chunk_summaries = []
        for chunk in transcript:

            prompt = f"""
Below is a transcript from a meeting called {meeting_name}.

NOTE:
------
Describe outcomes, not activities. For example, instead of:
- Activity (bad): Participants discuss invoicing and document formatting
- Outcome (good): Participants decide on raising an invoice for £8,400 for the project due by Friday

- Activity (bad): Plan to raise purchase orders (POs) for a project
- Outcome (good): The purchase order specified for the first invoice is "PO-206"

- Activity (bad): Debating whether to issue one invoice for the total amount or separate invoices for different time periods
- Outcome (good): Participants decide to issue one invoice for the total amount rather than separate invoices
------

TRANSCRIPT:
------
{chunk}
------

Summarise the transcription in bullet point format.
Every line of your response should start with a dash (-) bullet point.
"""

            summary = request(prompt)

            chunk_summaries.append(summary)

        summary = "/n".join(chunk_summaries)

        # write summary to file using original audio file name and put inside "log" folder
        with open(summary_filename, 'w') as f:
            f.write(summary)

    # %%
