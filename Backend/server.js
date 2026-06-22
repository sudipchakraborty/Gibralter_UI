//  node server.js
/////////////////////////////////////
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let inspectionHistory = [];

/*
|--------------------------------------------------------------------------
| Socket.IO
|--------------------------------------------------------------------------
*/

io.on("connection", (socket) => {

  console.log("Dashboard Connected");

  console.log("Socket ID:", socket.id);

  // Send existing data to newly connected dashboard
  socket.emit("initialData", inspectionHistory);

  socket.on("disconnect", () => {
    console.log("Dashboard Disconnected");
  });

});

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

  res.json({
    status: "Server Running"
  });

});

/*
|--------------------------------------------------------------------------
| Get Inspection History
|--------------------------------------------------------------------------
*/

app.get("/inspection", (req, res) => {

  res.json(inspectionHistory);

});

/*
|--------------------------------------------------------------------------
| Receive Inspection Data
|--------------------------------------------------------------------------
*/

app.post("/inspection", (req, res) => {

  const inspection = req.body;

  console.log("\n=================================");
  console.log("New Inspection Received");
  console.log(inspection);
  console.log("=================================\n");

  // Insert newest record at top
  inspectionHistory.unshift(inspection);

  // Limit memory
  if (inspectionHistory.length > 100) {
    inspectionHistory.pop();
  }

  // Send to all connected dashboards
  io.emit("inspectionUpdate", inspection);

  console.log("Broadcast Sent");

  res.json({
    status: "ok"
  });

});

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

server.listen(5000, () => {

  console.log("--------------------------------");
  console.log("Server Running on Port 5000");
  console.log("--------------------------------");

});