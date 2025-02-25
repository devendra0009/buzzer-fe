import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SuggestedUserCard from "./SuggestedUserCard";
import { useRef, useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getAllUserBySort } from "../../apis/user/userApi";

const SuggestionCarousel = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const [recommendedUsers, setRecommendedUsers] = useState<any[]>([]); // State to store recommended users
  const swiperRef = useRef();

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      try {
        const response = await getAllUserBySort("followers"); // Pass 'followers' or other criteria
        setRecommendedUsers(response.data); // Assuming 'data' contains the list of users
      } catch (error) {
        console.error("Failed to fetch recommended users:", error);
      }
    };
    fetchRecommendedUsers();
  }, []);

  return (
    <div className="slider-container w-[90%] mx-auto">
      <div className="heading flex justify-between items-center mb-6">
        <span className=" text-sm font-bold">Suggestions for you</span>
        <span className="text-sm text-blue-500">See all</span>
      </div>
      <div className="swiper-contained flex justify-between">
        <button
          className="swiper-button-prev z-10"
          onClick={() => swiperRef.current?.slidePrev()}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <ArrowBackIosNewIcon />
        </button>
        <Swiper
          spaceBetween={20}
          // slidesPerView={2} // change this according to response came
          onSlideChange={() => console.log("slide change")}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {recommendedUsers?.map(
            (
              user,
              idx // Map over the fetched users
            ) => (
              <SwiperSlide key={user?.id || idx}>
                {" "}
                {/* Add a unique key */}
                <SuggestedUserCard user={user} />
              </SwiperSlide>
            )
          )}
        </Swiper>
        <button
          className="swiper-button-next z-10"
          onClick={() => swiperRef.current?.slideNext()}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default SuggestionCarousel;
