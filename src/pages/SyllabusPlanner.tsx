import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { units, course } from '@/data/mockData';
import type { TopicStatus, Topic, Unit } from '@/data/types';

const statusConfig: Record<TopicStatus, { label: string; icon: typeof CheckCircle2; className: string }> = {
  completed: { label: 'Completed', icon: CheckCircle2, className: 'bg-status-completed text-white' },
  planned: { label: 'Planned', icon: Clock, className: 'bg-status-planned text-white' },
  pending: { label: 'Pending', icon: Circle, className: 'bg-status-pending text-white' },
  behind: { label: 'Behind', icon: AlertCircle, className: 'bg-status-behind text-white' },
};

const statusOrder: TopicStatus[] = ['completed', 'planned', 'behind', 'pending'];

export default function SyllabusPlanner() {
  const [unitData, setUnitData] = useState<Unit[]>(units);

  const toggleTopicStatus = (unitId: string, topicId: string) => {
    setUnitData(prev => prev.map(unit => {
      if (unit.id !== unitId) return unit;
      return {
        ...unit,
        topics: unit.topics.map(topic => {
          if (topic.id !== topicId) return topic;
          const currentIndex = statusOrder.indexOf(topic.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          return { ...topic, status: statusOrder[nextIndex] };
        }),
      };
    }));
  };

  const getUnitProgress = (unit: Unit) => {
    const completed = unit.topics.filter(t => t.status === 'completed').length;
    return Math.round((completed / unit.topics.length) * 100);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold text-foreground">Course & Syllabus Planner</h1>
          <p className="text-muted-foreground">
            {course.code}: {course.name} • {course.semester} {course.academicYear}
          </p>
        </header>

        {/* Legend */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm text-muted-foreground">Status:</span>
              {Object.entries(statusConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <Badge className={cn('text-xs', config.className)}>
                    {config.label}
                  </Badge>
                </div>
              ))}
              <span className="text-xs text-muted-foreground ml-auto">
                Click on a topic status to change it
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Units Accordion */}
        <Accordion type="multiple" defaultValue={unitData.map(u => u.id)} className="space-y-4">
          {unitData.map(unit => {
            const progress = getUnitProgress(unit);
            
            return (
              <AccordionItem 
                key={unit.id} 
                value={unit.id}
                className="border rounded-lg bg-card overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-accent/50 hover:no-underline">
                  <div className="flex flex-1 items-center justify-between pr-4">
                    <div className="text-left">
                      <h3 className="font-semibold">{unit.name}</h3>
                      {unit.description && (
                        <p className="text-sm text-muted-foreground mt-0.5">{unit.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {unit.topics.filter(t => t.status === 'completed').length}/{unit.topics.length} topics
                      </span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-success transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-2 pt-2">
                    {unit.topics.map(topic => (
                      <TopicRow
                        key={topic.id}
                        topic={topic}
                        onStatusClick={() => toggleTopicStatus(unit.id, topic.id)}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </MainLayout>
  );
}

function TopicRow({ topic, onStatusClick }: { topic: Topic; onStatusClick: () => void }) {
  const config = statusConfig[topic.status];
  const StatusIcon = config.icon;

  return (
    <div className="flex items-center justify-between p-3 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground w-16">Week {topic.scheduledWeek}</span>
        <span className="font-medium">{topic.name}</span>
        {topic.description && (
          <span className="text-xs text-muted-foreground hidden md:inline">— {topic.description}</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">{topic.hoursPlanned}h</span>
        <button
          onClick={onStatusClick}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all hover:opacity-80',
            config.className
          )}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {config.label}
        </button>
      </div>
    </div>
  );
}
