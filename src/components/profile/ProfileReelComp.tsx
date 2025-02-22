import React, { useEffect, useState } from "react";
import { ReelState } from "../../interfaces/reel/reelInterface";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CustomVideoComp from "../reusableComp/CustomVideoComp";
import { Box, Modal } from "@mui/material";
import {
  formatDateTimeToDdmmyy,
  getVideoThumbnail,
  postModalStyle,
} from "../../helpers/helpers";
import CustomProfileIconComp from "./CustomProfileIconComp";
import TextBlueLink from "../reusableComp/TextBlueLink";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { UserState } from "../../interfaces/user/userInterfaces";

interface ProfileReelCompProps {
  userData: UserState;
}

const ProfileReelComp: React.FC<ProfileReelCompProps> = ({ userData }) => {
  // const { reelData, loading, error } = useSelector(
  //   (state: RootState) => state.reel
  // );
  // const { userData } = useSelector((state: RootState) => state.user);

  const [selectedReel, setSelectedReel] = useState<ReelState | null>(null);
  const [isOpenReelModal, setIsOpenReelModal] = useState(false);

  const [thumbnails, setThumbnails] = useState({});

  useEffect(() => {
    userData?.reels?.forEach((reel) => {
      getVideoThumbnail(reel.video, (thumbnail) => {
        setThumbnails((prev) => ({ ...prev, [reel.id]: thumbnail }));
      });
    });
  }, [userData?.reels]);

  const handleModalClose = () => {
    // debugger;
    setIsOpenReelModal(false);
  };

  const handleModalOpen = () => {
    setIsOpenReelModal(true);
  };

  return (
    <div className=" grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-2">
      {userData?.reels?.map((reel, idx) => (
        <div
          key={idx}
          className="post-container relative group hover:cursor-pointer "
          onClick={() => {
            setSelectedReel(reel);
            handleModalOpen();
          }}
        >
          <div className="img">
            <img
              src={thumbnails[reel.id] || "default-placeholder.jpg"}
              alt="thumbnail"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="absolute hover:cursor-pointer inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex gap-2 items-center justify-center text-white font-semibold transition-opacity duration-300">
            <div className="title">
              <FavoriteIcon /> <span>{reel?.title}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Overlay with Caption */}
      {isOpenReelModal && (
        <Modal
          open={isOpenReelModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          BackdropProps={{
            onClick: handleModalClose, // Close on clicking outside the modal
          }}
        >
          <Box sx={postModalStyle}>
            <div className="post-contnt flex  h-full">
              <div className="media-contain w-1/2 h-full">
                <CustomVideoComp
                  width="100%"
                  height="100%"
                  vidLink={selectedReel?.video}
                />
              </div>
              <div className="interactions w-1/2 h-full">
                <div className="header flex p-4 justify-between items-center border-b-[2px] border-b-[var(--outliner-color)]">
                  <div className="left flex items-center">
                    <div className="img me-4">
                      <CustomProfileIconComp imgLink={userData.profileImg} />
                    </div>
                    {userData.userName}
                    {" • "}
                    <TextBlueLink text={"Follow"} />
                  </div>
                  <div className="more">
                    <MoreHorizIcon />
                  </div>
                </div>
                <div className="about flex p-4">
                  <div className="img me-4">
                    <CustomProfileIconComp imgLink={userData.profileImg} />
                  </div>
                  <div className="content">
                    <span className=" font-bold me-2">{userData.userName}</span>
                    <span className=" me-2 text-sm">
                      {selectedReel?.description}
                    </span>
                    <p className=" text-[10px] text-[--text-light-gray] mt-1">
                      {formatDateTimeToDdmmyy(selectedReel?.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="comments"></div>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default ProfileReelComp;
