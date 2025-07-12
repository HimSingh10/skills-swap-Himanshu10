
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, MapPin, Star, Users, Filter, UserPlus, MessageCircle, Send } from 'lucide-react';

interface User {
  id: string;
  name: string;
  location: string;
  avatar: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  totalSwaps: number;
  availability: string;
  bio: string;
  isConnected: boolean;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    location: 'New York, NY',
    avatar: '/placeholder.svg',
    skillsOffered: ['React', 'JavaScript', 'UI/UX Design'],
    skillsWanted: ['Python', 'Data Science'],
    rating: 4.8,
    totalSwaps: 23,
    availability: 'Weekends',
    bio: 'Frontend developer with 5 years experience',
    isConnected: false
  },
  {
    id: '2',
    name: 'Bob Smith',
    location: 'San Francisco, CA',
    avatar: '/placeholder.svg',
    skillsOffered: ['Python', 'Machine Learning', 'Data Analysis'],
    skillsWanted: ['React', 'Web Development'],
    rating: 4.9,
    totalSwaps: 31,
    availability: 'Evenings',
    bio: 'AI researcher passionate about teaching',
    isConnected: true
  },
  {
    id: '3',
    name: 'Carol Davis',
    location: 'Austin, TX',
    avatar: '/placeholder.svg',
    skillsOffered: ['Digital Marketing', 'SEO', 'Content Writing'],
    skillsWanted: ['Graphic Design', 'Photography'],
    rating: 4.7,
    totalSwaps: 18,
    availability: 'Flexible',
    bio: 'Marketing professional and content creator',
    isConnected: false
  },
  {
    id: '4',
    name: 'David Wilson',
    location: 'Seattle, WA',
    avatar: '/placeholder.svg',
    skillsOffered: ['Node.js', 'Database Design', 'DevOps'],
    skillsWanted: ['Mobile Development', 'Flutter'],
    rating: 4.6,
    totalSwaps: 27,
    availability: 'Weekdays',
    bio: 'Backend engineer with cloud expertise',
    isConnected: false
  },
  {
    id: '5',
    name: 'Eva Martinez',
    location: 'Miami, FL',
    avatar: '/placeholder.svg',
    skillsOffered: ['Graphic Design', 'Adobe Creative Suite', 'Branding'],
    skillsWanted: ['Web Development', 'Animation'],
    rating: 4.9,
    totalSwaps: 42,
    availability: 'Weekends',
    bio: 'Creative designer with brand focus',
    isConnected: true
  },
  {
    id: '6',
    name: 'Frank Chen',
    location: 'Boston, MA',
    avatar: '/placeholder.svg',
    skillsOffered: ['iOS Development', 'Swift', 'Mobile UI'],
    skillsWanted: ['Backend Development', 'Cloud Computing'],
    rating: 4.8,
    totalSwaps: 29,
    availability: 'Evenings',
    bio: 'Mobile developer building innovative apps',
    isConnected: false
  }
];

interface BrowseSkillsProps {
  searchQuery?: string;
}

export function BrowseSkills({ searchQuery = '' }: BrowseSkillsProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSwapRequestOpen, setIsSwapRequestOpen] = useState(false);
  const itemsPerPage = 4;

  const filteredUsers = users.filter(user => {
    const matchesSearch = localSearch === '' || 
      user.name.toLowerCase().includes(localSearch.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.toLowerCase().includes(localSearch.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(localSearch.toLowerCase()));
    
    const matchesSkill = selectedSkill === '' || 
      user.skillsOffered.some(skill => skill.toLowerCase().includes(selectedSkill.toLowerCase()));
    
    const matchesLocation = selectedLocation === '' || 
      user.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    const matchesAvailability = selectedAvailability === '' || 
      user.availability.toLowerCase() === selectedAvailability.toLowerCase();

    return matchesSearch && matchesSkill && matchesLocation && matchesAvailability;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleConnect = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isConnected: !user.isConnected } : user
    ));
  };

  const handleSwapRequest = (user: User, userSkill?: string) => {
    setSelectedUser(user);
    setIsSwapRequestOpen(true);
  };

  const handleSubmitSwapRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle swap request submission
    setIsSwapRequestOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Browse Skills
        </h1>
        <Badge variant="secondary" className="animate-pulse">
          {filteredUsers.length} Users Available
        </Badge>
      </div>

      {/* Filters */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users or skills..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Skills</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="node">Node.js</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="san francisco">San Francisco</SelectItem>
                <SelectItem value="austin">Austin</SelectItem>
                <SelectItem value="seattle">Seattle</SelectItem>
                <SelectItem value="miami">Miami</SelectItem>
                <SelectItem value="boston">Boston</SelectItem>
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
          </div>
        </CardContent>
      </Card>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedUsers.map((user, index) => (
          <Card key={user.id} className="transition-all duration-300 hover:shadow-lg animate-scale-in" style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-r from-primary/20 to-primary/10">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{user.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Users className="h-3 w-3 mr-1" />
                    {user.totalSwaps} swaps • {user.availability}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{user.bio}</p>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Skills Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.map((skill, idx) => (
                    <Badge 
                      key={idx} 
                      className="hover:scale-105 transition-transform cursor-pointer" 
                      onClick={() => handleSwapRequest(user, skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Skills Wanted</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skillsWanted.map((skill, idx) => (
                    <Badge key={idx} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant={user.isConnected ? "secondary" : "default"}
                  className="flex-1 transition-all duration-300 hover:scale-105"
                  onClick={() => handleConnect(user.id)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {user.isConnected ? 'Connected' : 'Connect'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 transition-all duration-300 hover:scale-105"
                  onClick={() => handleSwapRequest(user)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Request Swap
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 animate-fade-in">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="transition-all duration-300"
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {filteredUsers.length === 0 && (
        <Card className="text-center py-12 animate-scale-in">
          <CardContent>
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Users Found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to find more users.</p>
          </CardContent>
        </Card>
      )}

      {/* Swap Request Dialog */}
      <Dialog open={isSwapRequestOpen} onOpenChange={setIsSwapRequestOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Swap Request</DialogTitle>
            <DialogDescription>
              Send a skill swap request to {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitSwapRequest} className="space-y-4">
            <div>
              <Label htmlFor="skillOffered">Skill I'm Offering</Label>
              <Input id="skillOffered" placeholder="e.g., React Development" required />
            </div>
            <div>
              <Label htmlFor="skillWanted">Skill I Want to Learn</Label>
              <Input id="skillWanted" placeholder="e.g., Python Programming" required />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Introduce yourself and explain what you're looking for..."
                required 
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsSwapRequestOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
