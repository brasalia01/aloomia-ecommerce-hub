import { useEffect, useState, useRef } from 'react';
import { Package, Users, Globe } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Stat {
  icon: typeof Package;
  value: number;
  label: string;
  suffix: string;
}

const stats: Stat[] = [
  { icon: Package, value: 10000, label: 'Premium Products', suffix: '+' },
  { icon: Users, value: 50000, label: 'Happy Customers', suffix: '+' },
  { icon: Globe, value: 85, label: 'Countries Served', suffix: '+' },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-foreground">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

export const StatsCounter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Decoration with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for premium quality products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-all group-hover:scale-110 duration-300">
                <stat.icon className="w-10 h-10 text-primary" />
              </div>
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-lg text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};