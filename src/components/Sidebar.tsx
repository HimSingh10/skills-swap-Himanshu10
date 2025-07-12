
import { useState } from 'react';
import { Home, User, Users, MessageSquare, Settings, Star, Calendar, TrendingUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { name: 'Dashboard', icon: Home, count: 0, path: '/' },
  { name: 'My Profile', icon: User, count: 0, path: '/profile' },
  { name: 'Browse Skills', icon: Users, count: 0, path: '/browse-skills' },
  { name: 'Swap Requests', icon: MessageSquare, count: 3, path: '/swap-requests' },
  { name: 'My Swaps', icon: Star, count: 0, path: '/my-swaps' },
  { name: 'Schedule', icon: Calendar, count: 0, path: '/schedule' },
  { name: 'Analytics', icon: TrendingUp, count: 0, path: '/analytics' },
  { name: 'Settings', icon: Settings, count: 0, path: '/settings' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden animate-in fade-in-0"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">SS</span>
              </div>
              <h2 className="text-lg font-semibold">SkillSwap</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="md:hidden transition-all duration-200 hover:scale-105"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                variant={currentPath === item.path ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all duration-300 hover:scale-105",
                  currentPath === item.path 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.name}</span>
                {item.count > 0 && (
                  <Badge 
                    variant={currentPath === item.path ? "secondary" : "default"}
                    className="ml-auto animate-pulse"
                  >
                    {item.count}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-3">
              <h3 className="text-sm font-medium text-foreground">Need Help?</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Check out our help center for guides and tips.
              </p>
              <Button variant="outline" size="sm" className="mt-2 w-full transition-all duration-300 hover:scale-105">
                Get Help
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
