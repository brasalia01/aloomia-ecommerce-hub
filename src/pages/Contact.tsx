import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { BackButton } from '@/components/ui/back-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+233 53 816 3683',
      description: 'Mon-Fri from 8am to 6pm',
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@aloomia.com',
      description: 'We respond within 24 hours',
      color: 'bg-green-500/10 text-green-600',
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Accra, Ghana',
      description: 'West Africa',
      color: 'bg-purple-500/10 text-purple-600',
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: 'Mon-Fri: 8am-6pm',
      description: 'Saturday: 9am-4pm',
      color: 'bg-orange-500/10 text-orange-600',
    },
  ];

  const faqItems = [
    {
      question: 'What are your delivery options?',
      answer: 'We offer reliable doorstep delivery across Ghana. Standard delivery takes 3-5 business days, while express delivery takes 1-2 business days. Delivery fees are calculated based on your location during checkout.',
      category: 'Delivery'
    },
    {
      question: 'What is your return and refund policy?',
      answer: 'We accept returns within 30 days of purchase for items in original condition with tags attached. Once we receive your return, refunds are processed within 5-7 business days to your original payment method.',
      category: 'Returns'
    },
    {
      question: 'How can I track my order?',
      answer: 'After placing your order via WhatsApp, our team will provide you with regular updates on your order status. You can also contact us anytime through WhatsApp or phone for real-time tracking information.',
      category: 'Orders'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We currently accept mobile money payments and bank transfers. Payment details will be shared with you after you place your order via WhatsApp. We ensure a secure and convenient payment process.',
      category: 'Payment'
    },
    {
      question: 'Are the products authentic and quality-guaranteed?',
      answer: 'Yes, all products on Aloomia are 100% authentic and quality-checked before delivery. We partner with trusted suppliers and manufacturers to ensure you receive genuine, high-quality products.',
      category: 'Products'
    },
    {
      question: 'How do I place an order?',
      answer: 'Simply add items to your cart, review your order, and click "Place Order via WhatsApp". You\'ll be redirected to WhatsApp where you can send us your complete order details. Our team will confirm and guide you through the payment and delivery process.',
      category: 'Orders'
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-primary text-primary-foreground py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <BackButton className="mb-8 text-primary-foreground hover:text-primary-foreground/80" />
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
                Get in Touch
              </h1>
              <p className="text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mx-auto animate-slide-up">
                We're here to help! Reach out to us with any questions, concerns, or feedback. 
                Our support team is ready to assist you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="text-center border-border hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${info.color}`}>
                      <info.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                    <p className="font-medium text-foreground mb-1">{info.details}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="border-border shadow-large">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Select onValueChange={(value) => handleInputChange('subject', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="order">Order Support</SelectItem>
                            <SelectItem value="shipping">Shipping Question</SelectItem>
                            <SelectItem value="return">Return/Exchange</SelectItem>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        placeholder="Tell us how we can help you..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full group">
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Find answers to common questions about our services, delivery, and policies.
                  </p>
                </div>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <Card 
                      key={index} 
                      className="border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in overflow-hidden group" 
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold group-hover:scale-110 transition-transform">
                            Q{index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="font-semibold text-lg text-foreground">
                                {item.question}
                              </h3>
                              <Badge variant="secondary" className="text-xs">
                                {item.category}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Actions */}
                <Card className="bg-gradient-primary text-primary-foreground border-0">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
                    <p className="text-primary-foreground/90 mb-6">
                      For urgent matters, call us directly or check our help center
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        variant="secondary" 
                        size="lg"
                        onClick={() => window.location.href = 'tel:+233538163683'}
                        aria-label="Call our support team"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        aria-label="Scroll to top for help center"
                      >
                        Help Center
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Support */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Other Ways to Reach Us</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Choose the communication method that works best for you
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border hover:shadow-medium transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-500/10 text-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Live Chat</h3>
                  <p className="text-muted-foreground mb-4">
                    Chat with our support team via WhatsApp
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('https://wa.me/233555528622?text=Hello%2C%20I%20need%20help%20with...', '_blank')}
                    aria-label="Start WhatsApp chat with support"
                  >
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-medium transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Email Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Send us an email and we'll respond within 24 hours
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = 'mailto:info@aloomia.com'}
                    aria-label="Send email to support"
                  >
                    Send Email
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-medium transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-500/10 text-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Phone Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Speak directly with our customer service team
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = 'tel:+233538163683'}
                    aria-label="Call support phone number"
                  >
                    Call Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;