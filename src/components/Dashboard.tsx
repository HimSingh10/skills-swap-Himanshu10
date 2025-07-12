import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Star, 
  Calendar, 
  MessageSquare, 
  Award,
  Clock,
  Target,
  ArrowRight,
  Plus,
  Eye
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const activityData = [
  { month: 'Jan', swaps: 4, hours: 12 },
  { month: 'Feb', swaps: 6, hours: 18 },
  { month: 'Mar', swaps: 8, hours: 24 },
  { month: 'Apr', swaps: 5, hours: 15 },
  { month: 'May', swaps: 10, hours: 30 },
  { month: 'Jun', swaps: 12, hours: 36 }
];

const skillsData = [
  { skill: 'React', hours: 45 },
  { skill: 'Python', hours: 30 },
  { skill: 'UI/UX', hours: 25 },
  { skill: 'Marketing', hours: 20 }
];

const quickActions = [
  { title: 'View Profile', href: '/profile', icon: Users, color: 'text-blue-500' },
  { title: 'Browse Skills', href: '/browse-skills', icon: Star, color: 'text-yellow-500' },
  { title: 'Swap Requests', href: '/swap-requests', icon: MessageSquare, color: 'text-orange-500' },
  { title: 'Schedule', href: '/schedule', icon: Calendar, color: 'text-green-500' }
];

const skillProgress = [
  { skill: 'React', level: 'Intermediate', progress: 60, sessions: 15 },
  { skill: 'Python', level: 'Beginner', progress: 30, sessions: 8 },
  { skill: 'UI/UX', level: 'Advanced', progress: 90, sessions: 22 }
];

const recentSwaps = [
  { id: '1', partner: 'Alice Johnson', skill: 'React Development', type: 'teaching', date: '2 days ago', status: 'completed', avatar: '/placeholder.svg' },
  { id: '2', partner: 'Bob Smith', skill: 'Python Basics', type: 'learning', date: '5 days ago', status: 'completed', avatar: '/placeholder.svg' },
  { id: '3', partner: 'Carol Davis', skill: 'Digital Marketing', type: 'teaching', date: '1 week ago', status: 'active', avatar: '/placeholder.svg' }
];

const recommendations = [
  { id: '1', name: 'David Wilson', skill: 'Node.js', rating: 4.6, match: 85, avatar: '/placeholder.svg' },
  { id: '2', name: 'Eva Martinez', skill: 'Graphic Design', rating: 4.9, match: 92, avatar: '/placeholder.svg' },
  { id: '3', name: 'Frank Chen', skill: 'iOS Development', rating: 4.8, match: 78, avatar: '/placeholder.svg' }
];

export function Dashboard() {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Welcome back, John! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your skill swaps today.
          </p>
        </div>
        <Button className="transition-all duration-300 hover:scale-105">
          <Plus className="h-4 w-4 mr-2" />
          Start New Swap
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in cursor-pointer" onClick={() => navigateTo('/my-swaps')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Swaps</p>
                <p className="text-3xl font-bold">3</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+1 this week</span>
                </div>
              </div>
              <Users className="h-12 w-12 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in cursor-pointer" onClick={() => navigateTo('/swap-requests')} style={{animationDelay: '100ms'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-3xl font-bold">5</p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-sm text-orange-600">2 new today</span>
                </div>
              </div>
              <MessageSquare className="h-12 w-12 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in cursor-pointer" onClick={() => navigateTo('/profile')} style={{animationDelay: '200ms'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Your Rating</p>
                <p className="text-3xl font-bold">4.8</p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-green-600">+0.2 this month</span>
                </div>
              </div>
              <Star className="h-12 w-12 text-yellow-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in cursor-pointer" onClick={() => navigateTo('/schedule')} style={{animationDelay: '300ms'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-3xl font-bold">6</p>
                <div className="flex items-center mt-2">
                  <Calendar className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-sm text-blue-600">sessions</span>
                </div>
              </div>
              <Calendar className="h-12 w-12 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card className="animate-scale-in" style={{animationDelay: '400ms'}}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={action.title}
                  variant="ghost"
                  className="w-full justify-start transition-all duration-300 hover:scale-105 animate-scale-in"
                  style={{animationDelay: `${(index + 5) * 100}ms`}}
                  onClick={() => navigateTo(action.href)}
                >
                  <action.icon className={`h-4 w-4 mr-3 ${action.color}`} />
                  <span className="flex-1 text-left">{action.title}</span>
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Skill Progress */}
          <Card className="mt-6 animate-scale-in" style={{animationDelay: '500ms'}}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Skill Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillProgress.map((skill, index) => (
                <div key={skill.skill} className="space-y-2 animate-scale-in" style={{animationDelay: `${(index + 6) * 100}ms`}}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill.skill}</span>
                    <Badge variant="outline">{skill.level}</Badge>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {skill.sessions} sessions completed
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Activity Chart */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="animate-scale-in" style={{animationDelay: '600ms'}}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Activity Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills Learned</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Activity</CardTitle>
                  <CardDescription>Your skill swap activity over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="swaps" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="hours" stroke="hsl(var(--secondary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="skills" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Development</CardTitle>
                  <CardDescription>Hours spent learning different skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={skillsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="skill" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Recent Activity & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Swaps */}
        <Card className="animate-scale-in" style={{animationDelay: '700ms'}}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest skill swaps</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigateTo('/my-swaps')}>
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSwaps.map((swap, index) => (
              <div key={swap.id} className="flex items-center space-x-4 p-3 border rounded-lg transition-all duration-300 hover:shadow-md animate-scale-in" style={{animationDelay: `${(index + 8) * 100}ms`}}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={swap.avatar} alt={swap.partner} />
                  <AvatarFallback>{swap.partner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium truncate">{swap.skill}</p>
                    <Badge variant={swap.type === 'teaching' ? 'default' : 'secondary'} className="text-xs">
                      {swap.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">with {swap.partner}</p>
                  <p className="text-xs text-muted-foreground">{swap.date}</p>
                </div>
                <Badge variant="outline" className={swap.status === 'completed' ? 'text-green-600' : 'text-blue-600'}>
                  {swap.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommended Swaps */}
        <Card className="animate-scale-in" style={{animationDelay: '800ms'}}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Skills that match your interests</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigateTo('/browse-skills')}>
              <Eye className="h-4 w-4 mr-2" />
              Browse All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={rec.id} className="flex items-center space-x-4 p-3 border rounded-lg transition-all duration-300 hover:shadow-md animate-scale-in" style={{animationDelay: `${(index + 9) * 100}ms`}}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={rec.avatar} alt={rec.name} />
                  <AvatarFallback>{rec.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium">{rec.name}</p>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-xs">{rec.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{rec.skill}</p>
                  <Badge variant="outline" className="text-xs">{rec.match}% match</Badge>
                </div>
                <Button size="sm" className="transition-all duration-300 hover:scale-105">
                  Connect
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
