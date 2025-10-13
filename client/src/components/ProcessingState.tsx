import { Card } from "@/components/ui/card";
import { Loader2, Cog } from "lucide-react";

interface ProcessingStateProps {
  message: string;
  type: 'processing' | 'generating';
}

export default function ProcessingState({ message, type }: ProcessingStateProps) {
  return (
    <Card className="p-12" data-testid={`${type}-state`}>
      <div className="flex flex-col items-center gap-6 text-center max-w-md mx-auto">
        <div className="relative">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Cog className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1">
            <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center border-2 border-primary">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {type === 'processing' ? 'Processing Your Video' : 'Generating Highlights'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        </div>

        <div className="w-full max-w-xs">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-chart-2 animate-pulse"
              style={{
                width: '100%',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
