import React from "react";
import StoryComp from "../story/StoryComp";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import CustomProfileIconComp from "../profile/CustomProfileIconComp";
import Suggestions from "../suggestions/Suggestions";
import SuggestionCarousel from "../suggestions/SuggestionCarousel";
import PostsContainer from "../postsAndReels/PostsContainer";
import { removeTokenFromLocalStorage } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/actions";

const HomeComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const handleLogout = () => {
    removeTokenFromLocalStorage();
    window.location.href = "/login";
  };
  return (
    <div className=" flex justify-between  w-[80%] h-full overflow-y-scroll mx-auto">
      <div className="left-side w-3/4 flex flex-col gap-4">
        <div className="story-bar">
          <StoryComp />
        </div>
        <div className="reel-container">
          <PostsContainer />
        </div>
      </div>
      <div className="right-side w-1/4 ">
        <div className="profile flex  justify-center items-center gap-4 pt-2">
          <CustomProfileIconComp
            width="50px"
            height="50px"
            imgLink={userData.profileImg}
          />
          <div className="name flex flex-col">
            <span>{userData.userName}</span>
            <span className=" text-[var(--text-light-gray)] capitalize">
              {userData.firstName} {userData.lastName}
            </span>
          </div>
          <div
            className="switch text-sm text-red-500 hover:cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
        <div className="suggestions-slider mt-8">
          <SuggestionCarousel />
        </div>
      </div>
    </div>
  );
};

export default HomeComp;
