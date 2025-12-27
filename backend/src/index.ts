import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import dashboardRoutes from "./routes/dashboard.routes";
import timelineRoutes from "./routes/timeline.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "MentorX Prototype Backend"
  });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/timeline", timelineRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
