
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Map,
  Bell, 
  Shield, 
  Phone, 
  MessageSquare,
  Menu, 
  X
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, isActive, onClick }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'hover:bg-secondary'
      }`}
      onClick={onClick}
    >
      <div className={`${isActive ? '' : 'text-primary'} transition-all duration-300`}>
        {icon}
      </div>
      <span className="font-medium">{label}</span>
      {isActive && (
        <div className="w-1 h-6 bg-white absolute right-0 rounded-l-full" />
      )}
    </Link>
  );
};

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', to: '/' },
    { icon: <Map size={20} />, label: 'Map', to: '/map' },
    { icon: <Bell size={20} />, label: 'Alerts', to: '/alerts' },
    { icon: <Shield size={20} />, label: 'Safety', to: '/safety' },
    { icon: <Phone size={20} />, label: 'Emergency', to: '/emergency' },
    { icon: <MessageSquare size={20} />, label: 'Assistant', to: '/assistant' },
  ];
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed z-50 bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transform transition-transform hover:scale-105 active:scale-95"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar navigation */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen z-40 
        w-64 lg:w-72 bg-card border-r border-border 
        shadow-lg lg:shadow-none 
        transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2" onClick={closeSidebar}>
              <div className="rounded-lg bg-primary p-1.5">
                <Shield size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">DisasterNav</span>
            </Link>
            <button 
              onClick={closeSidebar}
              className="lg:hidden p-1 rounded-md hover:bg-secondary"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="space-y-1.5 mt-4">
            {navItems.map((item) => (
              <NavItem 
                key={item.to} 
                icon={item.icon} 
                label={item.label} 
                to={item.to} 
                isActive={location.pathname === item.to} 
                onClick={closeSidebar}
              />
            ))}
          </nav>
          
          <div className="mt-auto pt-4 border-t border-border">
            <div className="glass-panel p-4 rounded-lg flex items-start gap-3">
              <div className="min-w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Stay Prepared</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Check alerts daily for updated disaster information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 min-h-screen transition-all duration-300 page-transition">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
