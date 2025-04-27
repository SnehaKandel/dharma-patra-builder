
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const Learn = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto bg-asklegal-dark/60 border border-asklegal-purple/30 rounded-lg p-10">
          <BookOpen size={80} className="text-asklegal-purple mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-asklegal-purple mb-4">सिकाई केन्द्र</h1>
          <p className="text-xl text-white/80 mb-10">
            यो खण्ड निर्माणाधीन छ। छिट्टै नयाँ कानूनी पाठ्यक्रमहरू र शिक्षण सामग्रीहरू थपिनेछन्।
          </p>
          <Button className="bg-asklegal-purple hover:bg-asklegal-accent text-white">
            सूचित गर्नुहोस्
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Learn;
