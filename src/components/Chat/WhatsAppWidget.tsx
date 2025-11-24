import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const whatsappNumber = '+233000000000'; // Replace with your WhatsApp business number
  const defaultMessage = 'Hi! I have a question about your products.';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-[#25D366] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold text-sm">Chat with us</h3>
                  <p className="text-xs opacity-90">We typically reply instantly</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 bg-background">
              <div className="bg-muted rounded-lg p-4 mb-4">
                <p className="text-sm text-foreground mb-2">👋 Hi there!</p>
                <p className="text-sm text-muted-foreground">
                  Have questions about our products? We're here to help! Click below to start a conversation on WhatsApp.
                </p>
              </div>

              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat on WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white p-0"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </>
  );
};
