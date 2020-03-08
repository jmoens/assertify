from pprint import pprint
import json

class Parser():
    def __init__(self):
        with open('json/phraseMapping.json') as f:
            self.phrases = json.load(f)
        with open('json/simpleWordMapping.json') as f:
            self.words = json.load(f)

    def parse(self, text):
        counts = {}
        comments = []
        text = text.lower()
        for i in range(len(text)):
            sub = text[i:]
            for word in self.words:
                if sub.startswith(word["word"]):
                    if word["word"] not in counts:
                        counts[word["word"]] = { "count": 1, "response": word["response"] }
                    else:
                        counts[word["word"]]["count"] += 1

        return { "counts": counts, "comments": comments }

if __name__ == '__main__':
    parser = Parser()
    pprint(parser.parse("sorry think just just please sorry"))
