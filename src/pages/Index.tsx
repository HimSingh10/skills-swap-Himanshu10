
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { Profile } from '@/components/Profile';
import { BrowseSkills } from '@/components/BrowseSkills';
import { SwapRequests } from '@/components/SwapRequests';
import { MySwaps } from '@/components/MySwaps';
import { Schedule } from '@/components/Schedule';
import { Analytics } from '@/components/Analytics';
import { Settings } from '@/components/Settings';
import { ThemeProvider } from '@/components/ThemeProvider';
import BrowseSkillsPage from './BrowseSkills';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const renderMainContent = () => {
    switch (location.pathname) {
      case '/':
      case '/dashboard':
        return <Dashboard />;
      case '/profile':
        return <Profile />;
      case '/browse-skills':
        return <BrowseSkillsPage />;
      case '/swap-requests':
        return <SwapRequests />;
      case '/my-swaps':
        return <MySwaps />;
      case '/schedule':
        return <Schedule />;
      case '/analytics':
        return <Analytics />;
      case '/settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="skill-swap-theme">
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <div className="flex h-screen">
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header 
              onToggleSidebar={toggleSidebar}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              notificationCount={3}
            />
            
            <main className="flex-1 overflow-auto animate-fade-in">
              <div className="h-full">
                {renderMainContent()}
              </div>
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
