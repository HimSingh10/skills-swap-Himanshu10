
import { Star, MapPin, Clock, User, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SkillCardProps {
  id: string;
  userName: string;
  userAvatar?: string;
  location?: string;
  skillOffered: string;
  skillWanted: string;
  rating: number;
  reviewCount: number;
  availability: string;
  isOnline: boolean;
  description: string;
}

export function SkillCard({
  userName,
  userAvatar,
  location,
  skillOffered,
  skillWanted,
  rating,
  reviewCount,
  availability,
  isOnline,
  description,
}: SkillCardProps) {
  return (
    <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border/50 hover:border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="bg-gradient-to-r from-primary/20 to-primary/10">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{userName}</h3>
            {location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {location}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-muted-foreground">Offers</span>
              <Badge variant="default" className="animate-in fade-in-0 zoom-in-95">
                {skillOffered}
              </Badge>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-muted-foreground">Wants</span>
              <Badge variant="outline" className="animate-in fade-in-0 zoom-in-95 delay-100">
                {skillWanted}
              </Badge>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          Available {availability}
        </div>
      </CardContent>

      <CardFooter className="pt-2 space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 transition-all duration-300 hover:scale-105"
        >
          <User className="h-4 w-4 mr-2" />
          View Profile
        </Button>
        <Button 
          size="sm" 
          className="flex-1 transition-all duration-300 hover:scale-105 hover:shadow-md"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Swap Request
        </Button>
      </CardFooter>
    </Card>
  );
}
