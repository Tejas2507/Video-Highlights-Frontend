import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <Card className="p-8 border-l-4 border-l-destructive" data-testid="error-state">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Something Went Wrong
          </h3>
          <p className="text-sm text-muted-foreground mb-4" data-testid="text-error-message">
            {error}
          </p>
          
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            data-testid="button-retry"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    </Card>
  );
}
