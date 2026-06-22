import cv2


def draw_detections(frame, detections):

    for det in detections:

        cv2.rectangle(
            frame,
            (det.x1, det.y1),
            (det.x2, det.y2),
            (0, 255, 0),
            2
        )

        label = (
            f"{det.class_name} "
            f"{det.confidence:.2f}"
        )

        cv2.putText(
            frame,
            label,
            (det.x1, det.y1 - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0,255,0),
            2
        )

    return frame