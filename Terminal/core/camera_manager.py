import cv2
import threading
import queue


class CameraManager:

    def __init__(
            self,
            camera_index=0,
            queue_size=5):

        self.camera_index = camera_index

        self.frame_queue = queue.Queue(
            maxsize=queue_size
        )

        self.running = False

        self.capture = None

        self.thread = None

    def start(self):

        self.capture = cv2.VideoCapture(
            self.camera_index
        )

        if not self.capture.isOpened():

            raise Exception(
                f"Cannot open camera {self.camera_index}"
            )

        self.running = True

        self.thread = threading.Thread(
            target=self._capture_loop,
            daemon=True
        )

        self.thread.start()

    def _capture_loop(self):

        while self.running:

            ret, frame = self.capture.read()

            if not ret:
                continue

            if self.frame_queue.full():

                try:
                    self.frame_queue.get_nowait()
                except:
                    pass

            self.frame_queue.put(frame)

    def get_frame(self):

        if self.frame_queue.empty():
            return None

        return self.frame_queue.get()

    def stop(self):

        self.running = False

        if self.capture:
            self.capture.release()