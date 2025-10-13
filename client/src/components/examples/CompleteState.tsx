import CompleteState from "../CompleteState";

export default function CompleteStateExample() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <CompleteState
        downloadUrl="#"
        onStartNew={() => console.log('Start new workflow')}
      />
    </div>
  );
}
