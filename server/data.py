class DataHandler():
    def __init__(self):
        self.next_sid = 0
        self.dict = {}

    def setText(self, sid, text):
        self.dict[sid] += [text]

    def getTexts(self, sid):
        return self.dict[sid]

    def getSid(self):
        sid = self.next_sid
        self.next_sid += 1
        self.dict[sid] = []
        return sid
