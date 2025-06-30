
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, Users, FileText, MessageSquare, Scale, BookOpen, Calendar, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// More accurate Nepali legal context data
const constitutionUsageData = [
  { month: "Baisakh", queries: 450, articles: 89, nepaliMonth: "बैशाख" },
  { month: "Jestha", queries: 520, articles: 112, nepaliMonth: "जेठ" },
  { month: "Ashadh", queries: 380, articles: 95, nepaliMonth: "आषाढ" },
  { month: "Shrawan", queries: 610, articles: 145, nepaliMonth: "श्रावण" },
  { month: "Bhadra", queries: 720, articles: 168, nepaliMonth: "भद्र" },
  { month: "Ashwin", queries: 890, articles: 203, nepaliMonth: "आश्विन" }
];

const legalCategoriesData = [
  { 
    name: "संवैधानिक कानून", 
    nameEn: "Constitutional Law",
    value: 28, 
    color: "#8B5CF6",
    queries: 1230,
    description: "नेपालको संविधान सम्बन्धी प्रश्नहरू"
  },
  { 
    name: "नागरिक अधिकार", 
    nameEn: "Civil Rights",
    value: 22, 
    color: "#06B6D4",
    queries: 967,
    description: "मौलिक अधिकार र स्वतन्त्रता"
  },
  { 
    name: "फौजदारी कानून", 
    nameEn: "Criminal Law",
    value: 18, 
    color: "#10B981",
    queries: 792,
    description: "अपराध र सजाय सम्बन्धी कानून"
  },
  { 
    name: "सम्पत्ति कानून", 
    nameEn: "Property Law",
    value: 15, 
    color: "#F59E0B",
    queries: 660,
    description: "घर जग्गा र सम्पत्ति अधिकार"
  },
  { 
    name: "पारिवारिक कानून", 
    nameEn: "Family Law",
    value: 12, 
    color: "#EF4444",
    queries: 528,
    description: "विवाह, सम्बन्धविच्छेद र सन्तान"
  },
  { 
    name: "अन्य", 
    nameEn: "Others",
    value: 5, 
    color: "#8E44AD",
    queries: 220,
    description: "अन्य कानूनी विषयहरू"
  }
];

const documentAccessData = [
  { day: "आइतवार", dayEn: "Sunday", uploads: 8, downloads: 34, views: 156, activeUsers: 45 },
  { day: "सोमवार", dayEn: "Monday", uploads: 22, downloads: 67, views: 298, activeUsers: 89 },
  { day: "मंगलवार", dayEn: "Tuesday", uploads: 18, downloads: 55, views: 234, activeUsers: 76 },
  { day: "बुधवार", dayEn: "Wednesday", uploads: 25, downloads: 72, views: 345, activeUsers: 102 },
  { day: "बिहिवार", dayEn: "Thursday", uploads: 20, downloads: 58, views: 267, activeUsers: 83 },
  { day: "शुक्रवार", dayEn: "Friday", uploads: 35, downloads: 89, views: 412, activeUsers: 134 },
  { day: "शनिवार", dayEn: "Saturday", uploads: 12, downloads: 41, views: 189, activeUsers: 62 }
];

const userEngagementData = [
  { time: "06:00", users: 23, timeNepali: "बिहान ६" },
  { time: "09:00", users: 67, timeNepali: "बिहान ९" },
  { time: "12:00", users: 134, timeNepali: "दिउँसो १२" },
  { time: "15:00", users: 156, timeNepali: "दिउँसो ३" },
  { time: "18:00", users: 189, timeNepali: "साँझ ६" },
  { time: "21:00", users: 98, timeNepali: "बेलुकी ९" },
  { time: "00:00", users: 45, timeNepali: "मध्यरात" }
];

const topDocumentsData = [
  { name: "नेपालको संविधान २०७२", type: "संविधान", downloads: 2340, views: 12500 },
  { name: "नागरिकता ऐन २०६३", type: "ऐन", downloads: 1890, views: 9800 },
  { name: "मुलुकी अपराध संहिता २०७४", type: "संहिता", downloads: 1650, views: 8900 },
  { name: "स्थानीय सरकार सञ्चालन ऐन २०७४", type: "ऐन", downloads: 1420, views: 7600 },
  { name: "श्रम ऐन २०७४", type: "ऐन", downloads: 1280, views: 6800 }
];

const chartConfig = {
  queries: { label: "प्रश्नहरू", color: "#8B5CF6" },
  articles: { label: "धाराहरू", color: "#06B6D4" },
  uploads: { label: "अपलोड", color: "#10B981" },
  downloads: { label: "डाउनलोड", color: "#F59E0B" },
  views: { label: "हेराइ", color: "#EF4444" },
  users: { label: "सक्रिय प्रयोगकर्ता", color: "#8B5CF6" }
};

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("6months");
  const [showNepali, setShowNepali] = useState(true);

  const StatCard = ({ title, value, change, icon: Icon, description, subtitle }: any) => (
    <Card className="card-glassmorphism hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-asklegal-text/80">{title}</CardTitle>
        <Icon className="h-4 w-4 text-asklegal-purple group-hover:scale-110 transition-transform" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-asklegal-heading">{value}</div>
        {subtitle && <div className="text-sm text-asklegal-text/60 mb-1">{subtitle}</div>}
        <p className="text-xs text-asklegal-text/60">
          <span className={`${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
          {' '}{description}
        </p>
      </CardContent>
    </Card>
  );

  const handleCategoryClick = (data: any) => {
    setSelectedCategory(data.name);
  };

  const resetCategorySelection = () => {
    setSelectedCategory(null);
  };

  const handleExportData = () => {
    console.log("Exporting analytics data...");
    // Simulate export functionality
    const data = {
      constitution_usage: constitutionUsageData,
      categories: legalCategoriesData,
      documents: documentAccessData,
      engagement: userEngagementData
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'legal-analytics-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
          <p className="font-medium text-asklegal-heading">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey === 'queries' && ' प्रश्नहरू'}
              {entry.dataKey === 'articles' && ' धाराहरू'}
              {entry.dataKey === 'downloads' && ' डाउनलोड'}
              {entry.dataKey === 'views' && ' हेराइ'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="mb-8 animate-fade-in flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-asklegal-heading mb-2">
              कानूनी विश्लेषण ड्यासबोर्ड
            </h1>
            <p className="text-asklegal-text/70">
              कानूनी कागजातको प्रयोग र प्रयोगकर्ता सहभागिताको विस्तृत जानकारी
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">१ महिना</SelectItem>
                <SelectItem value="3months">३ महिना</SelectItem>
                <SelectItem value="6months">६ महिना</SelectItem>
                <SelectItem value="1year">१ वर्ष</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              निर्यात
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowNepali(!showNepali)}
            >
              {showNepali ? 'English' : 'नेपाली'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in" style={{animationDelay: "0.1s"}}>
          <StatCard
            title="कुल प्रश्नहरू"
            value="४,३९७"
            subtitle="Total Queries"
            change={18.5}
            icon={MessageSquare}
            description="गत महिनादेखि"
          />
          <StatCard
            title="सक्रिय प्रयोगकर्ता"
            value="७८९"
            subtitle="Active Users"
            change={12.3}
            icon={Users}
            description="गत हप्तादेखि"
          />
          <StatCard
            title="कानूनी कागजातहरू"
            value="२३४"
            subtitle="Legal Documents"
            change={8.7}
            icon={FileText}
            description="गत महिनादेखि"
          />
          <StatCard
            title="संविधानका धाराहरू"
            value="८१२"
            subtitle="Constitution Articles"
            change={25.4}
            icon={Scale}
            description="यस महिना पहुँच"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in" style={{animationDelay: "0.2s"}}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">सिंहावलोकन</TabsTrigger>
            <TabsTrigger value="documents">कागजातहरू</TabsTrigger>
            <TabsTrigger value="users">प्रयोगकर्ता</TabsTrigger>
            <TabsTrigger value="categories">श्रेणीहरू</TabsTrigger>
            <TabsTrigger value="popular">लोकप्रिय</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-glassmorphism">
                <CardHeader>
                  <CardTitle className="text-asklegal-heading">संविधान प्रयोगको प्रवृत्ति</CardTitle>
                  <CardDescription className="text-asklegal-text/70">
                    मासिक प्रश्न र धाराहरूको पहुँच ({timeRange === '6months' ? 'छ महिना' : timeRange})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={constitutionUsageData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis 
                          dataKey={showNepali ? "nepaliMonth" : "month"} 
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <ChartTooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="queries"
                          stackId="1"
                          stroke="#8B5CF6"
                          fill="#8B5CF6"
                          fillOpacity={0.6}
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="articles"
                          stackId="1"
                          stroke="#06B6D4"
                          fill="#06B6D4"
                          fillOpacity={0.6}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="card-glassmorphism">
                <CardHeader>
                  <CardTitle className="text-asklegal-heading flex items-center justify-between">
                    कानूनी श्रेणी वितरण
                    {selectedCategory && (
                      <Button variant="outline" size="sm" onClick={resetCategorySelection}>
                        सबै देखाउनुहोस्
                      </Button>
                    )}
                  </CardTitle>
                  <CardDescription className="text-asklegal-text/70">
                    प्रश्नहरूको कानूनी श्रेणी अनुसार वितरण
                    {selectedCategory && (
                      <div className="mt-2 p-2 bg-asklegal-purple/10 rounded text-sm">
                        चयनित: {selectedCategory}
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={legalCategoriesData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          onClick={handleCategoryClick}
                          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                          className="cursor-pointer"
                        >
                          {legalCategoriesData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color}
                              stroke={selectedCategory === entry.name ? "#000" : "none"}
                              strokeWidth={selectedCategory === entry.name ? 2 : 0}
                            />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
                                  <p className="font-medium text-asklegal-heading">{data.name}</p>
                                  <p className="text-sm text-asklegal-text/70">{data.nameEn}</p>
                                  <p className="text-sm">{data.queries} प्रश्नहरू ({data.value}%)</p>
                                  <p className="text-xs text-asklegal-text/60 mt-1">{data.description}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="card-glassmorphism">
              <CardHeader>
                <CardTitle className="text-asklegal-heading">कागजात गतिविधि</CardTitle>
                <CardDescription className="text-asklegal-text/70">
                  साप्ताहिक कागजात अपलोड, डाउनलोड र हेराइ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={documentAccessData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey={showNepali ? "day" : "dayEn"} />
                      <YAxis />
                      <ChartTooltip content={<CustomTooltip />} />
                      <Bar dataKey="uploads" fill="#10B981" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="downloads" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="views" fill="#EF4444" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="card-glassmorphism">
              <CardHeader>
                <CardTitle className="text-asklegal-heading">प्रयोगकर्ता सहभागिता</CardTitle>
                <CardDescription className="text-asklegal-text/70">
                  दिनभरको सक्रिय प्रयोगकर्ताहरू
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey={showNepali ? "timeNepali" : "time"} />
                      <YAxis />
                      <ChartTooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#8B5CF6"
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {legalCategoriesData.map((category, index) => (
                <Card key={category.name} className="card-glassmorphism hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-asklegal-heading flex items-center gap-2">
                      <BookOpen className="h-5 w-5" style={{ color: category.color }} />
                      <div>
                        <div>{category.name}</div>
                        <div className="text-sm font-normal text-asklegal-text/60">{category.nameEn}</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-asklegal-heading mb-2">{category.value}%</div>
                    <div className="w-full bg-asklegal-form-border/20 rounded-full h-2 mb-3">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${category.value}%`,
                          backgroundColor: category.color
                        }}
                      />
                    </div>
                    <p className="text-sm text-asklegal-text/70 mb-2">
                      {category.queries} प्रश्नहरू यस महिना
                    </p>
                    <p className="text-xs text-asklegal-text/60">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <Card className="card-glassmorphism">
              <CardHeader>
                <CardTitle className="text-asklegal-heading">लोकप्रिय कागजातहरू</CardTitle>
                <CardDescription className="text-asklegal-text/70">
                  सबैभन्दा बढी हेरिएका र डाउनलोड गरिएका कानूनी कागजातहरू
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDocumentsData.map((doc, index) => (
                    <div key={doc.name} className="flex items-center justify-between p-4 bg-asklegal-form-bg/50 rounded-lg hover:bg-asklegal-form-bg/70 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-asklegal-purple/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-asklegal-purple">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-asklegal-heading">{doc.name}</h4>
                          <p className="text-sm text-asklegal-text/60">{doc.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-asklegal-heading">{doc.downloads.toLocaleString()} डाउनलोड</div>
                        <div className="text-xs text-asklegal-text/60">{doc.views.toLocaleString()} हेराइ</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Analytics;
