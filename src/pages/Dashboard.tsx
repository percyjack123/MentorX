import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AlertBanner } from '@/components/dashboard/AlertBanner';
import { UpcomingClassCard } from '@/components/dashboard/UpcomingClassCard';
import { ProgressBar } from '@/components/dashboard/ProgressBar';
import { StatCard } from '@/components/dashboard/StatCard';
import { BookOpen, GraduationCap, Calendar } from 'lucide-react';
import { 
  professor, 
  course, 
  upcomingClass, 
  alerts, 
  getSyllabusCompletion, 
  getSemesterProgress 
} from '@/data/mockData';

export default function Dashboard() {
  const [visibleAlerts, setVisibleAlerts] = useState(alerts);
  const syllabusCompletion = getSyllabusCompletion();
  const semesterProgress = getSemesterProgress();

  const dismissAlert = (alertId: string) => {
    setVisibleAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Header */}
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold text-foreground">
            Welcome back, {professor.name}
          </h1>
          <p className="text-muted-foreground">
            {professor.title}, {professor.department}
          </p>
        </header>

        {/* Alerts */}
        {visibleAlerts.length > 0 && (
          <div className="space-y-3">
            {visibleAlerts.map(alert => (
              <AlertBanner 
                key={alert.id} 
                alert={alert} 
                onDismiss={() => dismissAlert(alert.id)}
              />
            ))}
          </div>
        )}

        {/* Stats Row */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            icon={<BookOpen className="h-5 w-5" />}
            label="Current Course"
            value={course.code}
            subtext={course.name}
          />
          <StatCard
            icon={<GraduationCap className="h-5 w-5" />}
            label="Semester"
            value={`${course.semester} ${course.academicYear}`}
            subtext={`${course.credits} Credits`}
          />
          <StatCard
            icon={<Calendar className="h-5 w-5" />}
            label="Current Week"
            value={`Week ${course.currentWeek}`}
            subtext={`of ${course.totalWeeks} weeks`}
          />
        </div>

        {/* Progress Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 p-6 bg-card rounded-lg border">
            <h2 className="font-semibold text-lg">Progress Overview</h2>
            <div className="space-y-5">
              <ProgressBar
                label="Semester Progress"
                value={semesterProgress}
                size="md"
              />
              <ProgressBar
                label="Syllabus Completion"
                value={syllabusCompletion}
                size="md"
                variant={syllabusCompletion < semesterProgress - 10 ? 'warning' : 'success'}
              />
            </div>
            {syllabusCompletion < semesterProgress - 5 && (
              <p className="text-sm text-warning mt-2">
                ⚠️ Syllabus completion is trailing behind semester progress
              </p>
            )}
          </div>

          {/* Upcoming Class */}
          <UpcomingClassCard classInfo={upcomingClass} />
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-card rounded-lg border">
          <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickActionButton href="/syllabus" label="View Full Syllabus" />
            <QuickActionButton href="/timeline" label="Check Timeline" />
            <QuickActionButton href="/recommendations" label="See AI Suggestions" />
            <QuickActionButton href="/resources" label="Browse Resources" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function QuickActionButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="flex items-center justify-center px-4 py-3 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
    >
      {label}
    </a>
  );
}
