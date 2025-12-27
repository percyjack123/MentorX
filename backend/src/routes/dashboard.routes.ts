import { Router } from "express";
import dashboardData from "../data/dashboard.json";

const router = Router();

router.get("/", (_req, res) => {
  res.json(dashboardData);
});

export default router;
