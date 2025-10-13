import { useState } from "react";
import FileUpload from "../FileUpload";

export default function FileUploadExample() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <FileUpload
        selectedFile={selectedFile}
        onFileSelect={(file) => {
          console.log('File selected:', file.name);
          setSelectedFile(file);
        }}
        onClearFile={() => {
          console.log('File cleared');
          setSelectedFile(null);
        }}
      />
    </div>
  );
}
