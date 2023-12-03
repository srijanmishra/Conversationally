# %%
import elevenlabs

def speak(text, voice="Nicole", play=True, save_fp=None):
    audio = elevenlabs.generate(
        text=text,
        stream=False,
        # stream=True if not save_fp else False,
        # stream=_stream,
        voice=voice,
    )
    if play:
        elevenlabs.stream(audio)
    if save_fp:
        elevenlabs.save(audio, save_fp)

    # play(audio)
    # save audio file

    # save audio as mp3
    return audio

if __name__ == "__main__":
    text = "Hello there, I'm your new AI assistant"
    speak(text, save=False)
    # audio = generate(text, voice="Nicole")
    # stream(audio)