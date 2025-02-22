import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CustomProfileIconComp from "../profile/CustomProfileIconComp";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import GroupIcon from "@mui/icons-material/Group";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { createPost } from "../../slices/postSlice";
import { useNavigate } from "react-router-dom";
import LoaderComp from "../reusableComp/LoaderComp";
import { createReel } from "../../slices/reelSlice";

interface PostStep2Props {
  post: File; // Accepts a File object
  setPost: React.Dispatch<React.SetStateAction<File | null>>;
  type: "POST" | "REEL";
}

const label = { inputProps: { "aria-label": "Switch demo" } };

const PostStep2: React.FC<PostStep2Props> = ({ post, setPost, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state.user);
  const { loading: pload, error } = useSelector(
    (state: RootState) => state.post
  );
  const { loading: rload, } = useSelector(
    (state: RootState) => state.reel
  );
  const fileUrl = URL.createObjectURL(post);

  const isImage = post.type.startsWith("image");
  const isVideo = post.type.startsWith("video");

  // State variables
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState(""); // Tags as comma-separated string
  const [location, setLocation] = useState("");
  const [isDdOpen, setIsDdOpen] = useState(false);

  // Form Submission
  const handleCreatePost = () => {
    const formData = new FormData();

    // Append form data
    formData.append("caption", caption);
    formData.append("tags", tags); // Sending comma-separated string
    formData.append("location", location);
    formData.append("mediaFiles", post); // File object

    dispatch(createPost({ data: formData, navigate }));

    console.log("Form Data: ", Object.fromEntries(formData)); // Debugging output
  };
  const handleCreateReel = () => {
    const formData = new FormData();

    // Append form data
    formData.append("title", `Reel by ${userData?.firstName}`);
    formData.append("description", caption);
    formData.append("file", post); // File object

    dispatch(createReel({ data: formData, navigate }));

    console.log("Form Data: ", Object.fromEntries(formData)); // Debugging output
  };

  return (
    <div className="post-preview flex flex-col w-full justify-center items-center p-5">
      <div className="header w-[70%] flex items-center justify-between mb-12">
        <div className="back-icon">
          <ArrowBackIcon
            onClick={() => setPost(null)}
            className="hover:cursor-pointer"
          />
        </div>
        <span className="font-medium">Create new post</span>
        {!pload && !rload ? (
          <Button
            size="small"
            color="success"
            variant="contained"
            sx={{ fontWeight: "bold", textTransform: "initial" }}
            onClick={type === "POST" ? handleCreatePost : handleCreateReel} // Submit form
          >
            Post
          </Button>
        ) : (
          <LoaderComp />
        )}
      </div>

      {/* Preview Media */}
      {isImage && (
        <img
          src={fileUrl}
          alt="Preview"
          className="max-w-full max-h-[500px] rounded-lg shadow-lg"
        />
      )}

      {isVideo && (
        <video
          controls
          src={fileUrl}
          className="max-w-full max-h-[500px] rounded-lg shadow-lg"
        >
          Your browser does not support the video tag.
        </video>
      )}

      {!isImage && !isVideo && (
        <p className="text-red-500 font-bold">
          Unsupported file format. Please upload an image or video.
        </p>
      )}

      {/* Inputs */}
      <div className="inputs h-[400px] w-[50%] mt-12 bg-[var(--btn-background-color)] p-4 overflow-scroll">
        <div className="who-r-u flex gap-3 mb-4">
          <CustomProfileIconComp imgLink={userData.profileImg} />
          <span>{userData.userName}</span>
        </div>

        {/* Caption */}
        <textarea
          className="w-full h-[200px] flex mx-auto bg-transparent px-1 focus:outline-none"
          placeholder="Enter the captions"
          style={{ resize: "none" }}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>

        {/* Location */}
        {type === "POST" && (
          <div className="location-ip flex items-center mb-3">
            <input
              type="text"
              className="w-full bg-transparent p-2 focus:outline-none"
              placeholder="Add location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <AddLocationIcon />
          </div>
        )}
        {/* Tags */}
        {type === "POST" && (
          <div className="collabs flex items-center">
            <input
              type="text"
              className="w-full bg-transparent p-2 focus:outline-none"
              placeholder="Add tags (comma-separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <GroupIcon />
          </div>
        )}
        {/* Advanced Settings */}
        {type === "POST" && (
          <div className="addition-setting">
            <div
              className="head flex justify-between ps-2 py-4"
              onClick={() => setIsDdOpen((prev) => !prev)}
            >
              <span>Advanced Settings</span>
              {isDdOpen ? (
                <ExpandLessIcon sx={{ color: "white" }} />
              ) : (
                <ExpandMoreIcon sx={{ color: "white" }} />
              )}
            </div>
            {isDdOpen && (
              <div className="px-2">
                <div className="commen flex gap-2 justify-start items-center">
                  <span>Turn off commenting</span>
                  <Switch {...label} />
                </div>
                <div className="hide-likes flex gap-2 justify-start items-center">
                  <span>Hide like and view counts on this post</span>
                  <Switch {...label} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostStep2;
