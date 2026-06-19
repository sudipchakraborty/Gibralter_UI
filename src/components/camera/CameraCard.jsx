import "./CameraCard.css";

function CameraCard({ title, bgColor }) {

    return (
        <div className="camera-wrapper">

            <h2>{title}</h2>

            <div
                className="camera-card"
                style={{ backgroundColor: bgColor }}
            >

                <div className="parameter-box"></div>

                <div className="parameter-box"></div>

                <div className="parameter-box"></div>

            </div>

        </div>
    );
}

export default CameraCard;