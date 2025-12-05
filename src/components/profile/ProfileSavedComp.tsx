import React, { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import ProfileReusablePostsComp from "./ProfileReusablePostComp";
import { UserState } from "../../interfaces/user/userInterfaces";
import { PostState } from "../../interfaces/post/postInterface";
import { getSavedPostsByUserIdFromApi } from "../../apis/user/userApi";

interface ProfileSavedCompProps {
  savedPosts: PostState[];
}

const ProfileSavedComp: React.FC<ProfileSavedCompProps> = ({savedPosts}) => {
  // const { userData } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <ProfileReusablePostsComp postProp={savedPosts} />
    </div>
  );
};

export default ProfileSavedComp;
