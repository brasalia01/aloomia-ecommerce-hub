import { Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface ComparisonFloatingButtonProps {
  count: number;
  onClick: () => void;
}

export const ComparisonFloatingButton = ({ count, onClick }: ComparisonFloatingButtonProps) => {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            size="lg"
            onClick={onClick}
            className="rounded-full shadow-2xl hover:shadow-3xl transition-shadow h-16 w-16 p-0 relative"
          >
            <Scale className="w-6 h-6" />
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center"
            >
              {count}
            </Badge>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};