import { useState, useRef } from 'react';
import { ArrowRight, ShoppingBag, Star, Zap, Shield, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="https://cdn.pixabay.com/video/2022/12/06/142229-779456526_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
      </div>

      {/* Video Control Button */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-8 right-8 z-20 w-14 h-14 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center hover:bg-primary/30 transition-all group"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
        ) : (
          <Play className="w-6 h-6 text-primary group-hover:scale-110 transition-transform ml-0.5" />
        )}
      </button>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/10 backdrop-blur-sm border border-secondary/20 rounded-full px-6 py-2 mb-8 animate-fade-in">
            <Star className="w-4 h-4 text-secondary fill-secondary" />
            <span className="text-sm font-semibold text-foreground">Premium Collection 2025</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-foreground mb-8 leading-[1.1] animate-slide-up">
            Elevate Your
            <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Lifestyle
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-2xl text-muted-foreground mb-12 leading-relaxed animate-fade-in max-w-2xl font-light">
            Discover curated collections of premium products designed for those who appreciate quality, style, and innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in">
            <Link to="/products">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant group h-14 px-8 text-lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Shopping
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/categories">
              <Button
                variant="outline"
                size="lg"
                className="border-2 h-14 px-8 text-lg hover:bg-secondary/10 hover:border-secondary transition-all"
              >
                Browse Collections
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in">
            {[
              { icon: Zap, label: 'Fast Delivery', value: 'Express shipping on all orders' },
              { icon: Shield, label: 'Secure Checkout', value: '100% payment protection' },
              { icon: Star, label: 'Premium Quality', value: 'Carefully curated products' },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">
                    {feature.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {feature.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full animate-ping" />
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-secondary rounded-full animate-ping" style={{ animationDelay: '1s' }} />
    </section>
  );
};