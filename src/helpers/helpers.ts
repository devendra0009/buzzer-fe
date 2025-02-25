import moment from "moment";
import { ChatState } from "../interfaces/chats/chatInterface";
import { UserState } from "../interfaces/user/userInterfaces";
import { StoryState } from "../interfaces/story/storyInterfaces";

export const setTokenInLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};
export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};
export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const customButtonStyles = {
  backgroundColor: "var(--btn-background-color)",
  "&:hover": {
    backgroundColor: "var(--btn-hover-background-color)",
  },
};

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 500,
  backgroundColor: "var(--btn-background-color)",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "0.7rem",
};
export const postModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "90%",
  backgroundColor: "black",
  boxShadow: 24,
  borderRadius: "0.7rem",
  display: "flex",
  flexDirection: "column",
};

export const formatDateTimeToDdmmyy = (dateTimeString: string | undefined) => {
  // Parse the input date string
  const formattedDate = moment(dateTimeString).format("DD-MM-YY");
  const formattedTime = moment(dateTimeString).format("hh:mm A");

  // Return the combined result
  return `${formattedDate}, ${formattedTime}`;
};

export const getVideoThumbnail = (videoUrl, callback) => {
  const video = document.createElement("video");
  video.src = videoUrl;
  video.crossOrigin = "anonymous"; // Ensure cross-origin access
  video.currentTime = 1; // Seek to 1 second (adjust if needed)

  video.addEventListener("loadeddata", () => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const thumbnail = canvas.toDataURL("image/png"); // Get base64 image
    callback(thumbnail); // Pass thumbnail
  });
};

export const timeDiff = (date) => {
  const now = moment();
  const diff = moment(date);

  const diffInSeconds = now.diff(diff, "seconds");
  const diffInMinutes = now.diff(diff, "minutes");
  const diffInHours = now.diff(diff, "hours");
  const diffInDays = now.diff(diff, "days");

  if (diffInDays > 0) {
    return `${diffInDays}d`; // If more than 1 day
  } else if (diffInHours > 0) {
    return `${diffInHours}h`; // If more than 1 hour but less than 1 day
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m`; // If more than 1 minute but less than 1 hour
  } else if (diffInSeconds > 0) {
    return `${diffInSeconds}s`; // If more than 1 second but less than 1 minute
  } else {
    return "Now"; // If it's less than a second
  }
};


export const getChatPartnerData = (
  chat: ChatState,
  currUserId: number
): UserState => {
  const isFirstUser = chat.users[0]?.id === currUserId;
  const partnerUser = isFirstUser ? chat.users[1] : chat.users[0];

  return partnerUser;
};

export const isImage = (imageUrl) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
  const extension = imageUrl?.split(".").pop().toLowerCase();
  return imageExtensions.includes(extension);
};

export const isVideo = (imageUrl) => {
  const videoExtensions = ["mp4", "mov", "avi", "webm", "mkv"];
  const extension = imageUrl?.split(".").pop().toLowerCase();
  return videoExtensions.includes(extension);
};

export const findCurrUsersStories = (
  stories: StoryState[],
  userId: number
): StoryState[] => {
  return stories?.filter((st) => st?.user?.id === userId);
};

export const findCurrUsersExcludingStories = (
  stories: StoryState[],
  userId: number
): StoryState[] => {
  return stories?.length === 0
    ? []
    : stories?.filter((st) => st?.user?.id !== userId);
};


export const openClickedProfile = (userId, navigate) => {
  navigate(`/profile/${userId}`);
};

export const DEFAULT_PAGE_SIZE=10;