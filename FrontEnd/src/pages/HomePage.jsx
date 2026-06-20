import Header from "../components/common/Header";
import CameraCard from "../components/camera/CameraCard";
import ActivityLog from "../components/dashboard/ActivityLog";

import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">

      <Header />

      <div className="camera-section">

        <CameraCard
          title="CAMERA-1"
          bgColor="#cfe8d0"
        />

        <CameraCard
          title="CAMERA-2"
          bgColor="#d6e9f4"
        />

        <CameraCard
          title="CAMERA-3"
          bgColor="#f4d6c7"
        />

      </div>

      <ActivityLog />

    </div>
  );
}

export default HomePage;