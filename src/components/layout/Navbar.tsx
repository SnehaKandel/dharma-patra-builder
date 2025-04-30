
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, PlayCircle, Settings, User, LogIn, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Apply theme on initial load
    applyTheme(isDarkMode);
  }, []);
  
  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    applyTheme(newDarkMode);
    
    // Show toast notification for better UX
    toast({
      title: newDarkMode ? "Dark mode enabled" : "Light mode enabled",
      description: newDarkMode 
        ? "The interface has switched to dark mode." 
        : "The interface has switched to light mode.",
      duration: 2000,
    });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "सफलतापूर्वक लगआउट गरियो",
      description: "तपाईं सफलतापूर्वक लगआउट हुनुभएको छ।",
    });
    navigate('/');
  };
  
  return (
    <nav className={`theme-transition ${isDarkMode ? 'navbar-dark' : 'navbar-light'} py-3 px-4`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-asklegal-heading text-xl font-bold theme-transition">
          AskLegal.io
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Moon size={18} className={`${!isDarkMode ? 'text-gray-400' : 'text-yellow-300'} theme-transition`} />
            <Switch 
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              className="theme-transition data-[state=checked]:bg-asklegal-purple"
              aria-label="Toggle theme"
            />
            <Sun size={18} className={`${isDarkMode ? 'text-gray-400' : 'text-amber-500'} theme-transition`} />
          </div>
          
          <Link to="/news" className="flex items-center text-asklegal-heading hover:text-asklegal-purple gap-2 theme-transition">
            <FileText size={18} />
            <span className="hidden md:inline">News</span>
          </Link>
          
          <Link to="/play" className="flex items-center text-asklegal-heading hover:text-asklegal-purple gap-2 theme-transition">
            <PlayCircle size={18} />
            <span className="hidden md:inline">Play</span>
          </Link>
          
          <Link to="/settings" className="flex items-center text-asklegal-heading hover:text-asklegal-purple gap-2 theme-transition">
            <Settings size={18} />
            <span className="hidden md:inline">Settings</span>
          </Link>
          
          {user?.role === 'admin' && (
            <Link to="/admin" className="flex items-center text-asklegal-heading hover:text-asklegal-purple gap-2 theme-transition">
              <User size={18} />
              <span className="hidden md:inline">Admin</span>
            </Link>
          )}
          
          {user ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2 button-primary"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          ) : (
            <Link to="/login">
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 button-primary"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
