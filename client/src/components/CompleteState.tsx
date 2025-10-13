import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, RotateCcw } from "lucide-react";

interface CompleteStateProps {
  downloadUrl: string;
  onStartNew: () => void;
}

export default function CompleteState({ downloadUrl, onStartNew }: CompleteStateProps) {
  return (
    <Card className="p-12" data-testid="complete-state">
      <div className="flex flex-col items-center gap-6 text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-chart-2/10 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-chart-2" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Your Highlights Are Ready!
          </h2>
          <p className="text-sm text-muted-foreground">
            Your video highlights have been successfully generated and are ready to download.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            asChild
            size="lg"
            className="flex-1"
            data-testid="button-download"
          >
            <a href={downloadUrl} download className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Video
            </a>
          </Button>
          
          <Button
            onClick={onStartNew}
            variant="outline"
            size="lg"
            className="flex-1"
            data-testid="button-start-new"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start New
          </Button>
        </div>
      </div>
    </Card>
  );
}
