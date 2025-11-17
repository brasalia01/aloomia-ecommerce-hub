import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Menu, X, User, Heart, LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { AuthModal } from '@/components/Auth/AuthModal';
import { CartDrawer } from '@/components/Cart/CartDrawer';
import { SearchAutocomplete } from '@/components/Search/SearchAutocomplete';
import { NotificationCenter } from '@/components/Notifications/NotificationCenter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { favorites } = useFavorites();
  const { user, userProfile, signOut, loading } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                Aloomia
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors relative group cursor-pointer"
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop (Expandable) */}
          <div className="hidden lg:flex items-center">
            {isSearchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mr-4"
              >
                <SearchAutocomplete
                  placeholder="Search products..."
                  onSearch={handleSearch}
                  className="w-full"
                />
              </motion.div>
            ) : null}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            {user && <NotificationCenter />}

            {/* Favorites */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden lg:flex relative"
              onClick={() => navigate('/profile?tab=favorites')}
              aria-label={`View favorites (${favorites.length} items)`}
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary text-secondary-foreground">
                  {favorites.length}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping cart (${getTotalItems()} items)`}
              >
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary text-secondary-foreground">
                      {getTotalItems()}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </motion.div>

            {/* Profile */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden lg:flex" aria-label="User profile menu">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  {userProfile?.role === 'admin' && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <User className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AuthModal>
                <Button variant="ghost" size="icon" className="hidden lg:flex">
                  <User className="w-5 h-5" />
                </Button>
              </AuthModal>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden py-4 border-t border-border overflow-hidden"
          >
            <SearchAutocomplete
              placeholder="Search products..."
              onSearch={handleSearch}
              className="w-full"
            />
          </motion.div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden py-4 border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={handleNavClick}
                    className="text-foreground hover:text-primary transition-colors py-2 text-left cursor-pointer block"
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center space-x-2"
                  onClick={() => navigate('/profile?tab=favorites')}
                >
                  <Heart className="w-4 h-4" />
                  <span>Favorites ({favorites.length})</span>
                </Button>
                {user ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center space-x-2"
                      onClick={() => navigate('/profile')}
                    >
                    <User className="w-4 h-4" />
                    <span>Account</span>
                  </Button>
                ) : (
                  <AuthModal>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Sign In</span>
                    </Button>
                  </AuthModal>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
      
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};