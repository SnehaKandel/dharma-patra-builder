
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user', // 'user' or 'admin'
  });
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validate = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'इमेल आवश्यक छ';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'अमान्य इमेल ठेगाना';
    }
    
    if (!formData.password) {
      newErrors.password = 'पासवर्ड आवश्यक छ';
    } else if (formData.password.length < 6) {
      newErrors.password = 'पासवर्ड कम्तिमा 6 अक्षरको हुनुपर्छ';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsLoading(true);
    
    // Mock login - in a real app this would call an API
    setTimeout(() => {
      setIsLoading(false);
      
      const mockUserData = {
        id: '1',
        name: 'प्रयोगकर्ता',
        email: formData.email,
        role: formData.role,
      };
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(mockUserData));
      
      toast({
        title: "सफलतापूर्वक लग इन गरियो",
        description: formData.role === 'admin' 
          ? "स्वागत छ, प्रशासक" 
          : "स्वागत छ, AskLegal.io मा",
      });
      
      // Redirect based on role
      if (formData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }, 1000);
  };

  const handleRoleChange = (role: string) => {
    setFormData({
      ...formData,
      role,
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-md mx-auto bg-asklegal-dark/60 border border-asklegal-purple/30 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-asklegal-purple mb-6 text-center">लग इन</h1>
          
          <div className="flex justify-center mb-6 gap-2">
            <Button
              type="button"
              variant={formData.role === 'user' ? "default" : "outline"} 
              className={formData.role === 'user' ? "bg-asklegal-purple" : "bg-transparent border-asklegal-purple/50 text-white"}
              onClick={() => handleRoleChange('user')}
            >
              प्रयोगकर्ता
            </Button>
            <Button
              type="button"
              variant={formData.role === 'admin' ? "default" : "outline"} 
              className={formData.role === 'admin' ? "bg-asklegal-purple" : "bg-transparent border-asklegal-purple/50 text-white"}
              onClick={() => handleRoleChange('admin')}
            >
              प्रशासक
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">इमेल</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-asklegal-dark/80"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">पासवर्ड</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                value={formData.password}
                onChange={handleChange}
                className="bg-asklegal-dark/80"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="text-white/70 hover:text-white cursor-pointer">
                पासवर्ड बिर्सनुभयो?
              </div>
              <div className="text-asklegal-purple hover:text-asklegal-accent cursor-pointer">
                दर्ता गर्नुहोस्
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-asklegal-purple hover:bg-asklegal-accent text-white"
            >
              {isLoading ? "प्रक्रियामा..." : "लग इन गर्नुहोस्"}
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
