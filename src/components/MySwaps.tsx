
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Calendar, MessageSquare, CheckCircle, Clock, XCircle, Filter, Plus } from 'lucide-react';

interface Swap {
  id: string;
  partner: {
    name: string;
    avatar: string;
    rating: number;
  };
  mySkill: string;
  partnerSkill: string;
  status: 'active' | 'completed' | 'cancelled';
  startDate: string;
  completedDate?: string;
  rating?: number;
  feedback?: string;
  sessions: number;
  totalSessions: number;
}

const mockSwaps: Swap[] = [
  {
    id: '1',
    partner: { name: 'Alice Johnson', avatar: '/placeholder.svg', rating: 4.8 },
    mySkill: 'Python Development',
    partnerSkill: 'React Development',
    status: 'active',
    startDate: '2024-01-10',
    sessions: 3,
    totalSessions: 6
  },
  {
    id: '2',
    partner: { name: 'Bob Smith', avatar: '/placeholder.svg', rating: 4.9 },
    mySkill: 'UI/UX Design',
    partnerSkill: 'Machine Learning',
    status: 'completed',
    startDate: '2023-12-15',
    completedDate: '2024-01-05',
    rating: 5,
    feedback: 'Excellent teacher! Bob explained ML concepts very clearly and provided great practical examples.',
    sessions: 8,
    totalSessions: 8
  },
  {
    id: '3',
    partner: { name: 'Carol Davis', avatar: '/placeholder.svg', rating: 4.7 },
    mySkill: 'Web Development',
    partnerSkill: 'Digital Marketing',
    status: 'completed',
    startDate: '2023-11-20',
    completedDate: '2023-12-20',
    rating: 4,
    feedback: 'Great marketing insights! Carol helped me understand SEO and content strategy.',
    sessions: 6,
    totalSessions: 6
  },
  {
    id: '4',
    partner: { name: 'David Wilson', avatar: '/placeholder.svg', rating: 4.6 },
    mySkill: 'Mobile Development',
    partnerSkill: 'DevOps',
    status: 'cancelled',
    startDate: '2023-11-01',
    sessions: 2,
    totalSessions: 4
  }
];

export function MySwaps() {
  const navigate = useNavigate();
  const [swaps, setSwaps] = useState(mockSwaps);
  const [activeTab, setActiveTab] = useState('all');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewSwapOpen, setIsNewSwapOpen] = useState(false);
  const itemsPerPage = 3;

  const filteredSwaps = swaps.filter(swap => {
    const matchesTab = activeTab === 'all' || swap.status === activeTab;
    const matchesStatus = statusFilter === '' || swap.status === statusFilter;
    return matchesTab && matchesStatus;
  });

  const totalPages = Math.ceil(filteredSwaps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSwaps = filteredSwaps.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: Swap['status']) => {
    const variants = {
      active: { variant: 'default' as const, icon: Clock, text: 'Active', color: 'text-blue-600' },
      completed: { variant: 'secondary' as const, icon: CheckCircle, text: 'Completed', color: 'text-green-600' },
      cancelled: { variant: 'destructive' as const, icon: XCircle, text: 'Cancelled', color: 'text-red-600' }
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleStartNewSwap = () => {
    setIsNewSwapOpen(false);
    navigate('/browse-skills');
  };

  const handleNewSwapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleStartNewSwap();
  };

  const stats = {
    total: swaps.length,
    active: swaps.filter(s => s.status === 'active').length,
    completed: swaps.filter(s => s.status === 'completed').length,
    cancelled: swaps.filter(s => s.status === 'cancelled').length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          My Swaps
        </h1>
        <div className="flex gap-2">
          <Dialog open={isNewSwapOpen} onOpenChange={setIsNewSwapOpen}>
            <DialogTrigger asChild>
              <Button className="transition-all duration-300 hover:scale-105">
                <Plus className="h-4 w-4 mr-2" />
                Start New Swap
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start New Skill Swap</DialogTitle>
                <DialogDescription>
                  Find someone to swap skills with by browsing available users.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNewSwapSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="skillOffering">What skill are you offering?</Label>
                  <Input id="skillOffering" placeholder="e.g., React Development" />
                </div>
                <div>
                  <Label htmlFor="skillSeeking">What skill do you want to learn?</Label>
                  <Input id="skillSeeking" placeholder="e.g., Python Programming" />
                </div>
                <div>
                  <Label htmlFor="notes">Additional notes (optional)</Label>
                  <Textarea id="notes" placeholder="Any specific requirements or preferences..." />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsNewSwapOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Browse Users</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          <Badge variant="default" className="animate-pulse">
            {stats.active} Active
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
                <p className="text-sm text-muted-foreground">Total Swaps</p>
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
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in" style={{animationDelay: '200ms'}}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in" style={{animationDelay: '300ms'}}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card className="animate-scale-in" style={{animationDelay: '400ms'}}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-scale-in" style={{animationDelay: '500ms'}}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {paginatedSwaps.map((swap, index) => (
            <Card key={swap.id} className="transition-all duration-300 hover:shadow-lg animate-scale-in" style={{animationDelay: `${(index + 6) * 100}ms`}}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={swap.partner.avatar} alt={swap.partner.name} />
                      <AvatarFallback>
                        {swap.partner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{swap.partner.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>★ {swap.partner.rating}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3 w-3 mr-1" />
                        Started {new Date(swap.startDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(swap.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border">
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                      I'm Teaching
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">{swap.mySkill}</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border">
                    <h4 className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                      I'm Learning
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">{swap.partnerSkill}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Progress: {swap.sessions}/{swap.totalSessions} sessions
                  </span>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(swap.sessions / swap.totalSessions) * 100}%` }}
                    />
                  </div>
                </div>

                {swap.status === 'completed' && swap.rating && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">My Rating</h4>
                      <div className="flex items-center gap-1">
                        {renderStars(swap.rating)}
                      </div>
                    </div>
                    {swap.feedback && (
                      <p className="text-sm text-muted-foreground">{swap.feedback}</p>
                    )}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {swap.status === 'active' && (
                    <>
                      <Button size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </>
                  )}
                  {swap.status === 'completed' && (
                    <Button size="sm" variant="outline" className="w-full">
                      View Details
                    </Button>
                  )}
                  {swap.status === 'cancelled' && (
                    <Button size="sm" variant="outline" className="w-full">
                      View Reason
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

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

          {filteredSwaps.length === 0 && (
            <Card className="text-center py-12 animate-scale-in">
              <CardContent>
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Swaps Found</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'all' 
                    ? "You haven't started any skill swaps yet."
                    : `No ${activeTab} swaps to display.`
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
