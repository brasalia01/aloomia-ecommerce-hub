import { Users, Target, Award, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/ui/back-button';
import { cn } from '@/lib/utils';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide premium quality products at affordable prices while delivering exceptional customer service.',
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make is centered around creating the best possible experience for our customers.',
      color: 'bg-red-500/10 text-red-600',
    },
    {
      icon: Award,
      title: 'Quality Promise',
      description: 'We curate only the finest products and stand behind every item we sell with our quality guarantee.',
      color: 'bg-green-500/10 text-green-600',
    },
  ];

  const stats = [
    { label: 'Happy Customers', value: '50,000+' },
    { label: 'Products Sold', value: '200,000+' },
    { label: 'Countries Served', value: '25+' },
    { label: 'Years of Excellence', value: '5+' },
  ];

  const features = [
    'Curated premium products',
    'Fast and reliable shipping',
    '24/7 customer support',
    'Secure payment processing',
    'Easy returns and exchanges',
    'Quality guarantee on all items',
  ];

  const team = [
    {
      name: 'Abdallah Salia',
      role: 'Founder & CEO',
      description: 'Passionate about delivering exceptional shopping experiences and building lasting customer relationships.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      description: 'Ensures smooth operations and logistics to deliver products quickly and efficiently.',
    },
    {
      name: 'Michael Chen',
      role: 'Customer Experience Lead',
      description: 'Dedicated to providing outstanding customer service and support to every customer.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-primary text-primary-foreground py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <BackButton className="mb-8 text-primary-foreground hover:text-primary-foreground/80" />
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
                About Aloomia
              </h1>
              <p className="text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed animate-slide-up">
                We're passionate about bringing you premium products that enhance your lifestyle. 
                Founded with a vision to make quality accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground">
                  How we started and where we're heading
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    Aloomia was born from a simple idea: everyone deserves access to high-quality products 
                    without compromising on affordability or service. Our founder, Abdallah Salia, started 
                    this journey with a commitment to curating the best products from around the world.
                  </p>
                  
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    What started as a small operation has grown into a trusted platform serving thousands 
                    of customers across multiple countries. We've maintained our core values of quality, 
                    integrity, and customer satisfaction throughout our growth.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/products">
                      <Button size="lg">
                        Shop Our Products
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline" size="lg">
                        Get in Touch
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at Aloomia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className={cn(
                    "text-center border-border hover:shadow-large transition-all duration-300",
                    "hover:-translate-y-1 bg-gradient-card animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-8">
                    <div
                      className={cn(
                        "w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center",
                        value.color
                      )}
                    >
                      <value.icon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Impact</h2>
              <p className="text-lg text-muted-foreground">
                Numbers that reflect our commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind Aloomia's success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className={cn(
                    "text-center border-border hover:shadow-medium transition-all duration-300",
                    "bg-gradient-card animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Users className="w-10 h-10 text-primary-foreground" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover why Aloomia is the preferred choice for premium products.
            </p>
            <Link to="/products">
              <Button
                variant="secondary"
                size="lg"
                className="group"
              >
                Browse Our Collection
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;