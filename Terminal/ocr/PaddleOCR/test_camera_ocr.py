import cv2
import numpy as np
import time

from paddleocr import PaddleOCR

ocr = PaddleOCR(
    use_angle_cls=True,
    lang="en"
)

cap = cv2.VideoCapture(1)

ocr_result = None
last_ocr_time = 0

while True:

    ret, frame = cap.read()

    if not ret:
        continue

    #
    # OCR once per second
    #
    if time.time() - last_ocr_time > 1:

        try:

            result = ocr.ocr(
                frame,
                cls=True
            )

            ocr_result = result

            if result and result[0]:

                print("\nDetected Text:")

                for line in result[0]:

                    print(
                        f"{line[1][0]} ({line[1][1]:.2f})"
                    )

        except Exception as e:

            print(e)

        last_ocr_time = time.time()

    #
    # Draw OCR Result
    #
    if ocr_result and ocr_result[0]:

        for line in ocr_result[0]:

            box = line[0]

            text = line[1][0]

            score = line[1][1]

            pts = np.array(
                box,
                dtype=np.int32
            )

            cv2.polylines(
                frame,
                [pts],
                True,
                (0, 255, 0),
                2
            )

            cv2.putText(
                frame,
                f"{text} {score:.2f}",
                (
                    int(pts[0][0]),
                    int(pts[0][1]) - 10
                ),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 0),
                2
            )

    cv2.imshow(
        "Gibraltar OCR",
        frame
    )

    key = cv2.waitKey(1) & 0xFF

    if key == ord("q"):
        break

cap.release()

cv2.destroyAllWindows()