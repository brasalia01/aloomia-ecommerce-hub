import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MessageSquare, 
  Send, 
  User, 
  Bot,
  Clock,
  CheckCircle,
  Circle
} from 'lucide-react';

interface Chat {
  id: string;
  user_id: string;
  guest_email: string;
  started_at: string;
  last_message_at: string;
  is_open: boolean;
  profiles?: {
    full_name: string;
    email: string;
  };
}

interface ChatMessage {
  id: string;
  chat_id: string;
  sender: 'user' | 'admin' | 'bot';
  sender_id: string;
  message: string;
  read_by_admin: boolean;
  created_at: string;
}

interface AdminChatManagerProps {
  onStatsUpdate: () => void;
}

const AdminChatManager: React.FC<AdminChatManagerProps> = ({ onStatsUpdate }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadChats();
    setupRealtimeSubscription();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat.id);
      markMessagesAsRead(selectedChat.id);
    }
  }, [selectedChat]);

  const setupRealtimeSubscription = () => {
    const chatSubscription = supabase
      .channel('admin-chats')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'chats'
      }, () => {
        loadChats();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'chat_messages'
      }, (payload) => {
        if (selectedChat && payload.new && (payload.new as any).chat_id === selectedChat.id) {
          loadMessages(selectedChat.id);
        }
        onStatsUpdate();
      })
      .subscribe();

    return () => {
      chatSubscription.unsubscribe();
    };
  };

  const loadChats = async () => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select(`
          *,
          profiles!chats_user_id_fkey (
            full_name,
            email
          )
        `)
        .order('last_message_at', { ascending: false, nullsFirst: false })
        .order('started_at', { ascending: false });

      if (error) throw error;
      setChats((data as any) || []);
    } catch (error) {
      console.error('Error loading chats:', error);
      toast({
        title: "Error",
        description: "Failed to load chats",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (chatId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  };

  const markMessagesAsRead = async (chatId: string) => {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .update({ read_by_admin: true })
        .eq('chat_id', chatId)
        .eq('read_by_admin', false);

      if (error) throw error;
      onStatsUpdate();
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !user) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert([{
          chat_id: selectedChat.id,
          sender: 'admin',
          sender_id: user.id,
          message: newMessage.trim(),
          read_by_admin: true
        }]);

      if (error) throw error;

      // Update chat's last_message_at
      await supabase
        .from('chats')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', selectedChat.id);

      setNewMessage('');
      loadMessages(selectedChat.id);
      loadChats();
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const toggleChatStatus = async (chatId: string, isOpen: boolean) => {
    try {
      const { error } = await supabase
        .from('chats')
        .update({ is_open: !isOpen })
        .eq('id', chatId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Chat ${!isOpen ? 'opened' : 'closed'} successfully`,
      });

      loadChats();
      if (selectedChat?.id === chatId) {
        setSelectedChat(prev => prev ? { ...prev, is_open: !isOpen } : null);
      }
    } catch (error: any) {
      console.error('Error updating chat status:', error);
      toast({
        title: "Error",
        description: "Failed to update chat status",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getChatDisplayName = (chat: Chat) => {
    if (chat.profiles?.full_name) return chat.profiles.full_name;
    if (chat.profiles?.email) return chat.profiles.email;
    if (chat.guest_email) return chat.guest_email;
    return 'Anonymous User';
  };

  const hasUnreadMessages = (chatId: string) => {
    return messages.some(msg => msg.chat_id === chatId && !msg.read_by_admin && msg.sender !== 'admin');
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading chats...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Chat Management</h2>
        <Badge variant="secondary" className="px-3 py-1">
          {chats.filter(chat => chat.is_open).length} Active Chats
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Customer Chats</CardTitle>
            <CardDescription>Select a chat to view and respond</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-[480px] overflow-y-auto">
              {chats.map((chat) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 cursor-pointer border-b transition-colors ${
                    selectedChat?.id === chat.id 
                      ? 'bg-primary/10 border-primary/20' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">
                          {getChatDisplayName(chat)}
                        </h4>
                        {hasUnreadMessages(chat.id) && (
                          <Circle className="w-2 h-2 fill-red-500 text-red-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(chat.last_message_at || chat.started_at)}
                      </p>
                    </div>
                    <Badge variant={chat.is_open ? "default" : "secondary"} className="text-xs">
                      {chat.is_open ? 'Open' : 'Closed'}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="lg:col-span-2">
          {selectedChat ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {getChatDisplayName(selectedChat)}
                    </CardTitle>
                    <CardDescription>
                      Chat started {formatDate(selectedChat.started_at)}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleChatStatus(selectedChat.id, selectedChat.is_open)}
                  >
                    {selectedChat.is_open ? 'Close Chat' : 'Reopen Chat'}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="flex flex-col h-[400px]">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'admin'
                            ? 'bg-primary text-primary-foreground'
                            : message.sender === 'bot'
                            ? 'bg-muted border border-border'
                            : 'bg-muted'
                        }`}>
                          <div className="flex items-center space-x-2 mb-1">
                            {message.sender === 'admin' ? (
                              <User className="w-3 h-3" />
                            ) : message.sender === 'bot' ? (
                              <Bot className="w-3 h-3" />
                            ) : (
                              <MessageSquare className="w-3 h-3" />
                            )}
                            <span className="text-xs opacity-75">
                              {message.sender === 'admin' ? 'You' : message.sender === 'bot' ? 'Bot' : 'Customer'}
                            </span>
                            <span className="text-xs opacity-50">
                              {formatDate(message.created_at)}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Input */}
                  {selectedChat.is_open && (
                    <div className="flex items-center space-x-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      />
                      <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a chat</h3>
              <p className="text-muted-foreground">
                Choose a chat from the list to view messages and respond to customers.
              </p>
            </CardContent>
          )}
        </Card>
      </div>

      {chats.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No chats yet</h3>
            <p className="text-muted-foreground">
              Customer support chats will appear here when users start conversations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminChatManager;