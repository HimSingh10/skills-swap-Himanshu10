
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, User, MessageSquare, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const mockRequests = [
  {
    id: 1,
    requesterName: 'Alice Johnson',
    requesterAvatar: '/placeholder.svg',
    offeredSkill: 'React',
    requestedSkill: 'UI/UX Design',
    status: 'pending',
    message: 'Hi! I\'d love to learn UI/UX design from you. I can teach React in return.',
    createdAt: '2024-01-15',
    rating: 4.9
  },
  {
    id: 2,
    requesterName: 'Bob Smith',
    requesterAvatar: '/placeholder.svg',
    offeredSkill: 'Python',
    requestedSkill: 'JavaScript',
    status: 'accepted',
    message: 'Looking forward to learning JavaScript while sharing Python knowledge.',
    createdAt: '2024-01-12',
    rating: 4.7
  },
  {
    id: 3,
    requesterName: 'Carol Davis',
    requesterAvatar: '/placeholder.svg',
    offeredSkill: 'Figma',
    requestedSkill: 'React',
    status: 'rejected',
    message: 'I\'m interested in learning React development. Can teach Figma in exchange.',
    createdAt: '2024-01-10',
    rating: 4.8
  }
];

export default function SwapRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const [statusFilter, setStatusFilter] = useState('all');

  const handleAccept = (requestId: number) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'accepted' }
          : req
      )
    );
    toast({
      title: "Request Accepted",
      description: "You've accepted the swap request. You can now schedule your session.",
    });
  };

  const handleReject = (requestId: number) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected' }
          : req
      )
    );
    toast({
      title: "Request Rejected",
      description: "The swap request has been declined.",
      variant: "destructive",
    });
  };

  const filteredRequests = requests.filter(req => 
    statusFilter === 'all' || req.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Swap Requests
          </h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="animate-pulse">
              {filteredRequests.length} requests
            </Badge>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {requests.filter(r => r.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in" style={{animationDelay: '100ms'}}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Accepted</p>
                  <p className="text-2xl font-bold text-green-600">
                    {requests.filter(r => r.status === 'accepted').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in" style={{animationDelay: '200ms'}}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{requests.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request, index) => (
            <Card 
              key={request.id} 
              className="transition-all duration-300 hover:shadow-lg animate-scale-in"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={request.requesterAvatar} alt={request.requesterName} />
                    <AvatarFallback className="bg-gradient-to-r from-primary/20 to-primary/10">
                      {request.requesterName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{request.requesterName}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Requested on {new Date(request.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge 
                        className={`${getStatusColor(request.status)} flex items-center space-x-1 animate-pulse`}
                      >
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Offers to teach</p>
                        <Badge variant="default">{request.offeredSkill}</Badge>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Wants to learn</p>
                        <Badge variant="outline">{request.requestedSkill}</Badge>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Message</p>
                      <p className="text-sm">{request.message}</p>
                    </div>

                    {request.status === 'pending' && (
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleAccept(request.id)}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(request.id)}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    )}

                    {request.status === 'accepted' && (
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Session
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <Card className="animate-scale-in">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No requests found</h3>
              <p className="text-muted-foreground">
                {statusFilter === 'all' 
                  ? "You don't have any swap requests yet." 
                  : `No ${statusFilter} requests found.`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
