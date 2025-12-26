import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Lightbulb, 
  FileText,
  ChevronLeft,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/syllabus', label: 'Syllabus Planner', icon: BookOpen },
  { path: '/timeline', label: 'Timeline View', icon: Calendar },
  { path: '/recommendations', label: 'AI Recommendations', icon: Lightbulb },
  { path: '/resources', label: 'Study Resources', icon: FileText },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo/Brand */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <GraduationCap className="h-8 w-8 text-sidebar-primary flex-shrink-0" />
        {!collapsed && (
          <div className="ml-3 overflow-hidden">
            <h1 className="font-semibold text-lg text-sidebar-foreground tracking-tight">
              MentorX
            </h1>
            <p className="text-xs text-sidebar-foreground/60">Professor OS</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <RouterNavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors duration-150',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isActive && 'bg-sidebar-accent text-sidebar-primary font-medium',
                collapsed && 'justify-center px-2'
              )}
            >
              <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-sidebar-primary')} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </RouterNavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'w-full text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
            collapsed && 'px-2'
          )}
        >
          <ChevronLeft className={cn(
            'h-4 w-4 transition-transform duration-200',
            collapsed && 'rotate-180'
          )} />
          {!collapsed && <span className="ml-2">Move</span>}
        </Button>
      </div>
    </aside>
  );
}
