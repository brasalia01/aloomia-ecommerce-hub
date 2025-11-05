import { motion } from 'framer-motion';

const brands = [
  { name: 'Nike', logo: 'https://logo.clearbit.com/nike.com' },
  { name: 'Adidas', logo: 'https://logo.clearbit.com/adidas.com' },
  { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
  { name: 'Samsung', logo: 'https://logo.clearbit.com/samsung.com' },
  { name: 'Sony', logo: 'https://logo.clearbit.com/sony.com' },
  { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
  { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
  { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
  { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
  { name: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com' },
];

export const BrandsSection = () => {
  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Trusted Partners & Brands
          </h2>
          <p className="text-muted-foreground">
            Working with the world's leading brands to bring you the best
          </p>
        </div>

        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling brands */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-16 items-center"
              animate={{
                x: [0, -1920], // Adjust based on total width
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback to text if logo fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="font-bold text-lg text-foreground">${brand.name}</span>`;
                      }
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            And many more premium brands...
          </p>
        </div>
      </div>
    </section>
  );
};