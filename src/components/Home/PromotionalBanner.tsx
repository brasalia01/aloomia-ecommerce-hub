import { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export const PromotionalBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set end date (24 hours from now for demo)
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 24);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="relative bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground py-3 md:py-4 overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            {/* Left Content */}
            <div className="flex items-center gap-2 md:gap-3 text-center md:text-left">
              <Clock className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <div>
                <span className="font-bold text-sm md:text-base">Flash Sale! </span>
                <span className="text-xs md:text-sm">Up to 50% off on selected items</span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex gap-1.5 md:gap-2">
                {[
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Mins' },
                  { value: timeLeft.seconds, label: 'Secs' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-primary-foreground text-primary rounded-md px-2 py-1 md:px-3 md:py-1.5 min-w-[40px] md:min-w-[50px]">
                      <div className="text-base md:text-xl font-bold tabular-nums">
                        {String(item.value).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-[10px] md:text-xs mt-0.5 opacity-90">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link to="/products" className="ml-2 md:ml-4">
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-8 md:h-9 px-3 md:px-4 text-xs md:text-sm font-semibold"
                >
                  Shop Now
                </Button>
              </Link>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 md:relative md:top-0 md:right-0 p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
              aria-label="Close banner"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
