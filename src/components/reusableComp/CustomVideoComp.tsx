import React from "react";

const CustomVideoComp = ({
  vidLink,
  width = "300px", // Default size
  height = "300px",
  style = {},
}) => {
  return (
    <div
      className={`flex-shrink-0  img-container `}
      style={{ ...style, width, height }} // Ensure the container matches the size
    >
      <video className={` w-full h-full object-contain  `} controls >
        <source src={vidLink} type="video/mp4" />
        <source src={vidLink} type="video/ogg" />
      </video>
    </div>
  );
};

export default CustomVideoComp;
