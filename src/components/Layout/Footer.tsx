import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
  ];

  const categories = [
    { name: 'Electronics', href: '/categories/electronics' },
    { name: 'Fashion', href: '/categories/fashion' },
    { name: 'Home & Garden', href: '/categories/home' },
    { name: 'Sports', href: '/categories/sports' },
    { name: 'Books', href: '/categories/books' },
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refund' },
    { name: 'Cookie Policy', href: '/cookies' },
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
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-white/15"
              />
              <Button variant="secondary" size="lg" className="whitespace-nowrap">
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
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
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
                  <a
                    href={category.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </a>
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
                  <a
                    href={policy.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {policy.name}
                  </a>
                </li>
              ))}
            </ul>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex space-x-3">
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