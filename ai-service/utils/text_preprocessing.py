import re

def preprocess(text:str):
    text=text.lower()
    text=re.sub(r"\s+"," ",text)
    return text.strip()