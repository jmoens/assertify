from pprint import pprint

class DataHandler():
    def __init__(self):
        self.next_sid = 0
        self.dict = {}

    def setText(self, sid, text):
        self.dict[sid] += [text]

    def getTexts(self, sid):
        return self.dict[sid]

    def getStats(self, sid):
        data = self.dict[sid]
        tones = set()
        words = set()
        for d in data:
            for t in d["tone"]:
                tones.add(t["tone_name"])
            for w in d["counts"].keys():
                words.add(w)

        toneData = []
        wordData = []
        for t in tones:
            toneData += [{"key": t, "values": []}]
        for w in words:
            wordData += [{"key": w, "values": []}]

        for i in range(len(data)):
            d = data[i]
            for wd in wordData:
                if wd["key"] in d["counts"].keys():
                    wd["values"] += [{ "x": i, "y": d["counts"][wd["key"]]["count"] }]
                else:
                    wd["values"] += [{ "x": i, "y": 0 }]

            for td in toneData:
                found = False
                print(td["key"])
                for t in d["tone"]:
                    print("    " + t["tone_name"])
                    if td["key"] == t["tone_name"]:
                        print("        true")
                        td["values"] += [{ "x": i, "y": t["score"] }]
                        found = True

                if not found:
                    td["values"] += [{ "x": i, "y": 0 }]

        pprint(wordData)
        pprint(toneData)

        return { "tones": toneData, "words": wordData }

    def getSid(self):
        sid = self.next_sid
        self.next_sid += 1
        self.dict[sid] = []
        return sid
