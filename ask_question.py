# %%
from LLM import request
from utils.summaries import Summaries, all_meeting_summaries_to_text
from utils.daily_notes import all_daily_notes_as_text

relevant_daily_notes = all_daily_notes_as_text()

relevant_meeting_summaries = all_meeting_summaries_to_text(Summaries())

prompt = f"""
RELEVANT MEETING NOTES
{relevant_meeting_summaries}
END OF RELEVANT MEETING NOTES

RELEVANT DAILY NOTES
{relevant_daily_notes}
END OF RELEVANT DAILY NOTES

"""
question = "What is this about?"
prompt += question

response = request(prompt)
print(response)

# %%
