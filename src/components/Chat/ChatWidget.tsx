import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  message: string;
  sender: 'user' | 'admin';
  created_at: string;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUserId(user?.id || null);
  };

  useEffect(() => {
    if (isOpen && userId) {
      loadOrCreateChat();
    }
  }, [isOpen, userId]);

  useEffect(() => {
    if (chatId) {
      loadMessages();
      setupRealtimeSubscription();
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const loadOrCreateChat = async () => {
    if (!userId) return;

    const { data: existingChats } = await supabase
      .from('chats')
      .select('*')
      .eq('user_id', userId)
      .eq('is_open', true)
      .order('started_at', { ascending: false })
      .limit(1);

    if (existingChats && existingChats.length > 0) {
      setChatId(existingChats[0].id);
    } else {
      const { data: newChat, error } = await supabase
        .from('chats')
        .insert({ user_id: userId })
        .select()
        .single();

      if (error) {
        toast({ title: 'Error creating chat', variant: 'destructive' });
        return;
      }
      setChatId(newChat.id);
    }
  };

  const loadMessages = async () => {
    if (!chatId) return;

    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (data) {
      setMessages(data.map(msg => ({
        id: msg.id,
        message: msg.message,
        sender: msg.sender as 'user' | 'admin',
        created_at: msg.created_at
      })));
    }
  };

  const setupRealtimeSubscription = () => {
    if (!chatId) return;

    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_id=eq.${chatId}`
        },
        (payload) => {
          const newMsg = payload.new as any;
          setMessages(prev => [...prev, {
            id: newMsg.id,
            message: newMsg.message,
            sender: newMsg.sender,
            created_at: newMsg.created_at
          }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !chatId || !userId) return;

    const { error } = await supabase
      .from('chat_messages')
      .insert({
        chat_id: chatId,
        sender: 'user',
        sender_id: userId,
        message: newMessage.trim()
      });

    if (error) {
      toast({ title: 'Error sending message', variant: 'destructive' });
      return;
    }

    await supabase
      .from('chats')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', chatId);

    setNewMessage('');
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-background border rounded-lg shadow-2xl flex flex-col z-50">
      <div className="p-4 border-b flex justify-between items-center bg-primary text-primary-foreground rounded-t-lg">
        <h3 className="font-semibold">Customer Support</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-primary/90"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={userId ? "Type a message..." : "Please login to chat"}
          disabled={!userId}
        />
        <Button onClick={sendMessage} size="icon" disabled={!userId}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
