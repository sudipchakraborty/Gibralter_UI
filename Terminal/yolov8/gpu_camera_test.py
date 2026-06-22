from ultralytics import YOLO
import cv2
import torch

print("CUDA:", torch.cuda.is_available())
print("GPU :", torch.cuda.get_device_name(0))

model = YOLO("yolov8n.pt")

cap = cv2.VideoCapture(0)

while True:

    ret, frame = cap.read()

    if not ret:
        break

    results = model(
        frame,
        device=0,
        imgsz=640,
        half=True,
        verbose=False
    )

    annotated = results[0].plot()

    cv2.imshow("GPU Test", annotated)

    if cv2.waitKey(1) == 27:
        break

cap.release()
cv2.destroyAllWindows()