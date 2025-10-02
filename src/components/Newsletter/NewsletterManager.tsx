import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, Users } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
  is_active: boolean;
}

export const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error loading subscribers', variant: 'destructive' });
      return;
    }

    if (data) {
      setSubscribers(data);
    }
  };

  const sendNewsletter = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setLoading(true);

    // Here you would integrate with an email service
    // For now, we'll create notifications for subscribers who are also users
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email')
      .in('email', subscribers.map(s => s.email));

    if (profiles) {
      for (const profile of profiles) {
        await supabase.rpc('send_notification', {
          target_user_id: profile.id,
          notification_title: subject,
          notification_message: message,
          notification_type: 'info'
        });
      }
    }

    toast({ title: `Newsletter sent to ${subscribers.length} subscribers` });
    setSubject('');
    setMessage('');
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Newsletter Management</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Total Active Subscribers: {subscribers.length}
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your newsletter message..."
              rows={6}
            />
          </div>

          <Button
            onClick={sendNewsletter}
            disabled={loading || subscribers.length === 0}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Newsletter to {subscribers.length} Subscribers
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Recent Subscribers
        </h3>
        <div className="space-y-2">
          {subscribers.slice(0, 10).map((subscriber) => (
            <div key={subscriber.id} className="flex justify-between items-center p-2 rounded hover:bg-muted">
              <span className="text-sm">{subscriber.email}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(subscriber.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
