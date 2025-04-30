
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { FileText, Search, BookOpen, Send } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [chatInput, setChatInput] = useState("");
  
  return (
    <MainLayout>
      <div className="container mx-auto py-16 px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-asklegal-heading mb-4 theme-transition animate-fade-in">
            Welcome to <span className="text-asklegal-purple">AskLegal.io</span>
          </h1>
          <p className="text-xl text-asklegal-text/80 mb-10 theme-transition max-w-2xl mx-auto">
            Your interactive legal assistant for Nepal's legal system - access resources, get answers, and create documents with ease.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto card-glassmorphism p-6 mb-16 animate-fade-in" style={{animationDelay: "0.2s"}}>
          <h2 className="text-2xl font-medium text-asklegal-heading mb-4 theme-transition">
            Chat with AskLegal
          </h2>
          <p className="text-asklegal-text/70 mb-6 theme-transition">
            Ask legal questions or get help navigating AskLegal.io
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="chat-message p-4 rounded-lg" style={{animationDelay: "0.3s"}}>
              <p className="text-sm text-asklegal-text/70 mb-1 theme-transition">AskLegal • 03:20 PM</p>
              <p className="theme-transition">Hello! Welcome to AskLegal.io. I'm AskLegal, your interactive legal assistant. How can I help you today?</p>
            </div>
            
            <div className="chat-message p-4 rounded-lg" style={{animationDelay: "0.5s"}}>
              <p className="text-sm text-asklegal-text/70 mb-1 theme-transition">AskLegal • 03:20 PM</p>
              <p className="theme-transition">I provide legal information, latest news, and let you test your legal knowledge! Please log in to get started.</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 p-3 rounded-l-md border-r-0 text-asklegal-text bg-asklegal-chat-bg/40 backdrop-blur-sm border border-asklegal-form-border/50 focus:outline-none focus:ring-1 focus:ring-asklegal-purple/30 theme-transition dark:text-asklegal-text dark:bg-asklegal-form-bg/90"
            />
            <button className="bg-asklegal-purple hover:bg-asklegal-purple/80 text-white py-3 px-6 rounded-r-md transition-all duration-300 flex items-center gap-2">
              <span>Send</span>
              <Send size={18} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-glassmorphism p-6 h-full flex flex-col animate-fade-in" style={{animationDelay: "0.4s"}}>
            <h3 className="text-xl font-medium text-asklegal-heading mb-3 theme-transition flex items-center gap-2">
              <FileText size={20} className="text-asklegal-purple" />
              Latest News
            </h3>
            <p className="text-asklegal-text/70 mb-4 flex-grow theme-transition">
              Stay updated with the latest legal news and updates from across Nepal and beyond.
            </p>
            <Link to="/news" className="w-full block mt-auto">
              <Button className="w-full btn-animated">
                Explore News
              </Button>
            </Link>
          </div>
          
          <div className="card-glassmorphism p-6 h-full flex flex-col animate-fade-in" style={{animationDelay: "0.6s"}}>
            <h3 className="text-xl font-medium text-asklegal-heading mb-3 theme-transition flex items-center gap-2">
              <Search size={20} className="text-asklegal-purple" />
              Kanoon Directory
            </h3>
            <p className="text-asklegal-text/70 mb-4 flex-grow theme-transition">
              Search and access comprehensive legal document repository and legislation.
            </p>
            <Link to="/kanoon-search" className="w-full block mt-auto">
              <Button className="w-full btn-animated">
                Browse Laws
              </Button>
            </Link>
          </div>
          
          <div className="card-glassmorphism p-6 h-full flex flex-col animate-fade-in" style={{animationDelay: "0.8s"}}>
            <h3 className="text-xl font-medium text-asklegal-heading mb-3 theme-transition flex items-center gap-2">
              <BookOpen size={20} className="text-asklegal-purple" />
              Judicial Petitions
            </h3>
            <p className="text-asklegal-text/70 mb-4 flex-grow theme-transition">
              Create, customize and download legal petition documents with ease.
            </p>
            <Link to="/forms" className="w-full block mt-auto">
              <Button className="w-full btn-animated">
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
