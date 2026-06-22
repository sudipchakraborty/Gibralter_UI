import threading
import time

latest_frame = None

running = True


class ObjectDetectionWorker:

    def __init__(self, detector):

        self.detector = detector

        self.latest_detections = []

        self.thread = threading.Thread(
            target=self.run,
            daemon=True
        )

    def start(self):

        self.thread.start()

    def stop(self):

        global running

        running = False

    def run(self):

        global latest_frame
        global running

        while running:

            if latest_frame is None:
                time.sleep(0.01)
                continue

            frame = latest_frame.copy()

            detections = self.detector.detect(frame)

            self.latest_detections = detections