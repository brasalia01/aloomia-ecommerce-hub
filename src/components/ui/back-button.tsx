import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const BackButton = ({ className = "", children }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {children || "Back"}
    </Button>
  );
};