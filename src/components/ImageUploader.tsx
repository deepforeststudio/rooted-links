import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

interface ImageUploaderProps extends React.ComponentProps<typeof Button> {
  onImageChange: (base64String: string) => void;
  label: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageChange,
  label,
  ...buttonOpts
}) => {
  console.log();
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        onImageChange(reader.result as string);
      };
    }
  };

  return (
    <Button
      as="label"
      htmlFor={`file-uploader-${label}`}
      cursor="pointer"
      {...buttonOpts}
    >
      Select Image
      <input
        id={`file-uploader-${label}`}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileInput}
      />
    </Button>
  );
};
