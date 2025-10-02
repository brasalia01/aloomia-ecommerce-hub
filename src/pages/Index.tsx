import { useEffect } from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { HeroSection } from '@/components/Home/HeroSection';
import { FeaturedProducts } from '@/components/Home/FeaturedProducts';
import { Categories } from '@/components/Home/Categories';
import { Testimonials } from '@/components/Home/Testimonials';
import { ChatWidget } from '@/components/Chat/ChatWidget';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <FeaturedProducts />
        <Categories />
        <Testimonials />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
