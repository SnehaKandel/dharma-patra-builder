
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-asklegal-heading mb-4 theme-transition">Welcome to AskLegal.io</h1>
        <p className="text-xl text-asklegal-text/80 mb-10 theme-transition">Your interactive legal solution</p>
        
        <div className="max-w-3xl mx-auto card-glassmorphism p-6 mb-16">
          <h2 className="text-2xl font-medium text-asklegal-heading mb-4 theme-transition">Chat with AskLegal</h2>
          <p className="text-asklegal-text/70 mb-6 theme-transition">Ask legal questions or get help navigating AskLegal.io</p>
          
          <div className="space-y-4 mb-6">
            <div className="chat-message p-4 rounded-lg">
              <p className="text-sm text-asklegal-text/70 mb-1 theme-transition">AskLegal • 03:20 PM</p>
              <p className="theme-transition">Hello! Welcome to AskLegal.io. I'm AskLegal, your interactive legal assistant. How can I help you today?</p>
            </div>
            
            <div className="chat-message p-4 rounded-lg">
              <p className="text-sm text-asklegal-text/70 mb-1 theme-transition">AskLegal • 03:20 PM</p>
              <p className="theme-transition">I provide legal information, latest news, and let you test your legal knowledge! Please log in to get started.</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 p-3 rounded-l-md bg-asklegal-dark/60 border border-r-0 border-asklegal-purple/20 text-asklegal-text focus:outline-none focus:ring-1 focus:ring-asklegal-purple/30 theme-transition"
            />
            <button className="bg-asklegal-purple text-white py-3 px-6 rounded-r-md hover:bg-asklegal-accent transition-colors">
              Send
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-glassmorphism p-6 h-full flex flex-col">
            <h3 className="text-xl font-medium text-asklegal-heading mb-3 theme-transition">Latest News</h3>
            <p className="text-asklegal-text/70 mb-4 flex-grow theme-transition">Stay updated with the latest legal news and updates.</p>
            <Link to="/news" className="w-full block mt-auto">
              <Button variant="outline" className="button-primary w-full">
                Explore News
              </Button>
            </Link>
          </div>
          
          <div className="card-glassmorphism p-6 h-full flex flex-col">
            <h3 className="text-xl font-medium text-asklegal-heading mb-3 theme-transition">Kanoon Directory</h3>
            <p className="text-asklegal-text/70 mb-4 flex-grow theme-transition">Search and access comprehensive legal document repository.</p>
            <Link to="/kanoon-search" className="w-full block mt-auto">
              <Button variant="outline" className="button-primary w-full">
                Browse Laws
              </Button>
            </Link>
          </div>
          
          <div className="card-glassmorphism p-6 h-full flex flex-col">
            <h3 className="text-xl font-medium text-asklegal-heading mb-3 theme-transition">Judicial Petitions and Forms</h3>
            <p className="text-asklegal-text/70 mb-4 flex-grow theme-transition">Create, customize and download legal petition documents.</p>
            <Link to="/forms" className="w-full block mt-auto">
              <Button variant="outline" className="button-primary w-full">
                Create Document
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
