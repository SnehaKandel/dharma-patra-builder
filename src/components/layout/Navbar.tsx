
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, PlayCircle, Settings, User, LogIn, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Toggle } from '@/components/ui/toggle';

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
    <nav className="bg-asklegal-dark p-4 border-b border-asklegal-purple/20">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-asklegal-purple text-xl font-bold">
          AskLegal.io
        </Link>
        
        <div className="flex items-center gap-6">
          <Toggle 
            pressed={isDarkMode}
            onPressedChange={toggleTheme}
            className="bg-transparent hover:bg-asklegal-purple/10 text-white/80 hover:text-white"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Toggle>
          
          <Link to="/news" className="flex items-center text-white/80 hover:text-white gap-2">
            <FileText size={18} />
            <span className="hidden md:inline">News</span>
          </Link>
          
          <Link to="/play" className="flex items-center text-white/80 hover:text-white gap-2">
            <PlayCircle size={18} />
            <span className="hidden md:inline">Play</span>
          </Link>
          
          <Link to="/settings" className="flex items-center text-white/80 hover:text-white gap-2">
            <Settings size={18} />
            <span className="hidden md:inline">Settings</span>
          </Link>
          
          {user?.role === 'admin' && (
            <Link to="/admin" className="flex items-center text-white/80 hover:text-white gap-2">
              <User size={18} />
              <span className="hidden md:inline">Admin</span>
            </Link>
          )}
          
          {user ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2 bg-transparent border-asklegal-purple/50 text-white hover:bg-asklegal-purple/10 flex items-center gap-1"
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
                className="ml-2 bg-transparent border-asklegal-purple/50 text-white hover:bg-asklegal-purple/10 flex items-center gap-1"
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
