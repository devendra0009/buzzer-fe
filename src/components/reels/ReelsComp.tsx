import React, { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { ReelState } from "../../interfaces/reel/reelInterface";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomVideoComp from "../reusableComp/CustomVideoComp";
import CustomProfileIconComp from "../profile/CustomProfileIconComp";
import { useNavigate, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const ReelsComp = () => {
  const { reelData: reels } = useSelector((state: RootState) => state.reel);
  const { reelId } = useParams();
  const navigate = useNavigate();
  const [currentReelIdx, setCurrentReelIdx] = useState(Number(reelId));

  const [swipeDirection, setSwipeDirection] = useState("");

  const handleUp = () => {
    if (currentReelIdx > 0) {
      // setCurrentReelIdx((prevIdx) => prevIdx - 1);
      navigate(`/reel/${currentReelIdx - 1}`);
      setSwipeDirection("DOWN");
    }
  };

  const handleDown = () => {
    if (currentReelIdx < reels.length - 1) {
      // setCurrentReelIdx((prevIdx) => prevIdx + 1);
      navigate(`/reel/${currentReelIdx + 1}`);
      setSwipeDirection("UP");
    }
  };

  console.log(currentReelIdx);

  const config = {
    delta: 10, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: true, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  };

  useEffect(() => {
    setCurrentReelIdx(Number(reelId));
  }, [reelId]);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      // debugger;
      handleDown();
    },
    onSwipedDown: () => {
      // debugger;
      handleUp();
    },
    ...config,
  });

  return (
    <div
      className=" flex h-full items-center justify-center gap-8"
      {...handlers}
    >
      <AnimatePresence mode="wait">
        {reels[currentReelIdx] && (
          <motion.div
            key={currentReelIdx}
            initial={{ y: swipeDirection === "UP" ? 100 : -100, opacity: 0 }} // Start based on direction
            animate={{ y: 0, opacity: 1 }} // End position (center screen)
            exit={{
              y: swipeDirection === "UP" ? -100 : 100, // Exit position based on swipe direction
              opacity: 0,
            }}
            transition={{ duration: 0.5 }} // Adjust duration for smoothness
            className=" h-full flex flex-col justify-center items-center "
          >
            <CustomVideoComp
              // key={reels[currentReelIdx].video}
              vidLink={reels[currentReelIdx].video}
              // style={{ width: "50%", height: "80%" }}
              width="320px"
              height="70%"
            />
            <div className=" text-sm w-full flex flex-col gap-2 mt-2">
              <h2>{reels[currentReelIdx].title}</h2>
              <p>
                {reels[currentReelIdx].description ||
                  "No description available."}
              </p>
              <div
                // style={{
                //   display: "flex",
                //   alignItems: "center",
                //   marginTop: "10px",
                // }}
                className="  text-sm flex items-center gap-2"
              >
                <CustomProfileIconComp
                  imgLink={reels[currentReelIdx]?.user?.profileImg}
                  alt={`${reels[currentReelIdx]?.user?.firstName} ${reels[currentReelIdx]?.user?.lastName}`}
                  // style={{
                  //   width: "50px",
                  //   height: "50px",
                  //   borderRadius: "50%",
                  //   marginRight: "10px",
                  // }}
                />
                <span>
                  {reels[currentReelIdx]?.user?.firstName}{" "}
                  {reels[currentReelIdx]?.user?.lastName}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        // style={{
        //   position: "absolute",
        //   bottom: "20px",
        //   display: "flex",
        //   gap: "20px",
        // }}
        className=" flex  flex-col  gap-8"
      >
        <button
          onClick={handleUp}
          // style={{
          //   padding: "10px 20px",
          //   fontSize: "16px",
          //   backgroundColor: "black",
          //   border: "none",
          //   borderRadius: "5px",
          //   cursor: "pointer",
          // }}
          // disabled={currentReelIdx === 0}
          className=" cursor-pointer  bg-white rounded-full"
        >
          <KeyboardArrowUpIcon
            sx={{
              color: `${currentReelIdx === 0 ? "gray" : "black"}`,
              fontSize: "2rem",
            }}
          />
        </button>
        <button
          onClick={handleDown}
          // style={{
          //   padding: "10px 20px",
          //   fontSize: "16px",
          //   backgroundColor: "black",
          //   border: "none",
          //   borderRadius: "5px",
          //   cursor: "pointer",
          // }}
          // disabled={}
          className=" cursor-pointer bg-white rounded-full"
        >
          <KeyboardArrowDownIcon
            sx={{
              color: `${
                currentReelIdx === reels.length - 1 ? "gray" : "black"
              }`,
              fontSize: "2rem",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default ReelsComp;
