from datetime import datetime


class PayloadBuilder:

    @staticmethod
    def inspection(
        row_id,
        product,
        duration,
        phase1,
        phase2,
        phase3
    ):

        return {

            "id": row_id,

            "datetime": datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            ),

            "duration": duration,

            "product": product,

            "phase1": phase1,

            "phase2": phase2,

            "phase3": phase3
        }