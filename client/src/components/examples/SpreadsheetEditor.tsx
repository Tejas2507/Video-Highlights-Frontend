import { useState } from "react";
import SpreadsheetEditor from "../SpreadsheetEditor";

export default function SpreadsheetEditorExample() {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <SpreadsheetEditor
        spreadsheetId="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
        spreadsheetUrl="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit"
        onContinue={() => {
          console.log('Continue clicked');
          setIsGenerating(true);
          setTimeout(() => setIsGenerating(false), 3000);
        }}
        isGenerating={isGenerating}
      />
    </div>
  );
}
