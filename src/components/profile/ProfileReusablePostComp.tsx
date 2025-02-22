import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { PostState } from "../../interfaces/post/postInterface";
import CustomImageComp from "../reusableComp/CustomImageComp";
import PostModal from "../reusableComp/PostModal";

interface ProfileReusablePostsCompProps {
  postProp: PostState[];
}

const ProfileReusablePostsComp: React.FC<ProfileReusablePostsCompProps> = ({
  postProp,
}) => {
  const { userData } = useSelector((state: RootState) => state.user);
  const [isOpenPostModal, setIsOpenPostModal] = useState(false);

  const [selectedPost, setSelectedPost] = useState<PostState | null>(null);

  const handleModalOpen = () => {
    setIsOpenPostModal(true);
  };

  return (
    <div className=" grid grid-cols-2 md:grid-cols-3 gap-2">
      {postProp?.map((post, idx) => (
        <div
          key={idx}
          className="post-container relative group "
          onClick={() => {
            setSelectedPost(post);
            handleModalOpen();
          }}
        >
          <div className="img">
            <CustomImageComp
              width="100%"
              height="250px"
              imgLink={post?.mediaFiles?.[0]}
            />
          </div>

          {/* Overlay with Caption */}
          <div className="absolute hover:cursor-pointer inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex gap-2 items-center justify-center text-white font-semibold transition-opacity duration-300">
            <div className="likes">
              <FavoriteIcon /> <span>{post?.likedBy?.length}</span>
            </div>
            <div className="comment">
              <ModeCommentIcon /> <span>{post?.comments?.length}</span>
            </div>
          </div>
        </div>
      ))}

      {isOpenPostModal && (
        <PostModal
          isOpenPostModal={isOpenPostModal}
          setIsOpenPostModal={setIsOpenPostModal}
          selectedPost={selectedPost}
          userData={userData}
          setSelectedPost={setSelectedPost}
        />
      )}
    </div>
  );
};

export default ProfileReusablePostsComp;
