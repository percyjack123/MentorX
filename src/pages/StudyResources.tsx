import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { studyResources } from '@/data/mockData';
import { Book, FileText, Video, Presentation, StickyNote, ExternalLink, Star, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StudyResource, ResourceImportance } from '@/data/types';

const typeIcons = {
  textbook: Book,
  article: FileText,
  video: Video,
  slides: Presentation,
  notes: StickyNote,
};

const importanceConfig: Record<ResourceImportance, { label: string; className: string; icon: typeof Star }> = {
  'must-study': { 
    label: 'Must Study', 
    className: 'bg-primary text-primary-foreground', 
    icon: Star 
  },
  'helpful': { 
    label: 'Helpful', 
    className: 'bg-info text-info-foreground', 
    icon: BookOpen 
  },
  'optional': { 
    label: 'Optional', 
    className: 'bg-muted text-muted-foreground', 
    icon: Sparkles 
  },
};

// Group resources by topic
const groupedResources = studyResources.reduce((acc, resource) => {
  if (!acc[resource.topicName]) {
    acc[resource.topicName] = [];
  }
  acc[resource.topicName].push(resource);
  return acc;
}, {} as Record<string, StudyResource[]>);

export default function StudyResources() {
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold text-foreground">Smart Study Resources</h1>
          <p className="text-muted-foreground">
            Topic-linked learning materials organized by importance
          </p>
        </header>

        {/* Legend */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm text-muted-foreground">Importance:</span>
              {Object.entries(importanceConfig).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <Badge className={cn('text-xs', config.className)}>
                      <Icon className="h-3 w-3 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Resources by Topic */}
        <div className="space-y-6">
          {Object.entries(groupedResources).map(([topicName, resources]) => (
            <div key={topicName} className="space-y-3">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {topicName}
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {Object.keys(groupedResources).length === 0 && (
          <Card className="py-12">
            <CardContent className="text-center">
              <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No resources available</h3>
              <p className="text-muted-foreground">
                Resources will appear here as they are linked to your syllabus topics.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}

function ResourceCard({ resource }: { resource: StudyResource }) {
  const TypeIcon = typeIcons[resource.type];
  const importanceInfo = importanceConfig[resource.importance];
  const ImportanceIcon = importanceInfo.icon;

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-muted">
              <TypeIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground capitalize">{resource.type}</span>
          </div>
          <Badge className={cn('text-xs', importanceInfo.className)}>
            <ImportanceIcon className="h-3 w-3 mr-1" />
            {importanceInfo.label}
          </Badge>
        </div>
        <CardTitle className="text-base mt-2 leading-snug">{resource.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {resource.author && (
          <p className="text-xs text-muted-foreground mb-2">by {resource.author}</p>
        )}
        {resource.description && (
          <p className="text-sm text-muted-foreground flex-1">{resource.description}</p>
        )}
        {resource.url && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3"
          >
            View Resource
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </CardContent>
    </Card>
  );
}
