
import { LegalDocument } from "@/types/forms";
import { Type, Palette, Search, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DocumentPreviewProps {
  document: LegalDocument | null;
}

const DocumentPreview = ({ document }: DocumentPreviewProps) => {
  const [fontSize, setFontSize] = useState(16);
  const [colorTheme, setColorTheme] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  if (!document) {
    return (
      <div className="bg-asklegal-dark rounded-lg border border-asklegal-purple/30 overflow-hidden flex flex-col h-full">
        <div className="p-4 bg-asklegal-purple/10 border-b border-asklegal-purple/30">
          <h3 className="text-lg font-medium text-asklegal-purple">Document Viewer</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-asklegal-text/60 text-center">
            Select a document from the list to view its contents
          </p>
        </div>
      </div>
    );
  }

  const themeStyles = {
    default: { bg: 'bg-white', text: 'text-gray-900' },
    sepia: { bg: 'bg-yellow-50', text: 'text-yellow-900' },
    dark: { bg: 'bg-gray-900', text: 'text-gray-100' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-900' }
  };

  const currentTheme = themeStyles[colorTheme as keyof typeof themeStyles] || themeStyles.default;

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark style="background-color: yellow; color: black;">$1</mark>');
  };

  const displayContent = document.content 
    ? highlightText(document.content, searchTerm)
    : 'Content not available for this document.';

  return (
    <div className="bg-asklegal-dark rounded-lg border border-asklegal-purple/30 overflow-hidden flex flex-col h-full">
      {/* Header with controls */}
      <div className="p-4 bg-asklegal-purple/10 border-b border-asklegal-purple/30">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-asklegal-purple">Document Viewer</h3>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Font Size Controls */}
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4 text-asklegal-text" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm text-asklegal-text w-8 text-center">{fontSize}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Color Theme */}
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-asklegal-text" />
            <select
              value={colorTheme}
              onChange={(e) => setColorTheme(e.target.value)}
              className="bg-asklegal-card-bg text-asklegal-text border border-asklegal-purple/30 rounded px-2 py-1 text-sm"
            >
              <option value="default">Default</option>
              <option value="sepia">Sepia</option>
              <option value="dark">Dark</option>
              <option value="blue">Blue</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <Search className="h-4 w-4 text-asklegal-text" />
            <Input
              type="text"
              placeholder="Search in document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-asklegal-card-bg border-asklegal-purple/30 text-asklegal-text placeholder:text-asklegal-text/50"
            />
          </div>
        </div>
      </div>
      
      {/* Document Content */}
      <div className="flex-1 overflow-auto">
        <div className={`p-8 ${currentTheme.bg} ${currentTheme.text} min-h-full`}>
          <div className="max-w-4xl mx-auto">
            {/* Document Header */}
            <div className="mb-8 text-center border-b border-current/20 pb-4">
              <h1 className="text-2xl font-bold mb-2 font-nepali">{document.title}</h1>
              <h2 className="text-xl text-current/80 mb-4">{document.titleEn}</h2>
              <div className="flex justify-center gap-4 text-sm text-current/60">
                <span>Year: {document.year}</span>
                <span>•</span>
                <span>Ministry: {document.ministry}</span>
                {document.fileSize && (
                  <>
                    <span>•</span>
                    <span>Size: {document.fileSize}</span>
                  </>
                )}
                {document.pages && (
                  <>
                    <span>•</span>
                    <span>Pages: {document.pages}</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Document Body */}
            <div 
              className="prose prose-lg max-w-none font-nepali leading-relaxed"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: displayContent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
