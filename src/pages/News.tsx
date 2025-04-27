
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: string;
}

// Mock data for news (in a real app, this would come from an API)
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'नेपाल र अमेरिकाबीच सम्पन्न एमसीसी सम्झौताको कार्यान्वयन सुरु',
    source: 'OnlineKhabar',
    url: 'https://onlinekhabar.com',
    publishedAt: '2023-04-25T10:30:00Z',
    summary: 'नेपाल र अमेरिकाबीच भएको मिलेनियम च्यालेन्ज कर्पोरेशन (एमसीसी) सम्झौताको कार्यान्वयन प्रक्रिया सुरु भएको छ।'
  },
  {
    id: '2',
    title: 'प्रधानमन्त्री देउवाद्वारा नयाँ मन्त्रिपरिषद् विस्तार',
    source: 'Kantipur',
    url: 'https://ekantipur.com',
    publishedAt: '2023-04-24T15:45:00Z',
    summary: 'प्रधानमन्त्री शेरबहादुर देउवाले आज नयाँ मन्त्रिपरिषद् विस्तार गरेका छन्। नयाँ मन्त्रिपरिषद्मा विभिन्न दलका प्रतिनिधि समावेश छन्।'
  },
  {
    id: '3',
    title: 'उपत्यकामा बढ्दो वायु प्रदूषण: स्वास्थ्य सतर्कता जारी',
    source: 'Setopati',
    url: 'https://setopati.com',
    publishedAt: '2023-04-23T08:20:00Z',
    summary: 'काठमाडौं उपत्यकामा वायु प्रदूषणको मात्रा बढेको छ। विशेषज्ञहरूले स्वास्थ्य सतर्कता अपनाउन सुझाव दिएका छन्।'
  },
  {
    id: '4',
    title: 'नेपाली क्रिकेट टोली विश्वकप छनोटका लागि तयारी गर्दै',
    source: 'OnlineKhabar',
    url: 'https://onlinekhabar.com',
    publishedAt: '2023-04-22T14:15:00Z',
    summary: 'नेपाली राष्ट्रिय क्रिकेट टोली आईसीसी विश्वकप छनोटका लागि तयारी गरिरहेको छ। टोलीले दैनिक अभ्यास गरिरहेको छ।'
  },
  {
    id: '5',
    title: 'सरकारद्वारा नयाँ शिक्षा नीतिको घोषणा',
    source: 'Kantipur',
    url: 'https://ekantipur.com',
    publishedAt: '2023-04-21T11:50:00Z',
    summary: 'सरकारले आज नयाँ शिक्षा नीति घोषणा गरेको छ। नयाँ नीतिमा प्राविधिक शिक्षामा जोड दिइएको छ।'
  }
];

const News = () => {
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [loading, setLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState(new Date());
  const { toast } = useToast();

  // Function to fetch news (in a real app, this would fetch from an API)
  const fetchNews = () => {
    setLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Add a new mock news item at the top to simulate new content
      const newItem: NewsItem = {
        id: Date.now().toString(),
        title: `नयाँ समाचार: ${new Date().toLocaleTimeString()}`,
        source: 'AskLegal News',
        url: 'https://asklegal.io',
        publishedAt: new Date().toISOString(),
        summary: 'यो एक नयाँ समाचार हो जुन तपाईंले रिलोड गर्नुभएपछि देखिएको छ।'
      };
      
      setNews([newItem, ...news.slice(0, 4)]);
      setLoading(false);
      setLastFetched(new Date());
      
      toast({
        title: "समाचार अद्यावधिक",
        description: "नयाँ समाचारहरू प्राप्त गरिएको छ।",
      });
    }, 1000);
  };

  // Auto-refresh news every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Auto-refreshing news');
      fetchNews();
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, [news]);

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-asklegal-purple">ताजा समाचार</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">
              अन्तिम अद्यावधिक: {lastFetched.toLocaleTimeString()}
            </span>
            <Button 
              onClick={fetchNews} 
              disabled={loading} 
              variant="outline" 
              className="bg-transparent border-asklegal-purple/50 text-white hover:bg-asklegal-purple/10 flex items-center gap-2"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              रिलोड गर्नुहोस्
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item) => (
            <div key={item.id} className="bg-asklegal-dark/60 border border-asklegal-purple/30 rounded-lg p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-medium text-white">{item.title}</h3>
                <span className="text-asklegal-purple text-sm">{item.source}</span>
              </div>
              <p className="text-white/70 mb-4">{item.summary}</p>
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-sm">
                  {new Date(item.publishedAt).toLocaleDateString('ne-NP')}
                </span>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-asklegal-purple hover:underline"
                >
                  थप पढ्नुहोस्
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default News;
