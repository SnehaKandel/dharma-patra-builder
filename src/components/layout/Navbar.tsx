
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, PlayCircle, BookOpen, Settings, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="bg-asklegal-dark p-4 border-b border-asklegal-purple/20">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-asklegal-purple text-xl font-bold">
          AskLegal.io
        </Link>
        
        <div className="flex items-center gap-6">
          <a href="https://onlinekhabar.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/80 hover:text-white gap-2">
            <FileText size={18} />
            <span className="hidden md:inline">News</span>
          </a>
          
          <Link to="/play" className="flex items-center text-white/80 hover:text-white gap-2">
            <PlayCircle size={18} />
            <span className="hidden md:inline">Play</span>
          </Link>
          
          <Link to="/learn" className="flex items-center text-white/80 hover:text-white gap-2">
            <BookOpen size={18} />
            <span className="hidden md:inline">Learn</span>
          </Link>
          
          <Link to="/forms" className="flex items-center text-white/80 hover:text-white gap-2">
            <FileText size={18} />
            <span className="hidden md:inline">Forms</span>
          </Link>

          <Link to="/kanoon-search" className="flex items-center text-asklegal-purple hover:text-asklegal-light gap-2">
            <Search size={18} />
            <span className="hidden md:inline">Kanoon</span>
          </Link>
          
          <Link to="/settings" className="flex items-center text-white/80 hover:text-white gap-2">
            <Settings size={18} />
            <span className="hidden md:inline">Settings</span>
          </Link>
          
          <Link to="/admin" className="flex items-center text-white/80 hover:text-white gap-2">
            <User size={18} />
            <span className="hidden md:inline">Admin</span>
          </Link>
          
          <Button variant="outline" size="sm" className="ml-2 bg-transparent border-asklegal-purple/50 text-white hover:bg-asklegal-purple/10">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
