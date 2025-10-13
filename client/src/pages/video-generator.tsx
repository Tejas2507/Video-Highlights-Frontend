import { useState } from "react";
import type { UploadState } from "@shared/schema";
import FileUpload from "@/components/FileUpload";
import WorkflowProgress from "@/components/WorkflowProgress";
import ProcessingState from "@/components/ProcessingState";
import SpreadsheetEditor from "@/components/SpreadsheetEditor";
import CompleteState from "@/components/CompleteState";
import ErrorState from "@/components/ErrorState";
import { Button } from "@/components/ui/button";

const WEBHOOK_PROCESS_URL = "http://localhost:5678/webhook/bdef75c6-0881-4a7b-b3e8-1ed19306512c";
const WEBHOOK_GENERATE_URL = "http://localhost:5678/webhook/c00db252-0e0e-484c-94dd-c3f405825c10";

export default function VideoGenerator() {
  const [state, setState] = useState<UploadState>({
    stage: 'upload',
    selectedFile: null,
    isProcessing: false,
    isGenerating: false,
    error: null,
    apiResponse: null,
    downloadUrl: null,
  });

  const handleFileSelect = (file: File) => {
    setState(prev => ({ ...prev, selectedFile: file, error: null }));
  };

  const handleClearFile = () => {
    setState(prev => ({ ...prev, selectedFile: null }));
  };

  const handleProcessVideo = async () => {
    if (!state.selectedFile) return;

    setState(prev => ({ ...prev, isProcessing: true, stage: 'processing', error: null }));

    try {
      const formData = new FormData();
      formData.append('video', state.selectedFile);

      const response = await fetch(WEBHOOK_PROCESS_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to process video: ${response.statusText}`);
      }

      const data = await response.json();

      setState(prev => ({
        ...prev,
        isProcessing: false,
        stage: 'editing',
        apiResponse: {
          message: data.message || 'Video processed successfully',
          spreadsheetId: data.spreadsheetId,
          spreadsheetUrl: data.spreadsheetUrl,
        },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        stage: 'upload',
        error: error instanceof Error ? error.message : 'Failed to process video',
      }));
    }
  };

  const handleGenerateVideo = async () => {
    if (!state.apiResponse) return;

    setState(prev => ({ ...prev, isGenerating: true, stage: 'generating' }));

    try {
      const response = await fetch(WEBHOOK_GENERATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spreadsheetId: state.apiResponse.spreadsheetId,
          spreadsheetUrl: state.apiResponse.spreadsheetUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate video: ${response.statusText}`);
      }

      const data = await response.json();

      setState(prev => ({
        ...prev,
        isGenerating: false,
        stage: 'complete',
        downloadUrl: data.downloadUrl || data.videoUrl || '#',
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isGenerating: false,
        stage: 'editing',
        error: error instanceof Error ? error.message : 'Failed to generate video',
      }));
    }
  };

  const handleStartNew = () => {
    setState({
      stage: 'upload',
      selectedFile: null,
      isProcessing: false,
      isGenerating: false,
      error: null,
      apiResponse: null,
      downloadUrl: null,
    });
  };

  const handleRetry = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground" data-testid="heading-title">
              Video Highlight Generator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your video, let AI extract the highlights, edit them in an embedded spreadsheet, and generate your final highlight reel.
            </p>
          </div>

          <WorkflowProgress currentStage={state.stage} />

          <div className="max-w-4xl mx-auto">
            {state.error && (
              <div className="mb-6">
                <ErrorState error={state.error} onRetry={handleRetry} />
              </div>
            )}

            {state.stage === 'upload' && (
              <div className="space-y-6">
                <FileUpload
                  selectedFile={state.selectedFile}
                  onFileSelect={handleFileSelect}
                  onClearFile={handleClearFile}
                  disabled={state.isProcessing}
                />
                
                {state.selectedFile && (
                  <div className="flex justify-center">
                    <Button
                      onClick={handleProcessVideo}
                      disabled={state.isProcessing}
                      size="lg"
                      data-testid="button-process-video"
                    >
                      Process Video
                    </Button>
                  </div>
                )}
              </div>
            )}

            {state.stage === 'processing' && (
              <ProcessingState
                type="processing"
                message="Analyzing your video and extracting highlights. This may take a few minutes..."
              />
            )}

            {state.stage === 'editing' && state.apiResponse && (
              <SpreadsheetEditor
                spreadsheetId={state.apiResponse.spreadsheetId}
                spreadsheetUrl={state.apiResponse.spreadsheetUrl}
                onContinue={handleGenerateVideo}
                isGenerating={state.isGenerating}
              />
            )}

            {state.stage === 'generating' && (
              <ProcessingState
                type="generating"
                message="Creating your highlight reel based on your selections. Almost there..."
              />
            )}

            {state.stage === 'complete' && state.downloadUrl && (
              <CompleteState
                downloadUrl={state.downloadUrl}
                onStartNew={handleStartNew}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
