
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, Star, Calendar, Award, Target, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const monthlyData = [
  { month: 'Jan', swaps: 4, hours: 12, rating: 4.5 },
  { month: 'Feb', swaps: 6, hours: 18, rating: 4.6 },
  { month: 'Mar', swaps: 8, hours: 24, rating: 4.7 },
  { month: 'Apr', swaps: 5, hours: 15, rating: 4.6 },
  { month: 'May', swaps: 10, hours: 30, rating: 4.8 },
  { month: 'Jun', swaps: 12, hours: 36, rating: 4.9 }
];

const skillDistribution = [
  { name: 'Programming', value: 40, color: '#8884d8', hours: 120 },
  { name: 'Design', value: 30, color: '#82ca9d', hours: 90 },
  { name: 'Marketing', value: 20, color: '#ffc658', hours: 60 },
  { name: 'Others', value: 10, color: '#ff7300', hours: 30 }
];

const weeklyActivity = [
  { day: 'Mon', teaching: 2, learning: 1 },
  { day: 'Tue', teaching: 1, learning: 2 },
  { day: 'Wed', teaching: 3, learning: 1 },
  { day: 'Thu', teaching: 1, learning: 3 },
  { day: 'Fri', teaching: 2, learning: 2 },
  { day: 'Sat', teaching: 4, learning: 2 },
  { day: 'Sun', teaching: 1, learning: 1 }
];

const ratingTrend = [
  { month: 'Jan', rating: 4.2 },
  { month: 'Feb', rating: 4.4 },
  { month: 'Mar', rating: 4.5 },
  { month: 'Apr', rating: 4.6 },
  { month: 'May', rating: 4.8 },
  { month: 'Jun', rating: 4.9 }
];

export function Analytics() {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const stats = {
    totalSwaps: 45,
    totalHours: 135,
    averageRating: 4.8,
    completionRate: 92,
    responseTime: 2.4,
    activeSkills: 8
  };

  const improvements = [
    { metric: 'Swaps', change: 25, isPositive: true },
    { metric: 'Rating', change: 8, isPositive: true },
    { metric: 'Response Time', change: 15, isPositive: false }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <Badge variant="secondary">{currentMonth} Overview</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Swaps</p>
                <p className="text-3xl font-bold">{stats.totalSwaps}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+25% from last month</span>
                </div>
              </div>
              <Users className="h-12 w-12 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in" style={{animationDelay: '100ms'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning Hours</p>
                <p className="text-3xl font-bold">{stats.totalHours}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+18% from last month</span>
                </div>
              </div>
              <Clock className="h-12 w-12 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in" style={{animationDelay: '200ms'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-3xl font-bold">{stats.averageRating}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-green-600">+0.3 from last month</span>
                </div>
              </div>
              <Star className="h-12 w-12 text-yellow-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in" style={{animationDelay: '300ms'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-3xl font-bold">{stats.completionRate}%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+5% from last month</span>
                </div>
              </div>
              <Target className="h-12 w-12 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in" style={{animationDelay: '400ms'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className="text-3xl font-bold">{stats.responseTime}h</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">-0.5h improvement</span>
                </div>
              </div>
              <Clock className="h-12 w-12 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-scale-in" style={{animationDelay: '500ms'}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Skills</p>
                <p className="text-3xl font-bold">{stats.activeSkills}</p>
                <div className="flex items-center mt-2">
                  <Award className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-sm text-orange-600">2 new this month</span>
                </div>
              </div>
              <Award className="h-12 w-12 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Progress */}
        <Card className="animate-scale-in" style={{animationDelay: '600ms'}}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Monthly Progress
            </CardTitle>
            <CardDescription>Your skill swap activity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="swaps" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                <Area type="monotone" dataKey="hours" stackId="2" stroke="hsl(var(--blue-600))" fill="hsl(var(--blue-500))" fillOpacity={0.4} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rating Trend */}
        <Card className="animate-scale-in" style={{animationDelay: '700ms'}}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Rating Trend
            </CardTitle>
            <CardDescription>Your average rating over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ratingTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[4.0, 5.0]} />
                <Tooltip />
                <Line type="monotone" dataKey="rating" stroke="hsl(var(--yellow-500))" strokeWidth={3} dot={{ fill: 'hsl(var(--yellow-500))' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="animate-scale-in" style={{animationDelay: '800ms'}}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Teaching vs learning sessions by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="teaching" fill="hsl(var(--blue-500))" name="Teaching" />
                <Bar dataKey="learning" fill="hsl(var(--green-500))" name="Learning" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skill Distribution */}
        <Card className="animate-scale-in" style={{animationDelay: '900ms'}}>
          <CardHeader>
            <CardTitle>Skill Distribution</CardTitle>
            <CardDescription>Time spent by skill category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="hours"
                  label={({ name, hours }) => `${name}: ${hours}h`}
                >
                  {skillDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} hours`, 'Time Spent']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="animate-scale-in" style={{animationDelay: '1000ms'}}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Performance Insights
          </CardTitle>
          <CardDescription>Key improvements this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {improvements.map((item, index) => (
              <div key={item.metric} className="flex items-center justify-between p-4 border rounded-lg animate-scale-in" style={{animationDelay: `${(index + 11) * 100}ms`}}>
                <div>
                  <p className="font-medium">{item.metric}</p>
                  <div className="flex items-center mt-1">
                    {item.isPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                    )}
                    <span className="text-sm text-green-600">
                      {item.isPositive ? '+' : '-'}{item.change}%
                    </span>
                  </div>
                </div>
                <Badge variant={item.isPositive ? 'default' : 'secondary'}>
                  {item.isPositive ? 'Improved' : 'Better'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
