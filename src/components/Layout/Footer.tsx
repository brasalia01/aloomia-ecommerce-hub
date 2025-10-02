import { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      toast({ title: 'Please enter a valid email', variant: 'destructive' });
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email });

    if (error) {
      if (error.code === '23505') {
        toast({ title: 'Already subscribed!' });
      } else {
        toast({ title: 'Subscription failed', variant: 'destructive' });
      }
    } else {
      toast({ title: 'Successfully subscribed to newsletter!' });
      setEmail('');
    }
    setLoading(false);
  };
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/contact' },
    { name: 'Shipping Info', href: '/contact' },
    { name: 'Returns', href: '/contact' },
  ];

  const categories = [
    { name: 'Electronics', href: '/products?category=Electronics' },
    { name: 'Fashion', href: '/products?category=Fashion' },
    { name: 'Home & Garden', href: '/products?category=Home' },
    { name: 'Sports', href: '/products?category=Sports' },
    { name: 'Books', href: '/products?category=Books' },
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border">
      {/* Newsletter Section */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Stay Updated with Aloomia
            </h3>
            <p className="text-primary-foreground/90 mb-8 text-lg">
              Get the latest deals, new arrivals, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-white/15"
              />
              <Button 
                variant="secondary" 
                size="lg" 
                className="whitespace-nowrap"
                onClick={handleSubscribe}
                disabled={loading}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                Aloomia
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your trusted partner for premium products and exceptional shopping experience. 
                We deliver quality and style to your doorstep.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Accra, Ghana</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+233 53 816 3683</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@aloomia.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => window.location.href = link.href}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <button
                    onClick={() => window.location.href = category.href}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">Legal</h3>
            <ul className="space-y-3 mb-8">
              {policies.map((policy) => (
                <li key={policy.name}>
                  <button
                    onClick={() => window.location.href = policy.href}
                    className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {policy.name}
                  </button>
                </li>
              ))}
            </ul>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex space-x-3 mb-6">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: Youtube, href: '#' },
                ].map((social, index) => (
                  <Button key={index} variant="ghost" size="icon" asChild>
                    <a href={social.href} className="hover:text-primary">
                      <social.icon className="w-5 h-5" />
                    </a>
                  </Button>
                ))}
              </div>
              
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-foreground">
                  Founder: Mr. Salia Abdallah Banda
                </p>
                <div className="space-y-1 text-muted-foreground">
                  <p>📧 sallahbanda442@gmail.com</p>
                  <p>📱 0538163683 / 0555528622</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 Aloomia. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Secure payments</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Fast delivery</span>
              <Separator orientation="vertical" className="h-4" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};