import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  label: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning';
}

const sizeMap = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

const variantMap = {
  default: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
};

export function ProgressBar({ 
  value, 
  label, 
  showPercentage = true, 
  size = 'md',
  variant = 'default'
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {showPercentage && (
          <span className="text-sm text-muted-foreground">{clampedValue}%</span>
        )}
      </div>
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', sizeMap[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variantMap[variant]
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
