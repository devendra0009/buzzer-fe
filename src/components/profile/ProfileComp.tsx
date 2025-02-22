import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CustomProfileIconComp from "./CustomProfileIconComp";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import { customButtonStyles } from "../../helpers/helpers";
import ProfilePostsComp from "./ProfilePostsComp";
import ProfileReelComp from "./ProfileReelComp";
import ProfileSavedComp from "./ProfileSavedComp";
import {
  getPostsByUserId,
  getReelsByUserId,
  getSavedPostsByUserId,
} from "../../slices/userSlice";
import { UserState } from "../../interfaces/user/userInterfaces";

const tabs = ["posts", "reels", "saved"];

interface ProfileCompProps {
  userData: UserState;
}

const ProfileComp: React.FC<ProfileCompProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState("posts");
  // const { userData, loading, error } = useSelector(
  //   (state: RootState) => state.user
  // );

  const setClickedTab = (tab) => {
    setActiveTab(tab);
  };

  // useEffect(() => {
  //   if (userData?.id > 0) {
  //     dispatch(getPostsByUserId(userData?.id));
  //     dispatch(getReelsByUserId(userData?.id));
  //     dispatch(getSavedPostsByUserId(userData?.id));
  //   }
  // }, [userData?.id]);
  return (
    <div className=" ">
      <div className="personal-details flex p-12">
        <div className="img-section w-1/3 ">
          <CustomProfileIconComp
            imgLink={userData?.profileImg}
            width="150px"
            height="150px"
          />
        </div>
        <div className="details-section w-2/3">
          <div className="flex justify-start gap-6">
            <span>{userData?.userName}</span>
            <div className="edit">
              <Button size="small" variant="contained" sx={customButtonStyles}>
                Outlined
              </Button>
            </div>
            <div className="settings">
              <SettingsIcon />
            </div>
          </div>
          <div className="flex justify-start gap-6">
            <span>
              {userData?.posts?.length + userData?.reels?.length} posts
            </span>
            <span>{userData?.followers?.length} followers</span>
            <span>{userData?.followings?.length} followings</span>
          </div>
          <div className="flex justify-start gap-4">
            <span className=" capitalize">
              {userData?.firstName} {userData?.lastName}
            </span>
            <span className=" lowercase  text-[var(--text-light-gray)]">
              {userData?.gender}
            </span>
          </div>
          <div>My bio</div>
        </div>
      </div>
      <div className="activity-section border-t-[1px] border-[var(--outliner-color)]">
        <div className="tab-header flex justify-center gap-9">
          {tabs.map((tab, idx) => {
            return (
              <div
                key={idx}
                onClick={() => setClickedTab(tab)}
                className={`hover:cursor-pointer p-4 ${
                  activeTab === tab && "border-t-[1px]"
                }`}
              >
                {tab.toUpperCase()}
              </div>
            );
          })}
        </div>
        <div className="tabs-content w-[80%] mx-auto">
          {(() => {
            switch (activeTab) {
              case "posts":
                return <ProfilePostsComp posts={userData?.posts} />;
              case "reels":
                return <ProfileReelComp userData={userData} />;
              case "saved":
                return <ProfileSavedComp userData={userData} />;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;
