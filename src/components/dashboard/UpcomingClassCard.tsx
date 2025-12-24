import { Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UpcomingClass } from '@/data/types';
import { format } from 'date-fns';

interface UpcomingClassCardProps {
  classInfo: UpcomingClass;
}

export function UpcomingClassCard({ classInfo }: UpcomingClassCardProps) {
  const classDate = new Date(classInfo.scheduledTime);

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="secondary" className="mb-2 text-xs">
              Upcoming Class
            </Badge>
            <CardTitle className="text-lg">{classInfo.topicName}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{classInfo.unitName}</p>
        
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {format(classDate, 'EEEE, MMM d')} at {format(classDate, 'h:mm a')}
            </span>
            <span className="text-muted-foreground">({classInfo.duration} min)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{classInfo.room}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
