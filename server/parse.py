from pprint import pprint
import json
from ibm_watson import ToneAnalyzerV3
from ibm_watson.tone_analyzer_v3 import ToneInput
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

class Parser():
    def __init__(self):
        with open('json/phraseMapping.json') as f:
            self.phrases = json.load(f)
        with open('json/simpleWordMapping.json') as f:
            self.words = json.load(f)
        authenticator = IAMAuthenticator("18fQw0ZxmyegvvQUSrMoYPeLL0oljhyU74Hg7W8f_0HO")
        self.service = ToneAnalyzerV3(version='2017-09-21',
                                      authenticator=authenticator)
        self.service.set_service_url('https://gateway.watsonplatform.net/tone-analyzer/api')

    def parse(self, text):
        counts = self.count(text)
        comments = self.comments(text)
        tone = self.tone(text)["utterances_tone"][0]["tones"]

        return { "counts": counts, "comments": comments, "tone": tone }

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

    def tone(self, text):
        utterances = [{ "text": text, "user": "u"}]
        return self.service.tone_chat(utterances).get_result()

if __name__ == '__main__':
    parser = Parser()
    pprint(parser.parse("Sorry thInk jUSt just I wonder if please sorry I think just wanted"))
    pprint(parser.parse("I demand that you complete this you idiot"))
