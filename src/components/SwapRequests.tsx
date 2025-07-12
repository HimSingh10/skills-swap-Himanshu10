
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, Clock, MessageSquare, User, Calendar, Plus } from 'lucide-react';
import { ChatInterface } from './ChatInterface';

interface SwapRequest {
  id: string;
  type: 'incoming' | 'outgoing';
  user: {
    name: string;
    avatar: string;
    rating: number;
  };
  skillOffered: string;
  skillWanted: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  date: string;
  availability: string;
}

const mockRequests: SwapRequest[] = [
  {
    id: '1',
    type: 'incoming',
    user: { name: 'Alice Johnson', avatar: '/placeholder.svg', rating: 4.8 },
    skillOffered: 'React Development',
    skillWanted: 'Python Basics',
    message: 'Hi! Id love to learn Python basics in exchange for React development lessons. I have 3 years of React experience.',
    status: 'pending',
    date: '2024-01-15',
    availability: 'Weekends'
  },
  {
    id: '2',
    type: 'incoming',
    user: { name: 'Bob Smith', avatar: '/placeholder.svg', rating: 4.9 },
    skillOffered: 'Machine Learning',
    skillWanted: 'UI/UX Design',
    message: 'Looking to swap ML knowledge for design skills. I can teach fundamentals and practical applications.',
    status: 'pending',
    date: '2024-01-14',
    availability: 'Evenings'
  },
  {
    id: '3',
    type: 'outgoing',
    user: { name: 'Carol Davis', avatar: '/placeholder.svg', rating: 4.7 },
    skillOffered: 'Digital Marketing',
    skillWanted: 'Web Development',
    message: 'Hi Carol! I saw your marketing expertise and would love to trade web development skills.',
    status: 'accepted',
    date: '2024-01-13',
    availability: 'Flexible'
  },
  {
    id: '4',
    type: 'outgoing',
    user: { name: 'David Wilson', avatar: '/placeholder.svg', rating: 4.6 },
    skillOffered: 'DevOps',
    skillWanted: 'Mobile Development',
    message: 'Interested in learning mobile dev. I can share DevOps and cloud deployment knowledge.',
    status: 'rejected',
    date: '2024-01-12',
    availability: 'Weekdays'
  }
];

export function SwapRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(mockRequests);
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false);
  const [chatPartner, setChatPartner] = useState<{name: string; avatar: string} | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleAccept = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' as const } : req
    ));
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' as const } : req
    ));
  };

  const handleMessage = (user: {name: string; avatar: string}) => {
    setChatPartner(user);
    setIsChatOpen(true);
  };

  const handleSchedule = () => {
    navigate('/schedule');
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle request creation
    setIsCreateRequestOpen(false);
  };

  const getStatusBadge = (status: SwapRequest['status']) => {
    const variants = {
      pending: { variant: 'secondary' as const, icon: Clock, text: 'Pending' },
      accepted: { variant: 'default' as const, icon: Check, text: 'Accepted' },
      rejected: { variant: 'destructive' as const, icon: X, text: 'Rejected' },
      completed: { variant: 'outline' as const, icon: Check, text: 'Completed' }
    };
    
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true;
    if (activeTab === 'incoming') return request.type === 'incoming';
    if (activeTab === 'outgoing') return request.type === 'outgoing';
    if (activeTab === 'pending') return request.status === 'pending';
    return true;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    accepted: requests.filter(r => r.status === 'accepted').length,
    incoming: requests.filter(r => r.type === 'incoming').length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Swap Requests
        </h1>
        <div className="flex gap-2">
          <Dialog open={isCreateRequestOpen} onOpenChange={setIsCreateRequestOpen}>
            <DialogTrigger asChild>
              <Button className="transition-all duration-300 hover:scale-105">
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Swap Request</DialogTitle>
                <DialogDescription>
                  Send a skill swap request to another user.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateRequest} className="space-y-4">
                <div>
                  <Label htmlFor="recipient">Send to</Label>
                  <Input id="recipient" placeholder="Enter username or email" required />
                </div>
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
                  <Button type="button" variant="outline" onClick={() => setIsCreateRequestOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Send Request</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          <Badge variant="secondary" className="animate-pulse">
            {stats.pending} Pending
          </Badge>
          <Badge variant="outline">
            {stats.total} Total
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="animate-scale-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in" style={{animationDelay: '100ms'}}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in" style={{animationDelay: '200ms'}}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accepted</p>
                <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
              </div>
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in" style={{animationDelay: '300ms'}}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Incoming</p>
                <p className="text-2xl font-bold text-blue-600">{stats.incoming}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-scale-in" style={{animationDelay: '400ms'}}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="incoming">Incoming</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredRequests.map((request, index) => (
            <Card key={request.id} className="transition-all duration-300 hover:shadow-lg animate-scale-in" style={{animationDelay: `${(index + 5) * 100}ms`}}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={request.user.avatar} alt={request.user.name} />
                      <AvatarFallback>
                        {request.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{request.user.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>★ {request.user.rating}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3 w-3 mr-1" />
                        {request.availability}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(request.status)}
                    <Badge variant={request.type === 'incoming' ? 'default' : 'secondary'}>
                      {request.type === 'incoming' ? 'Incoming' : 'Outgoing'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border">
                    <h4 className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                      Skill Offered
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">{request.skillOffered}</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border">
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                      Skill Wanted
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">{request.skillWanted}</p>
                  </div>
                </div>
                
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Message</h4>
                  <p className="text-sm text-muted-foreground">{request.message}</p>
                </div>

                {request.status === 'pending' && request.type === 'incoming' && (
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAccept(request.id)}
                      className="flex-1 transition-all duration-300 hover:scale-105"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleReject(request.id)}
                      className="flex-1 transition-all duration-300 hover:scale-105"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}

                {request.status === 'accepted' && (
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleMessage(request.user)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleSchedule}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {filteredRequests.length === 0 && (
            <Card className="text-center py-12 animate-scale-in">
              <CardContent>
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Requests Found</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'pending' 
                    ? "You don't have any pending requests at the moment."
                    : `No ${activeTab} requests to display.`
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Chat Interface */}
      {chatPartner && (
        <ChatInterface
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          partner={chatPartner}
        />
      )}
    </div>
  );
}
