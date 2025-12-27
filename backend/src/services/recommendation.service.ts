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
