
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Filter, MapPin, Star, Clock, MessageCircle, UserPlus, Send } from 'lucide-react';

const mockUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    location: 'New York, NY',
    avatar: '/placeholder.svg',
    rating: 4.9,
    reviewCount: 23,
    skillsOffered: ['React', 'TypeScript', 'Node.js'],
    skillsWanted: ['UI/UX Design', 'Figma'],
    availability: 'Weekends',
    isOnline: true,
    description: 'Full-stack developer with 5+ years experience in modern web technologies.',
    isConnected: false
  },
  {
    id: 2,
    name: 'Bob Smith',
    location: 'San Francisco, CA',
    avatar: '/placeholder.svg',
    rating: 4.7,
    reviewCount: 18,
    skillsOffered: ['Python', 'Machine Learning', 'Data Science'],
    skillsWanted: ['React', 'JavaScript'],
    availability: 'Evenings',
    isOnline: false,
    description: 'Data scientist passionate about AI and machine learning applications.',
    isConnected: true
  },
  {
    id: 3,
    name: 'Carol Davis',
    location: 'Austin, TX',
    avatar: '/placeholder.svg',
    rating: 4.8,
    reviewCount: 31,
    skillsOffered: ['UI/UX Design', 'Figma', 'Adobe Creative'],
    skillsWanted: ['Flutter', 'Mobile Development'],
    availability: 'Flexible',
    isOnline: true,
    description: 'Creative designer with expertise in user experience and visual design.',
    isConnected: false
  },
  {
    id: 4,
    name: 'David Wilson',
    location: 'Seattle, WA',
    avatar: '/placeholder.svg',
    rating: 4.6,
    reviewCount: 15,
    skillsOffered: ['DevOps', 'AWS', 'Docker'],
    skillsWanted: ['Frontend Development', 'Vue.js'],
    availability: 'Weekdays',
    isOnline: true,
    description: 'DevOps engineer with cloud infrastructure expertise.',
    isConnected: false
  }
];

export default function BrowseSkills() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [isSwapRequestOpen, setIsSwapRequestOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.skillsOffered.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         user.skillsWanted.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = !selectedLocation || user.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesAvailability = !selectedAvailability || user.availability.toLowerCase() === selectedAvailability.toLowerCase();
    
    return matchesSearch && matchesLocation && matchesAvailability;
  });

  const handleConnect = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isConnected: !user.isConnected } : user
    ));
  };

  const handleSwapRequest = (user) => {
    setSelectedUser(user);
    setIsSwapRequestOpen(true);
  };

  const handleSubmitSwapRequest = (e) => {
    e.preventDefault();
    setIsSwapRequestOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Browse Skills
          </h1>
          <Badge variant="outline" className="animate-pulse w-fit">
            {filteredUsers.length} users found
          </Badge>
        </div>

        {/* Search and Filters */}
        <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search skills or users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  <SelectItem value="new york">New York</SelectItem>
                  <SelectItem value="san francisco">San Francisco</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                  <SelectItem value="seattle">Seattle</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Time</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="evenings">Evenings</SelectItem>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                className="transition-all duration-300 hover:scale-105"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLocation('');
                  setSelectedAvailability('');
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredUsers.map((user, index) => (
            <Card 
              key={user.id} 
              className="transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border/50 hover:border-primary/20 animate-scale-in"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-r from-primary/20 to-primary/10 text-xs sm:text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{user.name}</h3>
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{user.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{user.rating}</span>
                    <span className="text-xs text-muted-foreground">({user.reviewCount})</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground">Offers</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsOffered.map((skill, idx) => (
                        <Badge key={idx} variant="default" className="text-xs animate-in fade-in-0 zoom-in-95" style={{animationDelay: `${idx * 50}ms`}}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground">Wants</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsWanted.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs animate-in fade-in-0 zoom-in-95" style={{animationDelay: `${idx * 50}ms`}}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2">{user.description}</p>

                <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                  Available {user.availability}
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button 
                    size="sm" 
                    variant={user.isConnected ? "secondary" : "default"}
                    className="flex-1 transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                    onClick={() => handleConnect(user.id)}
                  >
                    <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    {user.isConnected ? 'Connected' : 'Connect'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                    onClick={() => handleSwapRequest(user)}
                  >
                    <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Request Swap
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card className="text-center py-12 animate-scale-in">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">No Users Found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters to find more users.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Swap Request Dialog */}
        <Dialog open={isSwapRequestOpen} onOpenChange={setIsSwapRequestOpen}>
          <DialogContent className="sm:max-w-[425px] mx-4">
            <DialogHeader>
              <DialogTitle>Send Swap Request</DialogTitle>
              <DialogDescription>
                Send a skill swap request to {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitSwapRequest} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skillOffered">Skill I'm Offering</Label>
                <Input id="skillOffered" placeholder="e.g., React Development" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skillWanted">Skill I Want to Learn</Label>
                <Input id="skillWanted" placeholder="e.g., Python Programming" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Introduce yourself and explain what you're looking for..."
                  required 
                  className="min-h-[100px]"
                />
              </div>
              <DialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0">
                <Button type="button" variant="outline" onClick={() => setIsSwapRequestOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button type="submit" className="w-full sm:w-auto">Send Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
