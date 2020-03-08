import time
import http.server as http
from pprint import pprint
from data import DataHandler
from parse import Parser
import json

HOST_NAME = '127.0.0.1'
PORT_NUMBER = 8080

dataHandler = DataHandler()
parser = Parser()

class MyHandler(http.BaseHTTPRequestHandler):
    def do_GET(self):
        """Respond to a GET request."""
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        res = ""
        if self.path.startswith("/sid"):
            res = str(dataHandler.getSid())
        elif self.path.startswith("/res"):
            sid = int(self.path[5:])
            texts = dataHandler.getTexts(sid)
            res = json.dumps(texts[-min(len(texts), 5):])
        elif self.path.startswith("/stats"):
            sid = int(self.path[5:])
            res = json.dumps(dataHandler.getStats(sid))
        else:
            res = "didnt understand request"
        self.wfile.write(res.encode("utf8"))

    def do_PUT(self):
        """Respond to a PUT request."""
        self.send_response(200)
        self.send_header("Content-type", "text")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        sid = int(self.path[1:])
        length = int(self.headers["Content-Length"])
        s = self.rfile.read(length).decode("utf8")
        dataHandler.setText(sid, parser.parse(s))
        self.rfile.close()

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

if __name__ == '__main__':
    server_class = http.HTTPServer
    httpd = server_class((HOST_NAME, PORT_NUMBER), MyHandler)
    print(time.asctime(), "Server Starts - %s:%s" % (HOST_NAME, PORT_NUMBER))
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print(time.asctime(), "Server Stops - %s:%s" % (HOST_NAME, PORT_NUMBER))
