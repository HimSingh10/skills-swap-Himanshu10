
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Clock, User, Plus, Video, MapPin, MessageSquare, Settings, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleEvent {
  id: string;
  title: string;
  partner: {
    name: string;
    avatar: string;
  };
  skill: string;
  date: Date;
  time: string;
  duration: number;
  type: 'teaching' | 'learning';
  location: 'online' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
}

const mockEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'React Fundamentals Session',
    partner: { name: 'Alice Johnson', avatar: '/placeholder.svg' },
    skill: 'React Development',
    date: new Date(2024, 0, 20),
    time: '10:00 AM',
    duration: 60,
    type: 'teaching',
    location: 'online',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Python Basics Workshop',
    partner: { name: 'Bob Smith', avatar: '/placeholder.svg' },
    skill: 'Python Programming',
    date: new Date(2024, 0, 22),
    time: '2:00 PM',
    duration: 90,
    type: 'learning',
    location: 'online',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'UI/UX Design Review',
    partner: { name: 'Carol Davis', avatar: '/placeholder.svg' },
    skill: 'UI/UX Design',
    date: new Date(2024, 0, 18),
    time: '3:00 PM',
    duration: 60,
    type: 'learning',
    location: 'in-person',
    status: 'completed'
  }
];

export function Schedule() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(mockEvents);
  const [activeTab, setActiveTab] = useState('calendar');
  const [isNewSessionOpen, setIsNewSessionOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const upcomingEvents = events
    .filter(event => event.status === 'upcoming' && event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const getEventTypeColor = (type: 'teaching' | 'learning') => {
    return type === 'teaching' 
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      upcoming: 'default',
      completed: 'secondary',
      cancelled: 'destructive'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewSessionOpen(false);
  };

  const handleSetAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAvailabilityOpen(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in p-3 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Schedule
        </h1>
        <div className="flex flex-wrap gap-2">
          <Dialog open={isNewSessionOpen} onOpenChange={setIsNewSessionOpen}>
            <DialogTrigger asChild>
              <Button className="transition-all duration-300 hover:scale-105 text-sm">
                <Plus className="h-4 w-4 mr-2" />
                New Session
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] mx-4">
              <DialogHeader>
                <DialogTitle>Schedule New Session</DialogTitle>
                <DialogDescription>
                  Create and schedule a new skill swap session.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSession} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Session Title</Label>
                  <Input id="title" placeholder="Enter session title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partner">Partner</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select partner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alice">Alice Johnson</SelectItem>
                      <SelectItem value="bob">Bob Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skill">Skill</Label>
                  <Input id="skill" placeholder="Enter skill" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="in-person">In Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Add any additional notes..." />
                </div>
                <DialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0">
                  <Button type="button" variant="outline" onClick={() => setIsNewSessionOpen(false)} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto">Create Session</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAvailabilityOpen} onOpenChange={setIsAvailabilityOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="transition-all duration-300 hover:scale-105 text-sm">
                <Settings className="h-4 w-4 mr-2" />
                Set Availability
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] mx-4">
              <DialogHeader>
                <DialogTitle>Set Your Availability</DialogTitle>
                <DialogDescription>
                  Configure when you're available for skill swap sessions.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSetAvailability} className="space-y-4">
                <div className="space-y-2">
                  <Label>Available Days</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <Button key={day} variant="outline" size="sm" type="button">
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input id="start-time" type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input id="end-time" type="time" />
                  </div>
                </div>
                <DialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0">
                  <Button type="button" variant="outline" onClick={() => setIsAvailabilityOpen(false)} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto">Save Availability</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="animate-scale-in">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">This Week</p>
                <p className="text-xl sm:text-2xl font-bold">5</p>
              </div>
              <CalendarDays className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in" style={{animationDelay: '100ms'}}>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Teaching</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">3</p>
              </div>
              <User className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in" style={{animationDelay: '200ms'}}>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Learning</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">2</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in" style={{animationDelay: '300ms'}}>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Hours</p>
                <p className="text-xl sm:text-2xl font-bold">12</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="calendar" className="text-xs sm:text-sm">Calendar</TabsTrigger>
          <TabsTrigger value="upcoming" className="text-xs sm:text-sm">Upcoming</TabsTrigger>
          <TabsTrigger value="history" className="text-xs sm:text-sm">History</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card className="animate-scale-in" style={{animationDelay: '400ms'}}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">Calendar</CardTitle>
                  <CardDescription className="text-sm">
                    Click on a date to view scheduled sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className={cn("w-full pointer-events-auto")}
                    modifiers={{
                      hasEvents: (date) => getEventsForDate(date).length > 0
                    }}
                    modifiersStyles={{
                      hasEvents: {
                        backgroundColor: 'hsl(var(--primary))',
                        color: 'hsl(var(--primary-foreground))',
                        borderRadius: '50%'
                      }
                    }}
                  />
                </CardContent>
              </Card>

              {/* Selected Date Events */}
              {selectedDate && selectedDateEvents.length > 0 && (
                <Card className="mt-4 sm:mt-6 animate-scale-in" style={{animationDelay: '500ms'}}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      Events for {selectedDate.toLocaleDateString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    {selectedDateEvents.map((event, index) => (
                      <div key={event.id} className="flex items-center space-x-3 sm:space-x-4 p-3 border rounded-lg animate-scale-in" style={{animationDelay: `${(index + 6) * 100}ms`}}>
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                          <AvatarImage src={event.partner.avatar} alt={event.partner.name} />
                          <AvatarFallback className="text-xs">
                            {event.partner.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                            <h4 className="font-medium text-sm sm:text-base truncate">{event.title}</h4>
                            <Badge className={cn(getEventTypeColor(event.type), "text-xs w-fit")}>
                              {event.type}
                            </Badge>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            <span>{event.time}</span>
                            <span className="mx-2">•</span>
                            <span>{event.duration} min</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center">
                              {event.location === 'online' ? (
                                <><Video className="h-3 w-3 mr-1" /> Online</>
                              ) : (
                                <><MapPin className="h-3 w-3 mr-1" /> In-person</>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                          {getStatusBadge(event.status)}
                          <Button size="sm" variant="outline" className="text-xs">
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Upcoming Events Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              <Card className="animate-scale-in" style={{animationDelay: '600ms'}}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
                  <CardDescription className="text-sm">Your next scheduled skill swaps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={event.id} className="flex items-center space-x-3 p-3 border rounded-lg transition-all duration-300 hover:shadow-md animate-scale-in" style={{animationDelay: `${(index + 7) * 100}ms`}}>
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={event.partner.avatar} alt={event.partner.name} />
                        <AvatarFallback className="text-xs">
                          {event.partner.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{event.skill}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.date.toLocaleDateString()} • {event.time}
                        </p>
                      </div>
                      <Badge className={cn(getEventTypeColor(event.type), "text-xs")}>
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                  
                  {upcomingEvents.length === 0 && (
                    <div className="text-center py-6 sm:py-8">
                      <CalendarDays className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">No upcoming sessions</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>All your scheduled upcoming skill swap sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={event.partner.avatar} alt={event.partner.name} />
                      <AvatarFallback>
                        {event.partner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.date.toLocaleDateString()} at {event.time} • {event.duration} min
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm">
                      Join Session
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>Your completed and cancelled sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.filter(event => event.status !== 'upcoming').map((event) => (
                <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={event.partner.avatar} alt={event.partner.name} />
                      <AvatarFallback>
                        {event.partner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.date.toLocaleDateString()} at {event.time} • {event.duration} min
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(event.status)}
                    {event.status === 'completed' && (
                      <Button size="sm" variant="outline">
                        Rate Session
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
