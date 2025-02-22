import React from "react";

const CustomImageComp = ({
  imgLink,
  width = "30px", // Default size
  height = "30px",
  style = {},
}) => {
  return (
    <div
      className={`flex-shrink-0  img-container `}
      style={{ width, height }} // Ensure the container matches the size
    >
      <img
        className={` w-full h-full object-cover  `}
        src={imgLink}
        alt="profile-img"
        style={style}
      />
    </div>
  );
};

export default CustomImageComp;
