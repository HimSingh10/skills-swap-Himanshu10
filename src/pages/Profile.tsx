
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Camera, MapPin, Star, TrendingUp, Users, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const skillData = [
  { month: 'Jan', swaps: 4 },
  { month: 'Feb', swaps: 6 },
  { month: 'Mar', swaps: 8 },
  { month: 'Apr', swaps: 5 },
  { month: 'May', swaps: 10 },
  { month: 'Jun', swaps: 12 }
];

const skillCategories = [
  { name: 'Programming', value: 40, color: '#8884d8' },
  { name: 'Design', value: 30, color: '#82ca9d' },
  { name: 'Marketing', value: 20, color: '#ffc658' },
  { name: 'Others', value: 10, color: '#ff7300' }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    location: 'San Francisco, CA',
    bio: 'Full-stack developer passionate about creating innovative solutions and sharing knowledge.',
    skillsOffered: ['React', 'Node.js', 'Python'],
    skillsWanted: ['UI/UX Design', 'Machine Learning'],
    availability: 'Weekends',
    isPublic: true
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            My Profile
          </h1>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            className="transition-all duration-300 hover:scale-105"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <Avatar className="h-20 w-20 transition-transform duration-300 group-hover:scale-110">
                      <AvatarImage src="/placeholder.svg" alt={profileData.name} />
                      <AvatarFallback className="text-lg bg-gradient-to-r from-primary/20 to-primary/10">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full animate-bounce"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="text-xl font-semibold"
                        />
                        <Input
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          placeholder="Location"
                        />
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-2xl font-semibold">{profileData.name}</h2>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {profileData.location}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">{profileData.bio}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Skills Offered</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.skillsOffered.map((skill, index) => (
                        <Badge key={index} className="animate-in fade-in-0 zoom-in-95" style={{animationDelay: `${index * 100}ms`}}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Skills Wanted</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.skillsWanted.map((skill, index) => (
                        <Badge key={index} variant="outline" className="animate-in fade-in-0 zoom-in-95" style={{animationDelay: `${index * 100}ms`}}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Availability</Label>
                    <p className="text-sm text-muted-foreground">{profileData.availability}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="public-profile">Public Profile</Label>
                    <Switch
                      id="public-profile"
                      checked={profileData.isPublic}
                      onCheckedChange={(checked) => setProfileData({...profileData, isPublic: checked})}
                    />
                  </div>
                </div>

                {isEditing && (
                  <Button onClick={handleSave} className="w-full">
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Swap Activity Chart */}
            <Card className="animate-scale-in" style={{animationDelay: '200ms'}}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Swap Activity
                </CardTitle>
                <CardDescription>Your monthly skill swap activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={skillData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="swaps" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card className="animate-scale-in" style={{animationDelay: '100ms'}}>
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <span className="font-semibold">4.8/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm">Total Swaps</span>
                  </div>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">This Month</span>
                  </div>
                  <span className="font-semibold">12</span>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{animationDelay: '300ms'}}>
              <CardHeader>
                <CardTitle>Skill Categories</CardTitle>
                <CardDescription>Distribution of your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={skillCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {skillCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
