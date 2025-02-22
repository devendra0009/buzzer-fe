import React, { useEffect, useState } from "react";
import { Box, IconButton, Modal } from "@mui/material";
import {
  formatDateTimeToDdmmyy,
  postModalStyle,
  timeDiff,
} from "../../helpers/helpers";
import CustomImageComp from "../reusableComp/CustomImageComp";
import TextBlueLink from "../reusableComp/TextBlueLink";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomProfileIconComp from "../profile/CustomProfileIconComp";
import { PostState } from "../../interfaces/post/postInterface";
import { UserState } from "../../interfaces/user/userInterfaces";
import { CommentState } from "../../interfaces/comment/commentInterface";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import {
  commentOnPost,
  getAllPosts,
  likeAComment,
} from "../../slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface PostModalInterface {
  isOpenPostModal: boolean;
  setIsOpenPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPost: PostState | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<PostState | null>>;
  userData: UserState | undefined;
  // handleToggleCommentLike: () => void;
}

const PostModal: React.FC<PostModalInterface> = ({
  isOpenPostModal,
  setIsOpenPostModal,
  selectedPost,
  setSelectedPost,
  userData,
}) => {
  const dispatch = useDispatch();
  const { postData } = useSelector((state: RootState) => state.post);
  const [comment, setComment] = useState("");

  const handleModalClose = () => {
    setIsOpenPostModal(false);
  };

  const handlePostComment = () => {
    if (selectedPost && comment !== "" && comment.trim()) {
      const data = {
        content: comment,
        postId: selectedPost?.id,
      };

      dispatch(commentOnPost(data)).then(() => {
        setComment("");
      });
      dispatch(getAllPosts());
    }
  };

  useEffect(() => {
    const updatedPost = postData?.find((p) => p?.id === selectedPost?.id);
    setSelectedPost(updatedPost);
  }, [postData]);

  const handleToggleCommentLike = (commentId) => {
    dispatch(likeAComment(commentId));
  };

  return (
    <Modal
      open={isOpenPostModal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ border: "1px", borderColor: "red" }}
    >
      <Box sx={postModalStyle}>
        <div className="post-contnt flex  h-full">
          <div className="media-contain w-1/2 h-full">
            <CustomImageComp
              width="100%"
              height="100%"
              imgLink={selectedPost?.mediaFiles?.[0]}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="interactions w-1/2 h-full relative">
            <div className="header flex p-4 justify-between items-center border-b-[2px] border-b-[var(--outliner-color)]">
              <div className="left flex items-center">
                <div className="img me-4">
                  <CustomProfileIconComp
                    imgLink={selectedPost?.user?.profileImg}
                  />
                </div>
                {selectedPost?.user?.firstName}
                {" • "}
                <TextBlueLink text={"Follow"} />
              </div>
              <div className="more">
                <MoreHorizIcon />
              </div>
            </div>
            <div className="about flex p-4">
              <div className="img me-4">
                <CustomProfileIconComp
                  imgLink={selectedPost?.user?.profileImg}
                />
              </div>
              <div className="content">
                <span className=" font-bold me-2 ">
                  {selectedPost?.user?.firstName}
                </span>
                <span className=" me-2 text-sm  capitalize">
                  {selectedPost?.caption}
                </span>
                {selectedPost?.tags?.map((tag: string) => {
                  return (
                    <span className=" text-blue-500 text-sm">#{tag} </span>
                  );
                })}
                <p className=" text-[10px] text-[--text-light-gray] mt-1">
                  {formatDateTimeToDdmmyy(selectedPost?.createdAt)}
                </p>
              </div>
            </div>
            <div className="comments flex flex-col gap-4 px-4  py-2 overflow-y-scroll max-h-[70%]">
              {selectedPost?.comments?.map((commnt: CommentState) => (
                <div className="left flex  items-start">
                  <div className="img me-4">
                    <CustomProfileIconComp
                      imgLink={commnt?.commentedBy?.profileImg}
                    />
                  </div>
                  <div className="contnt w-full flex justify-between gap-2">
                    <div className="dets">
                      <div className="det-1">
                        <span className=" me-2 lowercase font-bold">
                          {commnt?.commentedBy?.firstName}
                        </span>
                        <span className=" text-sm ">{commnt?.content}</span>
                      </div>
                      <div className="det-2 text-[0.8rem] text-gray-400  flex gap-2">
                        <span>{timeDiff(commnt?.createdAt)}</span>
                        <span>{commnt?.likedBy?.length} likes</span>
                      </div>
                    </div>
                    <div>
                      {commnt?.likedBy?.find(
                        (userLiked) => userLiked?.id === userData?.id
                      ) ? (
                        <FavoriteIcon
                          className="hover:cursor-pointer"
                          // fontSize="small"
                          sx={{
                            fontSize: "1rem",
                          }}
                          color="error"
                          onClick={() => {
                            handleToggleCommentLike(commnt?.id);
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          className="hover:cursor-pointer"
                          // fontSize="small"
                          sx={{
                            fontSize: "1rem",
                          }}
                          onClick={() => {
                            handleToggleCommentLike(commnt?.id);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="comment-ip flex gap-2 py-2 ps-4 text-sm absolute bottom-0 w-full  bg-black ">
              <input
                type="text"
                className="w-full bg-transparent focus:outline-none"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <IconButton
                className="hover:cursor-pointer"
                onClick={handlePostComment}
              >
                <SendIcon color="primary" />
              </IconButton>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default PostModal;
