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
import {
  getPostsByUserIdFromApi,
  getReelsByUserIdFromApi,
  getSavedPostsByUserIdFromApi,
} from "../../apis/user/userApi";
import { PostState } from "../../interfaces/post/postInterface";
import { ReelState } from "../../interfaces/reel/reelInterface";
import { useNavigate } from "react-router-dom";

const tabs = ["posts", "reels", "saved"];

interface ProfileCompProps {
  userData: UserState;
}

const ProfileComp: React.FC<ProfileCompProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState("posts");
  const navigate = useNavigate();

  const setClickedTab = (tab) => {
    setActiveTab(tab);
  };

  const [posts, setPosts] = useState<PostState[]>([]);
  const [savedPosts, setSavedPosts] = useState<PostState[]>([]);
  const [reels, setReels] = useState<ReelState[]>([]);

  const getPostByUser = async () => {
    const res = await getPostsByUserIdFromApi(userData?.id);
    if (!res?.success) return;
    if (res?.data) {
      setPosts(res?.data);
    } else {
      // toast.error("No posts");
    }
  };

  const getSavedPostByUser = async () => {
    const res = await getSavedPostsByUserIdFromApi(userData?.id);
    if (!res?.success) return;
    if (res?.data) {
      setSavedPosts(res?.data);
    } else {
      // toast.error("No posts");
    }
  };

  const getReelByUser = async () => {
    const res = await getReelsByUserIdFromApi(userData?.id);
    console.log(res);

    if (!res?.success) return;
    if (res?.data) {
      setReels(res?.data);
    } else {
      // toast.error("No posts");
    }
  };

  useEffect(() => {
    getPostByUser();
    getReelByUser();
    getSavedPostByUser();
  }, []);

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
            <div
              className="settings hover:cursor-pointer"
              onClick={() => {
                navigate(`/settings/${userData?.id}`);
              }}
            >
              <SettingsIcon />
            </div>
          </div>
          <div className="flex justify-start gap-6">
            <span>{posts?.length + reels?.length} posts</span>
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
                return <ProfilePostsComp posts={posts} />;
              case "reels":
                return <ProfileReelComp reels={reels} />;
              case "saved":
                return <ProfileSavedComp savedPosts={savedPosts} />;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;
