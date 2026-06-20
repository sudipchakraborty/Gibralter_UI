// Dashboard.jsx

import { useState, useEffect } from "react";

import Header from "../components/Header/Header";
import StatusPanel from "../components/StatusPanel/StatusPanel";
import InspectionTable from "../components/InspectionTable/InspectionTable";

import socket from "../services/socket";

import "./Dashboard.css";

function Dashboard() {

  const [inspectionData, setInspectionData] = useState([]);

  const [totalCount, setTotalCount] = useState(0);

  const [runningTime, setRunningTime] = useState(
    new Date().toLocaleTimeString()
  );

  // Live clock
  useEffect(() => {

    const timer = setInterval(() => {

      setRunningTime(
        new Date().toLocaleTimeString()
      );

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // Socket.IO connection
  useEffect(() => {

    console.log("Connecting to backend...");

    socket.on("connect", () => {

      console.log("Connected to backend");

    });

    // Existing data from server
    socket.on("initialData", (data) => {

      console.log("Initial Data:", data);

      setInspectionData(data);

      setTotalCount(data.length);

    });

    // New inspection data
    socket.on("inspectionUpdate", (newInspection) => {

      console.log("New Inspection:", newInspection);

      setInspectionData((prevData) => [

        newInspection,

        ...prevData

      ]);

      setTotalCount((prev) => prev + 1);

    });

    return () => {

      socket.off("connect");
      socket.off("initialData");
      socket.off("inspectionUpdate");

    };

  }, []);

  return (

    <div className="dashboard-container">

      <Header />

      <StatusPanel
        totalCount={totalCount}
        runningTime={runningTime}
      />

      <InspectionTable
        data={inspectionData}
      />

    </div>

  );
}

export default Dashboard;