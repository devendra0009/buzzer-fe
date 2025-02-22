import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CustomProfileIconComp from "../profile/CustomProfileIconComp";
import { Button } from "@mui/material";
import { UserState } from "../../interfaces/user/userInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUser } from "../../slices/userSlice";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { openClickedProfile } from "../../helpers/helpers";

interface SuggestedUserCardProps {
  user: UserState;
}

const SuggestedUserCard: React.FC<SuggestedUserCardProps> = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state.user);
  const handleFollowUnfollow = () => {
    dispatch(followUnfollowUser(user?.id));
  };

  const isFollowed = () => {
    return userData?.followings?.find((u) => u === user?.id);
  };

  return (
    <div className=" border-[1px] rounded-md border-[var(--outliner-color)] px-2 pb-4">
      <div className="remove flex   justify-end">
        <CloseIcon sx={{ color: "var(--text-light-gray)" }} fontSize="small" />
      </div>
      <div className="img flex flex-col gap-2 justify-center items-center">
        <CustomProfileIconComp
          width="80px"
          height="80px"
          imgLink={user?.profileImg}
        />
        <span
          className=" font-bold  text-sm capitalize text-center  hover:underline hover:text-blue-500 cursor-pointer"
          onClick={() => openClickedProfile(user?.id, navigate)}
        >
          {user?.firstName} {user?.lastName}
        </span>
        <span className=" text-[var(--text-light-gray)] text-sm">Popular</span>
      </div>
      <div className="follow-btn flex justify-center items-center mt-8">
        {isFollowed() ? (
          <Button
            variant="outlined"
            size="small"
            style={{ textTransform: "initial", fontWeight: "medium" }}
            onClick={handleFollowUnfollow}
          >
            Following
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="small"
            style={{ textTransform: "initial", fontWeight: "medium" }}
            onClick={handleFollowUnfollow}
          >
            Follow
          </Button>
        )}
      </div>
    </div>
  );
};

export default SuggestedUserCard;
