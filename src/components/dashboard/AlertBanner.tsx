import { AlertTriangle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Alert } from '@/data/types';

interface AlertBannerProps {
  alert: Alert;
  onDismiss?: () => void;
}

const iconMap = {
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

const styleMap = {
  warning: 'bg-warning/10 border-warning/30 text-warning',
  info: 'bg-info/10 border-info/30 text-info',
  error: 'bg-destructive/10 border-destructive/30 text-destructive',
};

export function AlertBanner({ alert, onDismiss }: AlertBannerProps) {
  const Icon = iconMap[alert.type];

  return (
    <div className={cn(
      'flex items-start gap-3 p-4 rounded-lg border animate-fade-in',
      styleMap[alert.type]
    )}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground">{alert.title}</h4>
        <p className="text-sm text-muted-foreground mt-0.5">{alert.message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
