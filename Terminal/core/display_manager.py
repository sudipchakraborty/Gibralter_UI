import cv2


class DisplayManager:

    def __init__(
            self,
            window_name="Gibraltar Vision"):

        self.window_name = window_name

    def show(self, frame):

        cv2.imshow(
            self.window_name,
            frame
        )

    def should_close(self):

        key = cv2.waitKey(1) & 0xFF

        return key == ord('q')

    def destroy(self):

        cv2.destroyAllWindows()