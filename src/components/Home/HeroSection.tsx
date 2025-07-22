import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBanner from '@/assets/hero-banner.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBanner}
          alt="Aloomia Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-white">New Collection Available</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Discover Your
            <span className="block bg-gradient-to-r from-secondary to-secondary-hover bg-clip-text text-transparent">
              Perfect Style
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed animate-slide-up max-w-xl">
            Shop premium products with exceptional quality and unbeatable prices. 
            Your style journey begins here at Aloomia.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-glow group"
              onClick={() => window.location.href = '/products'}
            >
              <ShoppingBag className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Shop Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              onClick={() => window.location.href = '/categories'}
            >
              Explore Collection
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-scale-in">
            {[
              { label: 'Free Shipping', value: 'On orders $50+' },
              { label: '24/7 Support', value: 'Always here for you' },
              { label: 'Secure Payment', value: '100% protected' },
            ].map((feature, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="text-2xl font-bold text-white mb-1">
                  {feature.label}
                </div>
                <div className="text-white/80 text-sm">
                  {feature.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-32 right-32 w-16 h-16 bg-white/10 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-secondary/30 rounded-full blur-md animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};