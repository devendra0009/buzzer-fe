import React from "react";
import { UserState } from "../../interfaces/user/userInterfaces";
import CustomProfileIconComp from "../profile/CustomProfileIconComp";
import TextLightGraySmall from "../reusableComp/TextLightGraySmall";
import CloseIcon from "@mui/icons-material/Close";
import { openClickedProfile } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

interface SearchProfileCompProps {
  user?: UserState; // Make user optional
}

const SearchProfileComp: React.FC<SearchProfileCompProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      className=" flex justify-between items-center hover:cursor-pointer hover:bg-[var(--btn-hover-background-color)] p-4"
      onClick={() => openClickedProfile(user?.id, navigate)}
    >
      <div className=" flex  items-center gap-2">
        <CustomProfileIconComp
          width="35px"
          height="35px"
          imgLink={user?.profileImg}
        />
        <div className="name flex flex-col">
          <span>{user?.userName}</span>
          <TextLightGraySmall text={`${user?.firstName} ${user?.lastName}`} />
        </div>
      </div>
      <CloseIcon className="  " />
    </div>
  );
};

export default SearchProfileComp;
