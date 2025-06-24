
import { ScrollArea } from "@/components/ui/scroll-area";
import { LegalDocument } from "@/types/forms";
import { FileText, Calendar, Building } from "lucide-react";

interface DocumentPreviewProps {
  document: LegalDocument | null;
}

const DocumentPreview = ({ document }: DocumentPreviewProps) => {
  if (!document) {
    return (
      <div className="card-glassmorphism flex items-center justify-center min-h-[842px]">
        <div className="text-center p-6">
          <FileText className="h-16 w-16 text-asklegal-purple/70 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-asklegal-heading mb-2">Select a document to preview</h3>
          <p className="text-asklegal-text/80 max-w-md">
            Choose a document from the list on the left to view its contents here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg p-6 min-h-[842px]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-nepali mb-2">{document.title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">{document.titleEn}</p>
      </div>
      
      {/* Document Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-asklegal-purple" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Year: {document.year}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-asklegal-purple" />
          <span className="text-sm text-gray-600 dark:text-gray-300">{document.ministry}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <ScrollArea className="h-[600px] pr-4">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {document.content ? (
              <div className="whitespace-pre-wrap font-nepali leading-relaxed">
                {document.content}
              </div>
            ) : (
              <div className="text-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <FileText className="h-16 w-16 text-asklegal-purple/70 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-asklegal-heading mb-2">Content Coming Soon</h3>
                <p className="text-asklegal-text/80 mb-4 max-w-md mx-auto">
                  {document.description}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DocumentPreview;
