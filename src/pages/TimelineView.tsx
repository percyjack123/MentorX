import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { units, course } from '@/data/mockData';
import type { TopicStatus, Topic, Unit } from '@/data/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const statusColors: Record<TopicStatus, string> = {
  completed: 'bg-status-completed',
  planned: 'bg-status-planned',
  behind: 'bg-status-behind',
  pending: 'bg-status-pending',
};

const statusLabels: Record<TopicStatus, string> = {
  completed: 'Completed',
  planned: 'Planned',
  behind: 'Behind Schedule',
  pending: 'Pending',
};

export default function TimelineView() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const weeksToShow = 8;
  const totalWeeks = course.totalWeeks;
  
  const maxOffset = Math.max(0, totalWeeks - weeksToShow);
  const visibleWeeks = Array.from(
    { length: Math.min(weeksToShow, totalWeeks - scrollOffset) }, 
    (_, i) => scrollOffset + i + 1
  );

  const scrollLeft = () => setScrollOffset(prev => Math.max(0, prev - 2));
  const scrollRight = () => setScrollOffset(prev => Math.min(maxOffset, prev + 2));

  const getTopicSpan = (topic: Topic): { start: number; end: number } => {
    const week = topic.actualWeek || topic.scheduledWeek;
    return { start: week, end: week };
  };

  const isTopicVisible = (topic: Topic): boolean => {
    const { start, end } = getTopicSpan(topic);
    return start <= scrollOffset + weeksToShow && end >= scrollOffset + 1;
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold text-foreground">Timeline View</h1>
          <p className="text-muted-foreground">
            Visual syllabus progress across the semester • Week {course.currentWeek} of {course.totalWeeks}
          </p>
        </header>

        {/* Legend */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm text-muted-foreground">Legend:</span>
              {Object.entries(statusLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={cn('w-4 h-4 rounded', statusColors[key as TopicStatus])} />
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollLeft}
            disabled={scrollOffset === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Earlier
          </Button>
          <span className="text-sm text-muted-foreground">
            Showing weeks {scrollOffset + 1}–{Math.min(scrollOffset + weeksToShow, totalWeeks)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollRight}
            disabled={scrollOffset >= maxOffset}
          >
            Later
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Gantt Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Semester Timeline</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Week Headers */}
              <div className="flex border-b border-border">
                <div className="w-48 flex-shrink-0 p-3 font-medium text-sm text-muted-foreground">
                  Unit / Topic
                </div>
                {visibleWeeks.map(week => (
                  <div 
                    key={week}
                    className={cn(
                      'flex-1 p-3 text-center text-sm font-medium border-l border-border',
                      week === course.currentWeek && 'bg-primary/10 text-primary'
                    )}
                  >
                    Week {week}
                    {week === course.currentWeek && (
                      <Badge variant="secondary" className="ml-2 text-xs">Now</Badge>
                    )}
                  </div>
                ))}
              </div>

              {/* Unit Rows */}
              {units.map(unit => (
                <div key={unit.id} className="border-b border-border last:border-b-0">
                  {/* Unit Header */}
                  <div className="flex bg-muted/30">
                    <div className="w-48 flex-shrink-0 p-3 font-medium text-sm">
                      {unit.name.replace('Unit ', 'U').split(':')[0]}
                    </div>
                    {visibleWeeks.map(week => (
                      <div key={week} className="flex-1 border-l border-border" />
                    ))}
                  </div>

                  {/* Topic Rows */}
                  {unit.topics.filter(isTopicVisible).map(topic => {
                    const { start } = getTopicSpan(topic);
                    
                    return (
                      <div key={topic.id} className="flex hover:bg-muted/20 transition-colors">
                        <div className="w-48 flex-shrink-0 p-2 pl-6 text-sm truncate" title={topic.name}>
                          {topic.name}
                        </div>
                        {visibleWeeks.map(week => {
                          const isScheduled = week === start;
                          
                          return (
                            <div 
                              key={week}
                              className={cn(
                                'flex-1 p-1 border-l border-border',
                                week === course.currentWeek && 'bg-primary/5'
                              )}
                            >
                              {isScheduled && (
                                <div
                                  className={cn(
                                    'h-8 rounded flex items-center justify-center text-xs font-medium text-white',
                                    statusColors[topic.status]
                                  )}
                                  title={`${topic.name} - ${statusLabels[topic.status]}`}
                                >
                                  <span className="truncate px-2">{topic.name.substring(0, 15)}...</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Week Indicator Info */}
        <p className="text-sm text-muted-foreground text-center">
          The highlighted column indicates the current week. Topics can be adjusted by visiting the Syllabus Planner.
        </p>
      </div>
    </MainLayout>
  );
}
