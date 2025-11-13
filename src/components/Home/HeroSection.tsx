import { useState, useRef } from 'react';
import { ArrowRight, ShoppingBag, Star, Zap, Shield, Play, Pause, TrendingUp, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
    <section id="home" ref={sectionRef} className="relative min-h-[100dvh] flex items-center overflow-hidden bg-background">
      {/* Video Background with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="https://cdn.pixabay.com/video/2022/12/06/142229-779456526_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      </motion.div>

      {/* Video Control Button */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-all group"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:scale-110 transition-transform" />
        ) : (
          <Play className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:scale-110 transition-transform ml-0.5" />
        )}
      </button>

      {/* Content */}
      <motion.div 
        style={{ opacity }} 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-0"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="inline-flex items-center gap-2 bg-primary/10 text-primary border-primary/20 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                New Collection 2025
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1]"
            >
              Shop Smarter,{' '}
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Live Better
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              Discover thousands of quality products at unbeatable prices. Fast shipping, secure checkout, and satisfaction guaranteed.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <Link to="/products" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground group h-12 md:h-14 px-6 md:px-8 text-sm md:text-base"
                >
                  <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Shop Now
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/categories" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 h-12 md:h-14 px-6 md:px-8 text-sm md:text-base hover:bg-accent"
                >
                  <Package className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Browse Categories
                </Button>
              </Link>
            </motion.div>

            {/* Features - Desktop/Tablet */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden sm:grid grid-cols-3 gap-4 md:gap-6 pt-4 md:pt-8"
            >
              {[
                { icon: Zap, label: 'Fast Delivery', value: '2-3 days' },
                { icon: Shield, label: 'Secure Payment', value: '100% safe' },
                { icon: Star, label: 'Top Quality', value: 'Guaranteed' },
              ].map((feature, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-foreground">
                    {feature.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {feature.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Feature Cards (Desktop only) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { title: 'Free Shipping', desc: 'On orders over $50', icon: Package, color: 'primary' },
              { title: '24/7 Support', desc: 'Always here to help', icon: Shield, color: 'secondary' },
              { title: 'Best Prices', desc: 'Competitive deals', icon: TrendingUp, color: 'accent' },
              { title: 'Top Brands', desc: 'Trusted quality', icon: Star, color: 'primary' },
            ].map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-lg bg-${card.color}/10 flex items-center justify-center mb-4`}>
                  <card.icon className={`w-6 h-6 text-${card.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features - Mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-3 gap-3 mt-8 sm:hidden"
        >
          {[
            { icon: Zap, label: 'Fast', value: '2-3 days' },
            { icon: Shield, label: 'Secure', value: '100%' },
            { icon: Star, label: 'Quality', value: 'Top' },
          ].map((feature, index) => (
            <div key={index} className="text-center space-y-1.5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-xs font-semibold text-foreground">
                {feature.label}
              </div>
              <div className="text-[10px] text-muted-foreground">
                {feature.value}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};