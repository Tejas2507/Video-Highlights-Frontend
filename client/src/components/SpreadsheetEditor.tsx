import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";

interface SpreadsheetEditorProps {
  spreadsheetId: string;
  spreadsheetUrl: string;
  onContinue: () => void;
  isGenerating: boolean;
}

export default function SpreadsheetEditor({
  spreadsheetId,
  spreadsheetUrl,
  onContinue,
  isGenerating,
}: SpreadsheetEditorProps) {
  const [isLoading, setIsLoading] = useState(true);

  const embedUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?usp=sharing&embed=true`;

  return (
    <div className="space-y-6" data-testid="spreadsheet-editor">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Edit Your Highlights</h2>
              <p className="text-sm text-muted-foreground">
                Review and edit the automatically generated highlight timestamps below. Make any adjustments needed before generating your final video.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
              data-testid="button-open-external"
            >
              <a href={spreadsheetUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </a>
            </Button>
          </div>

          <div className="relative w-full bg-background rounded-lg overflow-hidden border shadow-xl" style={{ minHeight: '600px' }}>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Loading spreadsheet...</p>
                </div>
              </div>
            )}
            <iframe
              src={embedUrl}
              className="w-full h-full"
              style={{ minHeight: '600px', border: 'none' }}
              onLoad={() => setIsLoading(false)}
              title="Google Sheets Editor"
              data-testid="iframe-spreadsheet"
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={onContinue}
          disabled={isGenerating}
          size="lg"
          data-testid="button-continue"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Video...
            </>
          ) : (
            'Continue to Generate Video'
          )}
        </Button>
      </div>
    </div>
  );
}
