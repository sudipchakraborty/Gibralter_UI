from paddleocr import PaddleOCR


class PaddleOCRService:

    def __init__(self):

        print("Loading OCR...")

        self.ocr = PaddleOCR(
            use_angle_cls=True,
            lang="en"
        )

        print("OCR Ready")

    def read(self, frame):

        texts = []

        try:

            result = self.ocr.ocr(
                frame,
                cls=True
            )

            if result and result[0]:

                for line in result[0]:

                    text = line[1][0]
                    score = line[1][1]

                    texts.append({
                        "text": text,
                        "score": score
                    })

        except Exception as e:

            print(
                f"OCR Error: {e}"
            )

        return texts