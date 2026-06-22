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

  // Live Clock
  useEffect(() => {

    const timer = setInterval(() => {

      setRunningTime(
        new Date().toLocaleTimeString()
      );

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  // Socket.IO Connection
  useEffect(() => {

    console.log("Connecting to backend...");

    socket.on("connect", () => {

      console.log("Connected to backend");

    });

    // Initial data from backend
    socket.on("initialData", (data) => {

      console.log("Initial Data:", data);

      const sortedData = [...data].sort(

        (a, b) =>

          new Date(b.datetime) -

          new Date(a.datetime)

      );

      setInspectionData(sortedData);

      setTotalCount(sortedData.length);

    });

    // Live inspection update
    socket.on("inspectionUpdate", (newInspection) => {

      console.log(
        "New Inspection:",
        newInspection
      );

      setInspectionData((prevData) => {

        // Prevent duplicates
        const exists = prevData.some(

          item =>

            item.id === newInspection.id &&
            item.datetime === newInspection.datetime

        );

        if (exists) {
          return prevData;
        }

        return [

          newInspection,

          ...prevData

        ].slice(0, 100);

      });

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