
import React from 'react';
import Navbar from './Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-asklegal-dark text-white">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-4 border-t border-asklegal-purple/20">
        <div className="container mx-auto text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} AskLegal.io - नेपाली कानुनी सहायता प्रणाली</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
