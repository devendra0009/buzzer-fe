import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CustomProfileIconComp from "../profile/CustomProfileIconComp";
import {
  StoryRequest,
  StoryState,
} from "../../interfaces/story/storyInterfaces";
import {
  findCurrUsersExcludingStories,
  findCurrUsersStories,
  modalStyle,
} from "../../helpers/helpers";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createStory } from "../../slices/storySlice";
import { ReelState } from "../../interfaces/reel/reelInterface";
import CustomImageComp from "../reusableComp/CustomImageComp";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

const StoryComp = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.user);

  const [isStoryViewModal, setIsStoryViewModal] = useState(false);
  const [viewingStory, setViewingStory] = useState<StoryState | null>(null);
  const [isStoryCreateModal, setIsStoryCreateModal] = useState(false);
  const [captions, setCaptions] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [deactivatedAt, setDeactivatedAt] = useState<number>(300);

  const handleModalClose = () => {
    setIsStoryCreateModal(false);
    setCaptions("");
    setFile(null);
    setPreviewImg(null);
    setDeactivatedAt(300);
  };

  const handleCreateStory = () => {
    setIsStoryCreateModal(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreviewImg(URL.createObjectURL(selectedFile));
    }
  };

  const clearPreview = () => {
    setFile(null);
    setPreviewImg(null);
  };

  const resetCreateSrotyModal = () => {
    setCaptions("");
    setDeactivatedAt(300);
    setFile(null);
    setIsStoryCreateModal(false);
  };

  const handlePostStory = () => {
    if (captions === "" || file === null) return;
    const data = {
      captions,
      deactivatedAt: deactivatedAt,
      image: file,
    };

    dispatch(createStory(data));

    resetCreateSrotyModal();
  };

  const handleViewModalClose = () => {
    setIsStoryViewModal(false);
  };

  const handleViewStory = (story: StoryState) => {
    setIsStoryViewModal(true);
    setViewingStory(story);
  };

  return (
    <div className="flex gap-4 overflow-x-auto p-2 scrollbar-hide">
      {findCurrUsersStories(userData?.stories, userData?.id)?.length <= 0 ? (
        <span className="relative cursor-pointer" onClick={handleCreateStory}>
          <CustomProfileIconComp
            width="50px"
            height="50px"
            imgLink={userData?.profileImg}
            isStory={false}
          />
          <AddIcon
            className="absolute bottom-0 right-0 font-bold bg-blue-500 rounded-full"
            fontSize="small"
          />
        </span>
      ) : (
        findCurrUsersStories(userData?.stories, userData?.id)?.map(
          (currStory, index) => (
            <span onClick={() => handleViewStory(currStory)}>
              <CustomProfileIconComp
                key={index}
                width="50px"
                height="50px"
                imgLink={userData?.profileImg}
                isStory={true}
                isSeenByCurrUser={currStory?.seenBy?.some(
                  (s) => s?.id === userData?.id
                )}
              />
            </span>
          )
        )
      )}

      {findCurrUsersExcludingStories(userData?.stories, userData?.id)?.map(
        (story: StoryState, index) => (
          <span onClick={() => handleViewStory(story)}>
            <CustomProfileIconComp
              key={index}
              width="50px"
              height="50px"
              imgLink={story?.user?.profileImg}
              isStory={true}
              isSeenByCurrUser={story?.seenBy?.some(
                (s) => s?.id === userData?.id
              )}
            />
          </span>
        )
      )}

      {isStoryViewModal && (
        <Modal
          open={isStoryViewModal}
          onClose={handleViewModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...modalStyle, width: "30%", height: "80%" }}>
            <div className="headmodal flex justify-between p-3 font-bold">
              <h1 className="text-lg flex  gap-4">
                <CustomProfileIconComp
                  imgLink={viewingStory?.user?.profileImg}
                />
                <span>{viewingStory?.user?.firstName}</span>
              </h1>
              <CloseIcon
                onClick={handleViewModalClose}
                className="hover:cursor-pointer"
              />
            </div>
            <div className="content flex flex-col justify-center items-center gap-4  h-[90%]">
              <div className="img h-full">
                <CustomImageComp
                  imgLink={viewingStory?.image}
                  width="100%"
                  height="100%"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className=" text-lg mb-4">{viewingStory?.captions}</p>
            </div>
            <LinearLoaderWithTrigger
              setIsStoryViewModal={setIsStoryViewModal}
            />
          </Box>
        </Modal>
      )}

      {isStoryCreateModal && (
        <Modal
          open={isStoryCreateModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...modalStyle, width: "30%" }}>
            <div className="headmodal flex justify-between p-3 font-bold">
              <h1 className="text-lg">Create story</h1>
              <CloseIcon
                onClick={handleModalClose}
                className="hover:cursor-pointer"
              />
            </div>
            <div className="form-ips py-4 px-8">
              <div className="contnt flex flex-col gap-8">
                {previewImg ? (
                  <div className="relative">
                    <img
                      src={previewImg}
                      alt="Preview"
                      className="rounded-md w-full h-[200px] object-contain"
                    />
                    <button
                      onClick={clearPreview}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-[2px] text-sm"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="story-image-ip"
                    className="flex justify-center bg-black rounded-md py-4 cursor-pointer"
                  >
                    <AddPhotoAlternateIcon
                      sx={{ fontSize: "180px" }}
                      className="text-white"
                    />
                  </label>
                )}
                <input
                  type="file"
                  id="story-image-ip"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <input
                  value={captions}
                  onChange={(e) => setCaptions(e.target.value)}
                  type="text"
                  placeholder="Enter captions..."
                  className="px-4 py-2 rounded-md bg-transparent focus:outline-none border-[1px] border-[var(--outliner-color)]"
                />
                <div className=" flex items-center gap-2 border-[1px] border-[var(--outliner-color)] py-2 px-4 rounded-md">
                  <label htmlFor="story-time-select" className="">
                    Deactivate after
                  </label>
                  <select
                    name="time-slct"
                    id="story-time-select"
                    value={deactivatedAt}
                    onChange={(e) => setDeactivatedAt(Number(e.target.value))}
                    className="px-4 py-2 w-[50%]  bg-transparent focus:outline-none  cursor-pointer"
                  >
                    <option
                      className="bg-[var(--btn-background-color)] cursor-pointer"
                      value={300}
                    >
                      5 min
                    </option>
                    <option
                      className="bg-[var(--btn-background-color)] cursor-pointer"
                      value={3600}
                    >
                      1 hr
                    </option>
                    <option
                      className="bg-[var(--btn-background-color)] cursor-pointer"
                      value={86400}
                    >
                      1 d
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="submit px-8 pb-6">
              <Button
                onClick={handlePostStory}
                variant="contained"
                className=" w-full "
              >
                Post
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default StoryComp;

const LinearLoaderWithTrigger = ({ setIsStoryViewModal }) => {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const duration = 10000; // 10 seconds
    const interval = 100; // Update every 100ms
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + step;
        if (nextProgress >= 100) {
          clearInterval(timer);
          triggerFunction(); // Trigger the desired function here
          return 100;
        }
        return nextProgress;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const triggerFunction = () => {
    setIsStoryViewModal(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: "0 0 16px 16px", // Bottom-left and bottom-right corners
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          "& .MuiLinearProgress-bar": {
            borderRadius: "0 0 4px 4px", // Bottom-left and bottom-right corners for the progress bar
            backgroundColor: "#1976d2",
          },
        }}
      />
    </Box>
  );
};
