import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { HeroSection } from '@/components/Home/HeroSection';
import { FeaturedProducts } from '@/components/Home/FeaturedProducts';
import { Categories } from '@/components/Home/Categories';
import { Testimonials } from '@/components/Home/Testimonials';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={0} />
      
      <main>
        <HeroSection />
        <FeaturedProducts />
        <Categories />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
