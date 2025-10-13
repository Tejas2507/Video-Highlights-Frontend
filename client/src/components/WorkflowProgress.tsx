import { Check, Upload, Cog, Edit, Sparkles, Download } from "lucide-react";

interface WorkflowProgressProps {
  currentStage: 'upload' | 'processing' | 'editing' | 'generating' | 'complete';
}

const stages = [
  { key: 'upload', label: 'Upload', icon: Upload },
  { key: 'processing', label: 'Processing', icon: Cog },
  { key: 'editing', label: 'Edit', icon: Edit },
  { key: 'generating', label: 'Generate', icon: Sparkles },
  { key: 'complete', label: 'Complete', icon: Download },
] as const;

export default function WorkflowProgress({ currentStage }: WorkflowProgressProps) {
  const currentIndex = stages.findIndex(s => s.key === currentStage);

  return (
    <div className="w-full" data-testid="workflow-progress">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <div key={stage.key} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2 relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isComplete
                      ? 'bg-chart-2 border-2 border-chart-2'
                      : isCurrent
                      ? 'bg-primary border-2 border-primary animate-pulse'
                      : 'bg-muted border-2 border-border'
                  }`}
                  data-testid={`stage-${stage.key}`}
                >
                  {isComplete ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Icon
                      className={`w-5 h-5 ${
                        isCurrent ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-xs font-medium whitespace-nowrap ${
                    isComplete || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
              
              {index < stages.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 relative" style={{ minWidth: '20px' }}>
                  <div className="absolute inset-0 bg-border" />
                  <div
                    className={`absolute inset-0 bg-chart-2 transition-all duration-500 ${
                      index < currentIndex ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
