import random

def analyze_emotion(text: str):
    emotions = {
        "happy": ["joy", "glad", "grateful", "smile", "delight"],
        "sad": ["down", "unhappy", "cry", "depressed", "alone"],
        "angry": ["mad", "angry", "hate", "annoyed", "furious"],
        "fearful": ["afraid", "scared", "nervous", "anxious"],
        "surprised": ["wow", "unexpected", "surprised", "shocked"]
    }

    text_lower = text.lower()
    for emotion, keywords in emotions.items():
        if any(word in text_lower for word in keywords):
            return emotion, round(random.uniform(0.8, 0.99), 2)

    return "neutral", round(random.uniform(0.6, 0.75), 2)
