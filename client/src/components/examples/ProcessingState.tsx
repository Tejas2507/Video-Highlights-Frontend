import ProcessingState from "../ProcessingState";

export default function ProcessingStateExample() {
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <ProcessingState
        type="processing"
        message="Analyzing your video and extracting highlights. This may take a few minutes..."
      />
      
      <ProcessingState
        type="generating"
        message="Creating your highlight reel based on your selections..."
      />
    </div>
  );
}
