import React, { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";

interface PostStep1Props {
  setPost: React.Dispatch<React.SetStateAction<File | null>>;
  type: "POST" | "REEL";
}

const PostStep1: React.FC<PostStep1Props> = ({ setPost, type }) => {
  // File input reference
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Allowed file types based on type prop
  const acceptedFileTypes =
    type === "REEL"
      ? { "video/mp4": [] } // Only allow videos for reels
      : { "image/jpeg": [], "image/png": [], "video/mp4": [] }; // Allow images and videos for posts

  // Handle dropped files
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setPost(acceptedFiles[0]); // Set the first file
      }
    },
    [setPost]
  );

  // Initialize dropzone with restrictions
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles: 1, // Only allow one file
  });

  // Handle button click to open file manager
  const handleUploadClick = () => {
    fileInputRef.current?.click(); // Trigger file input click
  };

  // Handle file selection from file manager
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setPost(files[0]); // Set the selected file
    }
  };

  return (
    <div>
      <h1 className="text-center">
        Create <span className="lowercase">{type.toLowerCase()}</span>
      </h1>
      <div
        {...getRootProps()}
        className={`post-uploader mx-auto mt-8 w-[70%] min-h-[70vh] flex flex-col justify-center items-center gap-4 border-2 border-dashed ${
          isDragActive ? "border-green-500" : "border-gray-300"
        } p-5 rounded-lg`}
      >
        {/* Hidden file input */}
        <input
          type="file"
          accept={
            type === "REEL"
              ? "video/mp4" // Only allow videos for reels
              : "image/jpeg,image/png,video/mp4" // Allow images and videos for posts
          }
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <svg
          aria-label="Icon to represent media such as images or videos"
          fill="currentColor"
          height="77"
          viewBox="0 0 97.6 77.3"
          width="96"
        >
          <title>Icon to represent media such as images or videos</title>
          <path
            d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8z"
            fill="currentColor"
          ></path>
          <path
            d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
            fill="currentColor"
          ></path>
        </svg>
        <h1 className="text-2xl font-bold mb-4">
          Drag {type === "REEL" ? "videos" : "photos and videos"} here
        </h1>
        <Button
          variant="contained"
          color="success"
          sx={{ fontWeight: "bold", color: "white" }}
          onClick={handleUploadClick}
        >
          Upload from device
        </Button>
      </div>
    </div>
  );
};

export default PostStep1;
