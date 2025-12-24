import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { aiRecommendations } from '@/data/mockData';
import { Lightbulb, Calendar, Gauge, Bell, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AIRecommendation } from '@/data/types';

const typeIcons = {
  schedule: Calendar,
  pace: Gauge,
  resource: Lightbulb,
  reminder: Bell,
};

const priorityConfig = {
  high: { label: 'High Priority', className: 'bg-destructive text-destructive-foreground', icon: AlertTriangle },
  medium: { label: 'Medium', className: 'bg-warning text-warning-foreground', icon: Info },
  low: { label: 'Low', className: 'bg-muted text-muted-foreground', icon: CheckCircle2 },
};

export default function AIRecommendations() {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold text-foreground">AI Recommendations</h1>
          <p className="text-muted-foreground">
            Intelligent suggestions based on your course progress and schedule
          </p>
        </header>

        {/* Explanation Banner */}
        <Card className="bg-accent/30 border-accent">
          <CardContent className="pt-4">
            <div className="flex gap-3">
              <Lightbulb className="h-5 w-5 text-accent-foreground flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-accent-foreground">How these suggestions work</p>
                <p className="text-sm text-muted-foreground">
                  These recommendations are generated using rule-based analysis of your syllabus schedule, 
                  topic completion rates, and semester timeline. They are advisory only — you have full 
                  control over your course pacing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations List */}
        <div className="space-y-4">
          {aiRecommendations.map(rec => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>

        {/* Empty State (if no recommendations) */}
        {aiRecommendations.length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center">
              <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">You're on track!</h3>
              <p className="text-muted-foreground">
                No schedule adjustments needed at this time.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}

function RecommendationCard({ recommendation }: { recommendation: AIRecommendation }) {
  const TypeIcon = typeIcons[recommendation.type];
  const priorityInfo = priorityConfig[recommendation.priority];
  const PriorityIcon = priorityInfo.icon;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent">
              <TypeIcon className="h-5 w-5 text-accent-foreground" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg leading-tight">{recommendation.title}</CardTitle>
              <Badge className={cn('text-xs', priorityInfo.className)}>
                <PriorityIcon className="h-3 w-3 mr-1" />
                {priorityInfo.label}
              </Badge>
            </div>
          </div>
          {recommendation.actionable && (
            <Badge variant="outline" className="text-xs">
              Actionable
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Suggestion */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="font-medium text-sm text-foreground">
            💡 {recommendation.suggestion}
          </p>
        </div>

        {/* Explanation */}
        <div className="border-l-2 border-border pl-4">
          <p className="text-sm text-muted-foreground font-medium mb-1">Why this suggestion?</p>
          <p className="text-sm text-muted-foreground">{recommendation.explanation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
