
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Star, Calendar, Clock, MessageCircle, User, CheckCircle } from 'lucide-react';

const mockSwaps = [
  {
    id: 1,
    partnerName: 'Alice Johnson',
    partnerAvatar: '/placeholder.svg',
    skillTaught: 'React',
    skillLearned: 'UI/UX Design',
    status: 'completed',
    date: '2024-01-15',
    rating: 5,
    feedback: 'Excellent teacher! Very patient and knowledgeable.',
    duration: '2 hours'
  },
  {
    id: 2,
    partnerName: 'Bob Smith',
    partnerAvatar: '/placeholder.svg',
    skillTaught: 'JavaScript',
    skillLearned: 'Python',
    status: 'ongoing',
    date: '2024-01-20',
    rating: null,
    feedback: null,
    duration: '1.5 hours'
  },
  {
    id: 3,
    partnerName: 'Carol Davis',
    partnerAvatar: '/placeholder.svg',
    skillTaught: 'Node.js',
    skillLearned: 'Figma',
    status: 'completed',
    date: '2024-01-08',
    rating: 4,
    feedback: 'Great session, learned a lot about Figma basics.',
    duration: '3 hours'
  },
  {
    id: 4,
    partnerName: 'David Wilson',
    partnerAvatar: '/placeholder.svg',
    skillTaught: 'TypeScript',
    skillLearned: 'Docker',
    status: 'scheduled',
    date: '2024-01-25',
    rating: null,
    feedback: null,
    duration: '2 hours'
  }
];

export default function MySwaps() {
  const [swaps, setSwaps] = useState(mockSwaps);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredSwaps = swaps.filter(swap => 
    statusFilter === 'all' || swap.status === statusFilter
  );

  const totalPages = Math.ceil(filteredSwaps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSwaps = filteredSwaps.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'ongoing': return <Clock className="h-4 w-4" />;
      case 'scheduled': return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            My Swaps
          </h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="animate-pulse">
              {filteredSwaps.length} swaps
            </Badge>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {swaps.filter(s => s.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in" style={{animationDelay: '100ms'}}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ongoing</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {swaps.filter(s => s.status === 'ongoing').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in" style={{animationDelay: '200ms'}}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {swaps.filter(s => s.status === 'scheduled').length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-lg animate-scale-in" style={{animationDelay: '300ms'}}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">4.7</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500 fill-current" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Swaps List */}
        <div className="space-y-4">
          {paginatedSwaps.map((swap, index) => (
            <Card 
              key={swap.id} 
              className="transition-all duration-300 hover:shadow-lg animate-scale-in"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={swap.partnerAvatar} alt={swap.partnerName} />
                    <AvatarFallback className="bg-gradient-to-r from-primary/20 to-primary/10">
                      {swap.partnerName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{swap.partnerName}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(swap.date).toLocaleDateString()}</span>
                          <Clock className="h-4 w-4 ml-2" />
                          <span>{swap.duration}</span>
                        </div>
                      </div>
                      <Badge 
                        className={`${getStatusColor(swap.status)} flex items-center space-x-1 animate-pulse`}
                      >
                        {getStatusIcon(swap.status)}
                        <span className="capitalize">{swap.status}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-green-800 mb-1">You taught</p>
                        <Badge variant="default" className="bg-green-600">{swap.skillTaught}</Badge>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-blue-800 mb-1">You learned</p>
                        <Badge variant="outline" className="border-blue-300 text-blue-700">{swap.skillLearned}</Badge>
                      </div>
                    </div>

                    {swap.status === 'completed' && swap.rating && (
                      <div className="bg-muted/30 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-muted-foreground">Feedback & Rating</p>
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < swap.rating
                                    ? 'text-yellow-500 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{swap.feedback}</p>
                      </div>
                    )}

                    <div className="flex space-x-2 pt-2">
                      {swap.status === 'scheduled' && (
                        <>
                          <Button
                            size="sm"
                            className="transition-all duration-300 hover:scale-105"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Join Session
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="transition-all duration-300 hover:scale-105"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </>
                      )}
                      
                      {swap.status === 'ongoing' && (
                        <>
                          <Button
                            size="sm"
                            className="transition-all duration-300 hover:scale-105"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="transition-all duration-300 hover:scale-105"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </>
                      )}
                      
                      {swap.status === 'completed' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center animate-fade-in">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {filteredSwaps.length === 0 && (
          <Card className="animate-scale-in">
            <CardContent className="p-12 text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No swaps found</h3>
              <p className="text-muted-foreground">
                {statusFilter === 'all' 
                  ? "You haven't completed any skill swaps yet." 
                  : `No ${statusFilter} swaps found.`}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
