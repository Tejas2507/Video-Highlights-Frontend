import { Upload, File, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClearFile: () => void;
  disabled?: boolean;
}

export default function FileUpload({ onFileSelect, selectedFile, onClearFile, disabled }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
        onFileSelect(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  if (selectedFile) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <File className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate" data-testid="text-filename">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground" data-testid="text-filesize">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClearFile}
            disabled={disabled}
            data-testid="button-clear-file"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative transition-all duration-200 ${isDragging ? 'scale-[1.02]' : ''}`}
      data-testid="dropzone-container"
    >
      <Card className={`p-12 border-2 ${isDragging ? 'border-primary bg-accent/50' : 'border-dashed'}`}>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isDragging ? 'bg-primary/20' : 'bg-muted'
          }`}>
            <Upload className={`w-8 h-8 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {isDragging ? 'Drop your video here' : 'Upload Video'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your video file or click to browse
            </p>
          </div>

          <input
            type="file"
            id="file-input"
            accept="video/*"
            onChange={handleFileInput}
            className="hidden"
            disabled={disabled}
            data-testid="input-file"
          />
          
          <Button asChild variant="default" data-testid="button-browse">
            <label htmlFor="file-input" className="cursor-pointer">
              Browse Files
            </label>
          </Button>

          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: MP4, MOV, AVI, WebM
          </p>
        </div>
      </Card>
    </div>
  );
}
