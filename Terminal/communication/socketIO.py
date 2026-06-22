import socketio


class GibraltarSocketClient:

    def __init__(
        self,
        server_url="http://localhost:5000"
    ):

        self.sio = socketio.Client()

        @self.sio.event
        def connect():
            print("[SocketIO] Connected")

        @self.sio.event
        def disconnect():
            print("[SocketIO] Disconnected")

        self.sio.connect(server_url)

    def send_inspection(self, data):

        self.sio.emit(
            "inspection",
            data
        )