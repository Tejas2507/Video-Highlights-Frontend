import { useState } from "react";
import WorkflowProgress from "../WorkflowProgress";
import { Button } from "@/components/ui/button";

export default function WorkflowProgressExample() {
  const stages = ['upload', 'processing', 'editing', 'generating', 'complete'] as const;
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <WorkflowProgress currentStage={stages[currentStageIndex]} />
      
      <div className="flex gap-2 justify-center">
        <Button
          onClick={() => setCurrentStageIndex(Math.max(0, currentStageIndex - 1))}
          disabled={currentStageIndex === 0}
          variant="outline"
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentStageIndex(Math.min(stages.length - 1, currentStageIndex + 1))}
          disabled={currentStageIndex === stages.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
