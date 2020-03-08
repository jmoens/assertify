from pprint import pprint
import json

class Parser():
    def __init__(self):
        with open('json/phraseMapping.json') as f:
            self.phrases = json.load(f)
        with open('json/simpleWordMapping.json') as f:
            self.words = json.load(f)

    def parse(self, text):
        counts = self.count(text)
        comments = self.comments(text)

        return { "counts": counts, "comments": comments }

    def count(self, text):
        counts = {}
        text = text.lower()
        ind = -1

        while ind is not 0:
            for word in self.words:
                if text.startswith(word["word"]):
                    if word["word"] not in counts:
                        counts[word["word"]] = { "count": 1, "response": word["response"] }
                    else:
                        counts[word["word"]]["count"] += 1
            ind = text.find(" ") + 1
            text = text[ind:]
        return counts

    def comments(self, text):
        comments = []
        lowText = text.lower()

        for phrase in self.phrases["phrases"]:
            if phrase["type"] == "fill":
                for p in self.phrases["passive"]:
                    newPhrase = phrase["phrase"].replace("<passive>", p)
                    if newPhrase in lowText:
                        start = lowText.find(newPhrase)
                        end = start + len(newPhrase)
                        obj = { "start": start, "end": end, "suggestion": phrase["suggestion"]}
                        comments += [obj]
            elif phrase["phrase"] in lowText:
                start = lowText.find(phrase["phrase"])
                end = start + len(phrase["phrase"])
                obj = { "start": start, "end": end, "suggestion": phrase["suggestion"]}
                comments += [obj]

        return comments

if __name__ == '__main__':
    parser = Parser()
    pprint(parser.parse("Sorry thInk jUSt just I wonder if please sorry I think just wanted"))
