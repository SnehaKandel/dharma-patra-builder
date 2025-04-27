
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { User, Lock, BellRing, BellOff } from 'lucide-react';

const Settings = () => {
  const [profileData, setProfileData] = useState({
    name: 'प्रयोगकर्ता नाम',
    email: 'user@example.com',
    phone: '9841000000',
    district: 'काठमाडौं',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    news: true,
    updates: true,
  });
  
  const { toast } = useToast();
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };
  
  const handleNotificationChange = (name: string) => {
    setNotifications({ ...notifications, [name]: !notifications[name as keyof typeof notifications] });
  };
  
  const saveProfile = () => {
    // In a real app, this would save to a backend
    toast({
      title: "प्रोफाइल अद्यावधिक",
      description: "तपाईंको प्रोफाइल विवरण सफलतापूर्वक अद्यावधिक गरिएको छ।",
    });
  };
  
  const savePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "त्रुटि",
        description: "नयाँ पासवर्ड र पुष्टि पासवर्ड मेल खाएन।",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would save to a backend
    toast({
      title: "पासवर्ड अद्यावधिक",
      description: "तपाईंको पासवर्ड सफलतापूर्वक परिवर्तन गरिएको छ।",
    });
    
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  const saveNotifications = () => {
    // In a real app, this would save to a backend
    toast({
      title: "सूचना सेटिङ अद्यावधिक",
      description: "तपाईंको सूचना प्राथमिकताहरू सफलतापूर्वक अद्यावधिक गरिएको छ।",
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-asklegal-purple mb-8">सेटिङहरू</h1>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={16} />
                प्रोफाइल
              </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center gap-2">
                <Lock size={16} />
                पासवर्ड
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <BellRing size={16} />
                सूचनाहरू
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="bg-asklegal-dark/60 border border-asklegal-purple/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">प्रोफाइल जानकारी</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">नाम</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={profileData.name} 
                      onChange={handleProfileChange}
                      className="bg-asklegal-dark/80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">इमेल</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={profileData.email} 
                      onChange={handleProfileChange}
                      className="bg-asklegal-dark/80"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">फोन</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={profileData.phone} 
                      onChange={handleProfileChange}
                      className="bg-asklegal-dark/80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">जिल्ला</Label>
                    <Input 
                      id="district" 
                      name="district" 
                      value={profileData.district} 
                      onChange={handleProfileChange}
                      className="bg-asklegal-dark/80"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={saveProfile}
                    className="bg-asklegal-purple hover:bg-asklegal-accent text-white"
                  >
                    प्रोफाइल बचत गर्नुहोस्
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="password" className="bg-asklegal-dark/60 border border-asklegal-purple/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">पासवर्ड परिवर्तन</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">वर्तमान पासवर्ड</Label>
                  <Input 
                    id="currentPassword" 
                    name="currentPassword" 
                    type="password" 
                    value={passwordData.currentPassword} 
                    onChange={handlePasswordChange}
                    className="bg-asklegal-dark/80"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">नयाँ पासवर्ड</Label>
                  <Input 
                    id="newPassword" 
                    name="newPassword" 
                    type="password" 
                    value={passwordData.newPassword} 
                    onChange={handlePasswordChange}
                    className="bg-asklegal-dark/80"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">पासवर्ड पुष्टि गर्नुहोस्</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    value={passwordData.confirmPassword} 
                    onChange={handlePasswordChange}
                    className="bg-asklegal-dark/80"
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={savePassword}
                    className="bg-asklegal-purple hover:bg-asklegal-accent text-white"
                  >
                    पासवर्ड परिवर्तन गर्नुहोस्
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="bg-asklegal-dark/60 border border-asklegal-purple/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">सूचना प्राथमिकताहरू</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium text-white">इमेल सूचनाहरू</h3>
                    <p className="text-sm text-white/70">इमेल मार्फत सूचनाहरू प्राप्त गर्नुहोस्</p>
                  </div>
                  <Button 
                    variant={notifications.email ? "default" : "outline"}
                    className={notifications.email ? "bg-asklegal-purple" : "bg-transparent border-asklegal-purple/50"}
                    onClick={() => handleNotificationChange('email')}
                  >
                    {notifications.email ? <BellRing size={16} /> : <BellOff size={16} />}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium text-white">एसएमएस सूचनाहरू</h3>
                    <p className="text-sm text-white/70">एसएमएस मार्फत सूचनाहरू प्राप्त गर्नुहोस्</p>
                  </div>
                  <Button 
                    variant={notifications.sms ? "default" : "outline"}
                    className={notifications.sms ? "bg-asklegal-purple" : "bg-transparent border-asklegal-purple/50"}
                    onClick={() => handleNotificationChange('sms')}
                  >
                    {notifications.sms ? <BellRing size={16} /> : <BellOff size={16} />}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium text-white">समाचार अपडेटहरू</h3>
                    <p className="text-sm text-white/70">नयाँ समाचारहरू बारे जानकारी प्राप्त गर्नुहोस्</p>
                  </div>
                  <Button 
                    variant={notifications.news ? "default" : "outline"}
                    className={notifications.news ? "bg-asklegal-purple" : "bg-transparent border-asklegal-purple/50"}
                    onClick={() => handleNotificationChange('news')}
                  >
                    {notifications.news ? <BellRing size={16} /> : <BellOff size={16} />}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium text-white">सिस्टम अपडेटहरू</h3>
                    <p className="text-sm text-white/70">प्रणालीमा भएका परिवर्तनहरू बारे जानकारी प्राप्त गर्नुहोस्</p>
                  </div>
                  <Button 
                    variant={notifications.updates ? "default" : "outline"}
                    className={notifications.updates ? "bg-asklegal-purple" : "bg-transparent border-asklegal-purple/50"}
                    onClick={() => handleNotificationChange('updates')}
                  >
                    {notifications.updates ? <BellRing size={16} /> : <BellOff size={16} />}
                  </Button>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={saveNotifications}
                    className="bg-asklegal-purple hover:bg-asklegal-accent text-white"
                  >
                    सेटिङहरू बचत गर्नुहोस्
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
