import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, Users, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
  is_active: boolean;
}

export const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error loading subscribers:', error);
      toast({
        title: "Error",
        description: "Failed to load subscribers.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendNewsletter = async () => {
    if (!emailData.subject.trim() || !emailData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both subject and message.",
        variant: "destructive",
      });
      return;
    }

    setSendingEmail(true);
    try {
      const { error } = await supabase.functions.invoke('send-newsletter', {
        body: {
          subject: emailData.subject,
          message: emailData.message,
          subscribers: subscribers.filter(s => s.is_active).map(s => s.email),
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Newsletter sent to ${subscribers.filter(s => s.is_active).length} subscribers.`,
      });

      setEmailData({ subject: '', message: '' });
    } catch (error) {
      console.error('Error sending newsletter:', error);
      toast({
        title: "Error",
        description: "Failed to send newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  const toggleSubscriberStatus = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;

      setSubscribers(prev =>
        prev.map(sub =>
          sub.id === id ? { ...sub, is_active: !isActive } : sub
        )
      );

      toast({
        title: "Success",
        description: `Subscriber ${!isActive ? 'activated' : 'deactivated'}.`,
      });
    } catch (error) {
      console.error('Error updating subscriber:', error);
      toast({
        title: "Error",
        description: "Failed to update subscriber status.",
        variant: "destructive",
      });
    }
  };

  const activeSubscribers = subscribers.filter(s => s.is_active);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Subscribers</p>
                <p className="text-2xl font-bold">{subscribers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Subscribers</p>
                <p className="text-2xl font-bold">{activeSubscribers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Send Newsletter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5" />
            <span>Send Newsletter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <Input
              placeholder="Newsletter subject..."
              value={emailData.subject}
              onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <Textarea
              placeholder="Newsletter content..."
              rows={6}
              value={emailData.message}
              onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
            />
          </div>
          <Button
            onClick={sendNewsletter}
            disabled={sendingEmail || !emailData.subject.trim() || !emailData.message.trim()}
            className="w-full"
          >
            {sendingEmail ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending to {activeSubscribers.length} subscribers...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send to {activeSubscribers.length} subscribers
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Subscribers List */}
      <Card>
        <CardHeader>
          <CardTitle>Subscribers</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : subscribers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No subscribers yet.
            </div>
          ) : (
            <div className="space-y-3">
              {subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{subscriber.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Subscribed {new Date(subscriber.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={subscriber.is_active ? 'default' : 'secondary'}>
                      {subscriber.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSubscriberStatus(subscriber.id, subscriber.is_active)}
                    >
                      {subscriber.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};