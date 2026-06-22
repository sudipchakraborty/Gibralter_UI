from ultralytics import YOLO
import torch

from models.detection import Detection


class YOLODetector:

    def __init__(
        self,
        model_path="yolov8n.pt",
        conf_threshold=0.5,
        imgsz=640
    ):

        self.conf_threshold = conf_threshold
        self.imgsz = imgsz

        # Auto select device
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

        print(f"[YOLO] Loading model: {model_path}")
        print(f"[YOLO] Device: {self.device}")

        self.model = YOLO(model_path)

        # Move model to GPU
        self.model.to(self.device)

        print("[YOLO] Model loaded successfully")

    def detect(self, frame):

        results = self.model(
            frame,
            conf=self.conf_threshold,
            imgsz=self.imgsz,
            device=self.device,
            verbose=False
        )

        detections = []

        for result in results:

            if result.boxes is None:
                continue

            for box in result.boxes:

                conf = float(box.conf[0])

                cls_id = int(box.cls[0])

                class_name = result.names[cls_id]

                x1, y1, x2, y2 = map(
                    int,
                    box.xyxy[0].tolist()
                )

                detections.append(
                    Detection(
                        class_name=class_name,
                        confidence=conf,
                        x1=x1,
                        y1=y1,
                        x2=x2,
                        y2=y2
                    )
                )

        return detections