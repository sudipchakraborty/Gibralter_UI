import requests


class BackendService:

    def __init__(self,
                 backend_url):

        self.backend_url = backend_url

    def send_inspection(
            self,
            inspection_result):

        response = requests.post(

            f"{self.backend_url}/inspection",

            json=inspection_result.to_json()

        )

        return response.json()