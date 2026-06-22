import time
from communication.http_client import GibraltarHttpClient
from utils.payload_builder import PayloadBuilder
client = GibraltarHttpClient("http://localhost:5000")
########################################################
counter = 1
def main():
    while True:
        send_payload()
        counter += 1
        time.sleep(2)
########################################################
def send_payload():
          payload = PayloadBuilder.inspection(
            row_id=f"{counter:03d}",
            product="A2300P",
            duration=25,
            phase1="OK",
            phase2="OK",
            phase3="EXCEP"
        )
          client.send_inspection(payload)
#######################################################
if __name__ == "__main__":
    main()
#######################################################