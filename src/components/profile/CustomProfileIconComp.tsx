import React from "react";

const CustomProfileIconComp = ({
  key = -1,
  imgLink,
  width = "30px", // Default size
  height = "30px",
  isStory = false,
  isSeenByCurrUser = false,
  alt = "img",
}) => {
  // console.log(width, "wd");

  return (
    <div
      className={`flex-shrink-0  cursor-pointer img-container ${
        isStory &&
        !isSeenByCurrUser &&
        "border-2 p-1 border-green-400 rounded-full "
      } ${width === "150px" && " mx-auto"}`}
      style={{ width, height }} // Ensure the container matches the size
      id={key.toString()}
    >
      <img
        className={`rounded-full w-full h-full object-cover  `}
        src={imgLink}
        alt={alt}
      />
    </div>
  );
};

export default CustomProfileIconComp;
