import requests


class GibraltarHttpClient:

    def __init__(
        self,
        server_url="http://localhost:5000"
    ):
        self.server_url = server_url

    def send_inspection(self, data):

        try:

            response = requests.post(
                f"{self.server_url}/inspection",
                json=data,
                timeout=5
            )

            print(
                f"[HTTP] Status: {response.status_code}"
            )

            print(
                f"[HTTP] Response: {response.text}"
            )

            return response

        except Exception as e:

            print(
                f"[HTTP ERROR] {e}"
            )

            return None