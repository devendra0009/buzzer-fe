import React, { useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const CustomControlledVideoComp = ({ videoSrc, width, height }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <video
        ref={videoRef}
        width={width}
        height={"20px"}
        style={{ objectFit: "contain" }}
        src={videoSrc}
      />
      <button
        onClick={handlePlayPause}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "5px 10px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </button>
    </div>
  );
};

export default CustomControlledVideoComp;
