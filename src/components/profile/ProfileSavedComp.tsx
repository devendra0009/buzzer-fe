import React, { useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import ProfileReusablePostsComp from "./ProfileReusablePostComp";
import { UserState } from "../../interfaces/user/userInterfaces";

interface ProfileSavedCompProps {
  userData: UserState;
}

const ProfileSavedComp: React.FC<ProfileSavedCompProps> = ({userData}) => {
  // const { userData } = useSelector((state: RootState) => state.user);
  return (
    <div>
      <ProfileReusablePostsComp postProp={userData?.savedPost} />
    </div>
  );
};

export default ProfileSavedComp;
