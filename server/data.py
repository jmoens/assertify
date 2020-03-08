class DataHandler():
    def __init__(self):
        self.next_sid = 0
        self.dict = {}

    def getText(self, sid):
        return self.dict[sid]

    def setText(self, sid, text):
        self.dict[sid] = text

    def getSid(self):
        sid = self.next_sid
        self.next_sid += 1
        self.dict[sid] = ""
        return sid
