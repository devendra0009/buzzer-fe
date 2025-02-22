import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  getPostsByUserId,
  getReelsByUserId,
  getSavedPostsByUserId,
} from "../../slices/userSlice";
import ProfileComp from "../../components/profile/ProfileComp";
import { useParams } from "react-router-dom";
import { UserState } from "../../interfaces/user/userInterfaces";
import {
  getPostsByUserIdFromApi,
  getReelsByUserIdFromApi,
  getSavedPostsByUserIdFromApi,
  getUserById,
} from "../../apis/user/userApi";
import { getAllPostsFromApi } from "../../apis/post/postApi";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [currUser, setCurrUser] = useState<UserState | null>(null);

  const { pid } = useParams();

  const fetchUserById = async () => {
    console.log(pid, typeof pid, Number(pid));

    const res = await getUserById(Number(pid));

    console.log(res, "rizz");

    const posts = await getPostsByUserIdFromApi(res?.data?.id);

    const reels = await getReelsByUserIdFromApi(res?.data?.id);
    const savedPost = await getSavedPostsByUserIdFromApi(res?.data?.id);
    //   stories: StoryState[];

    res.data["posts"] = posts?.data;
    res.data["reels"] = reels?.data;
    res.data["savedPost"] = savedPost?.data;

    console.log(res);
    setCurrUser(res.data);
  };

  useEffect(() => {
    if (userData?.id.toString() === pid) {
      //   console.log("asa");
      dispatch(getPostsByUserId(userData?.id));
      dispatch(getReelsByUserId(userData?.id));
      dispatch(getSavedPostsByUserId(userData?.id));
    } else {
      //   console.log("ram");
      fetchUserById();
    }
  }, [pid]);

  useEffect(() => {
    if (!loading && userData?.id.toString() === pid) {
      setCurrUser(userData);
    }
  }, [loading, userData, pid]);

  return <div>{currUser && <ProfileComp userData={currUser} />}</div>;
};

export default ProfilePage;
