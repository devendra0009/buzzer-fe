import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CustomImageComp from "../reusableComp/CustomImageComp";
import { timeDiff } from "../../helpers/helpers";
import CustomProfileIconComp from "../profile/CustomProfileIconComp";
import TextLightGraySmall from "../reusableComp/TextLightGraySmall";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  commentOnPost,
  getAllCommentsByPost,
  liketPost,
  savePost,
} from "../../slices/postSlice";
import TextBlueLink from "../reusableComp/TextBlueLink";
import { PostState } from "../../interfaces/post/postInterface";
import PostModal from "../reusableComp/PostModal";

const PostsContainer = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.user);
  const { postData } = useSelector((state: RootState) => state.post);

  // State for comments mapped by postId
  const [comments, setComments] = useState<{ [key: number]: string }>({});
  const [isOpenPostModal, setIsOpenPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostState | null>(null);
  

  const handleToggleLike = (postId: number) => {
    dispatch(liketPost(postId));
  };

  const handlePostComment = (postId: number) => {
    const data = {
      content: comments[postId] || "", // Get comment for the specific post
      postId: postId,
    };

    dispatch(commentOnPost(data)).then(() => {
      setComments((prev) => ({ ...prev, [postId]: "" })); // Clear comment for this post
    });
  };

  const handlePostModal = (post: PostState) => {
    // dispatch(getAllCommentsByPost(postId)).then((data) => {
    //   setSelectedPost(data?.payload?.data[0]?.post);
    // });
    setSelectedPost(post);
    setIsOpenPostModal(true);
  };

  const handleSavePost = (postId: number) => {
    dispatch(savePost(postId));
  };

  

  return (
    <div className="flex flex-col gap-4">
      {postData?.map((post) => {
        return (
          <div key={post.id}>
            <div className="flex items-center justify-between">
              <div className="header flex gap-2 items-center p-1">
                <CustomProfileIconComp imgLink={post?.user?.profileImg} />
                <div className="side-info">
                  <div className="finfo flex gap-1 items-center">
                    <span>{post?.user?.firstName}</span>
                    <span>•</span>
                    <TextLightGraySmall text={timeDiff(post?.createdAt)} />
                  </div>
                  <div className="sinfo">
                    <TextLightGraySmall text={post?.location} />
                  </div>
                </div>
              </div>
              <div className="more">
                <MoreHorizIcon />
              </div>
            </div>

            <div className="main-media px-[2.7rem] border-[1px] border-[var(--outliner-color)]">
              <CustomImageComp
                width="100%"
                height="100%"
                imgLink={post?.mediaFiles?.[0]}
              />
            </div>

            <div className="interactions py-3">
              <div className="header flex justify-between">
                <div className="intc flex gap-4">
                  {post?.likedBy?.find(
                    (userLiked) => userLiked?.id === userData?.id
                  ) ? (
                    <FavoriteIcon
                      color="error"
                      className="hover:cursor-pointer"
                      onClick={() => handleToggleLike(post?.id)}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      className="hover:cursor-pointer"
                      onClick={() => handleToggleLike(post?.id)}
                    />
                  )}
                  <ChatBubbleOutlineIcon className="hover:cursor-pointer" />
                  <ShareIcon className="hover:cursor-pointer" />
                </div>
                <div className="save" onClick={() => handleSavePost(post?.id)}>
                  {post?.savedBy?.find(
                    (userSaved) => userSaved?.id === userData?.id
                  ) ? (
                    <BookmarkIcon className="hover:cursor-pointer" />
                  ) : (
                    <BookmarkBorderIcon className="hover:cursor-pointer" />
                  )}
                </div>
              </div>

              <div className="footer my-2 flex flex-col gap-1">
                <div className="likes">{post?.likedBy?.length} likes</div>
                <div className="owner flex gap-2">
                  <span>{post?.user?.firstName}</span>
                  <span>
                    {post?.caption}
                    {post?.tags?.map((tag) => {
                      return (
                        <span key={tag} className="text-blue-500 text-sm">
                          #{tag}{" "}
                        </span>
                      );
                    })}
                  </span>
                </div>

                <div className="comments">
                  <span
                    onClick={() => handlePostModal(post)}
                    className="hover:cursor-pointer"
                  >
                    <TextBlueLink text={"View all comments"} />
                  </span>
                  <div className="comment-ip flex gap-2 my-2">
                    <input
                      type="text"
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="Add a comment..."
                      value={comments[post.id] || ""}
                      onChange={(e) =>
                        setComments((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                    />
                    <SendIcon
                      className="hover:cursor-pointer"
                      onClick={() => handlePostComment(post?.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {isOpenPostModal && (
        <PostModal
          isOpenPostModal={isOpenPostModal}
          setIsOpenPostModal={setIsOpenPostModal}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          userData={userData}
        />
      )}
    </div>
  );
};

export default PostsContainer;
