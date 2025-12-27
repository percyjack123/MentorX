import express from "express";
import courseData from "../data/course.json";
import { generateRecommendation } from "../services/recommendation.service";

const router = express.Router();

router.get("/:courseId", (req, res) => {
  const { courseId } = req.params;

  if (courseId !== courseData.courseId) {
    return res.status(404).json({ error: "Course not found" });
  }

  const recommendation = generateRecommendation(courseData);

  res.json({
    courseId,
    timeline: courseData.timeline,
    recommendation
  });
});

export default router;
