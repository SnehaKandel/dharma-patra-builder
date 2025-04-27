
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search, UserX } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

// Mock data for users
const mockUsers: User[] = [
  {
    id: '1',
    name: 'रमेश शर्मा',
    email: 'ramesh@example.com',
    role: 'user',
    status: 'active',
    lastActive: '2023-04-25T10:30:00Z',
  },
  {
    id: '2',
    name: 'सुनिता तामाङ',
    email: 'sunita@example.com',
    role: 'user',
    status: 'active',
    lastActive: '2023-04-24T15:45:00Z',
  },
  {
    id: '3',
    name: 'बिनोद थापा',
    email: 'binod@example.com',
    role: 'user',
    status: 'inactive',
    lastActive: '2023-04-20T08:20:00Z',
  },
  {
    id: '4',
    name: 'गीता पौडेल',
    email: 'gita@example.com',
    role: 'user',
    status: 'active',
    lastActive: '2023-04-23T14:15:00Z',
  },
  {
    id: '5',
    name: 'प्रकाश अधिकारी',
    email: 'prakash@example.com',
    role: 'admin',
    status: 'active',
    lastActive: '2023-04-25T11:50:00Z',
  },
];

const Admin = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in and is admin
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    
    if (parsedUser.role !== 'admin') {
      toast({
        title: "अनधिकृत पहुँच",
        description: "तपाईंसँग यो पृष्ठमा पहुँच गर्ने अनुमति छैन।",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [navigate, toast]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const deactivateUser = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    );
    
    setUsers(updatedUsers);
    
    const targetUser = users.find(user => user.id === userId);
    const newStatus = targetUser?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: `प्रयोगकर्ता ${newStatus === 'active' ? 'सक्रिय' : 'निष्क्रिय'}`,
      description: `प्रयोगकर्ता ${targetUser?.name} ${newStatus === 'active' ? 'सक्रिय' : 'निष्क्रिय'} गरिएको छ।`,
    });
  };
  
  if (!user || user.role !== 'admin') {
    return null;
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-asklegal-purple mb-8">प्रशासक ड्यासबोर्ड</h1>
        
        <div className="bg-asklegal-dark/60 border border-asklegal-purple/30 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white mb-4 md:mb-0">प्रयोगकर्ता व्यवस्थापन</h2>
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="प्रयोगकर्ता खोज्नुहोस्..."
                value={searchTerm}
                onChange={handleSearch}
                className="bg-asklegal-dark/80 pl-10"
              />
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/50" size={16} />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-asklegal-purple/30">
                  <th className="text-left py-4 px-2 text-white/70 font-medium">नाम</th>
                  <th className="text-left py-4 px-2 text-white/70 font-medium">इमेल</th>
                  <th className="text-left py-4 px-2 text-white/70 font-medium">भूमिका</th>
                  <th className="text-left py-4 px-2 text-white/70 font-medium">स्थिति</th>
                  <th className="text-left py-4 px-2 text-white/70 font-medium">अन्तिम सक्रिय</th>
                  <th className="text-right py-4 px-2 text-white/70 font-medium">कार्य</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-asklegal-purple/10 hover:bg-asklegal-purple/5">
                    <td className="py-4 px-2 text-white">{user.name}</td>
                    <td className="py-4 px-2 text-white/80">{user.email}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' 
                          ? 'bg-asklegal-purple/20 text-asklegal-purple' 
                          : 'bg-asklegal-accent/20 text-asklegal-accent'
                      }`}>
                        {user.role === 'admin' ? 'प्रशासक' : 'प्रयोगकर्ता'}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {user.status === 'active' ? 'सक्रिय' : 'निष्क्रिय'}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-white/70">
                      {new Date(user.lastActive).toLocaleDateString('ne-NP')}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deactivateUser(user.id)}
                        className={`bg-transparent border-asklegal-purple/30 ${
                          user.status === 'active' ? 'text-red-500' : 'text-green-500'
                        } hover:bg-asklegal-purple/5`}
                      >
                        <UserX size={16} className="mr-1" />
                        {user.status === 'active' ? 'निष्क्रिय' : 'सक्रिय'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
