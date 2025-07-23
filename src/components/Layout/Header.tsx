import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/useFavorites';

interface HeaderProps {
  cartItemCount?: number;
}

export const Header = ({ cartItemCount = 0 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { favorites } = useFavorites();

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Aloomia
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => window.location.href = item.href}
                className="text-foreground hover:text-primary transition-colors relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 bg-muted/50 border-border focus:bg-background transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden lg:flex relative"
              onClick={() => window.location.href = '/profile'}
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary text-secondary-foreground">
                  {favorites.length}
                </Badge>
              )}
            </Button>

            {/* Account */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden lg:flex"
              onClick={() => window.location.href = '/profile'}
            >
              <User className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => window.location.href = '/cart'}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary text-secondary-foreground">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-up">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 bg-muted/50 border-border focus:bg-background transition-colors"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-up">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    window.location.href = item.href;
                    setIsMenuOpen(false);
                  }}
                  className="text-foreground hover:text-primary transition-colors py-2 text-left cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center space-x-2"
                  onClick={() => window.location.href = '/profile'}
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist ({favorites.length})</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center space-x-2"
                  onClick={() => window.location.href = '/profile'}
                >
                  <User className="w-4 h-4" />
                  <span>Account</span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};