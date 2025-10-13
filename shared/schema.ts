import { z } from "zod";

export interface ApiResponse {
  message: string;
  spreadsheetId: string;
  spreadsheetUrl: string;
}

export interface UploadState {
  stage: 'upload' | 'processing' | 'editing' | 'generating' | 'complete';
  selectedFile: File | null;
  isProcessing: boolean;
  isGenerating: boolean;
  error: string | null;
  apiResponse: ApiResponse | null;
  downloadUrl: string | null;
}

export const uploadStateSchema = z.object({
  stage: z.enum(['upload', 'processing', 'editing', 'generating', 'complete']),
  selectedFile: z.any().nullable(),
  isProcessing: z.boolean(),
  isGenerating: z.boolean(),
  error: z.string().nullable(),
  apiResponse: z.object({
    message: z.string(),
    spreadsheetId: z.string(),
    spreadsheetUrl: z.string(),
  }).nullable(),
  downloadUrl: z.string().nullable(),
});
