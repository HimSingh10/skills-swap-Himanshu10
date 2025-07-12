
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Send, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  partner: {
    name: string;
    avatar: string;
  };
}

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'partner',
    content: 'Hi! I saw your React skills and I\'m interested in learning from you.',
    timestamp: new Date('2024-01-15T10:30:00'),
    isOwn: false
  },
  {
    id: '2',
    senderId: 'me',
    content: 'That sounds great! I\'d love to help you with React. What specific areas are you interested in?',
    timestamp: new Date('2024-01-15T10:35:00'),
    isOwn: true
  },
  {
    id: '3',
    senderId: 'partner',
    content: 'I\'m particularly interested in hooks and state management. Can we schedule a session?',
    timestamp: new Date('2024-01-15T10:40:00'),
    isOwn: false
  }
];

export function ChatInterface({ isOpen, onClose, partner }: ChatInterfaceProps) {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: newMessage,
      timestamp: new Date(),
      isOwn: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={partner.avatar} alt={partner.name} />
              <AvatarFallback>
                {partner.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <DialogTitle>{partner.name}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.isOwn
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="border-t pt-4 flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
