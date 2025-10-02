import { useRef, useState } from "react";
import file from "../../../../assets/file.png";
interface FileInputProps {
  label?: string;
  placeholder?: string;
  accept?: string;
  onChange?: (file: File | null) => void;
  multiple?: boolean;
}
const FileInput: React.FC<FileInputProps> = ({
  label = "Attach the transfer receipt",
  placeholder = "Attach the transfer receipt",
  accept = "*",
  multiple = false,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    onChange?.(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };
  return (
    <div>
      {label && (
        <label className="text-sm md:text-base block mb-2 font-medium">
          {label}
        </label>
      )}
      <div
        className="flex items-center justify-between  cursor-pointer bg-[#F0EDFFCC] rounded-lg border border-[#ADADAD] outline-none  py-3 px-5 w-full"
        onClick={!selectedFile ? handleClick : undefined}
      >
        <span className="text-sm text-[#ADADAD] truncate w-full">
          {selectedFile ? selectedFile.name : placeholder}
        </span>
        {selectedFile ? (
          <button
            onClick={handleRemoveFile}
            className="ml-3 text-red-500 text-xs hover:underline"
          >
            Remove
          </button>
        ) : (
          <img alt="file-icon" src={file} className="w-5 h-5" />
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
          multiple={multiple}
        />
      </div>
    </div>
  );
};

export default FileInput;
