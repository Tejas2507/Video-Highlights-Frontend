import ErrorState from "../ErrorState";

export default function ErrorStateExample() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <ErrorState
        error="Failed to process the video. Please check your file format and try again."
        onRetry={() => console.log('Retry clicked')}
      />
    </div>
  );
}
