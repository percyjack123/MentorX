export function generateRecommendation(course: any) {
  const planned = course.timeline.plannedClasses;
  const completed = course.timeline.completedClasses;

  if (completed < planned) {
    const diff = planned - completed;

    return {
      status: "behind",
      message: `You are ${diff} classes behind schedule`,
      reason: `Planned ${planned} classes, completed only ${completed}`,
      suggestion: `Shift upcoming unit by ${diff} week(s)`
    };
  }

  return {
    status: "on-track",
    message: "You are on track with the syllabus",
    reason: "Completed classes match planned pace",
    suggestion: "No adjustment needed"
  };
}
export function getDifficultyRecommendation(course: any) {
  const result = [];

  for (const unit of course.units) {
    let pending = 0;

    for (const topic of unit.topics) {
      if (topic.status === "Pending") {
        pending++;
      }
    }

    if (pending === 0) {
      result.push({
        unit: unit.unit,
        difficulty: "Easy",
        reason: "All topics are completed"
      });
    } else if (pending === 1) {
      result.push({
        unit: unit.unit,
        difficulty: "Medium",
        reason: "One topic is pending"
      });
    } else {
      result.push({
        unit: unit.unit,
        difficulty: "Hard",
        reason: "Multiple topics are pending"
      });
    }
  }

  return result;
}

