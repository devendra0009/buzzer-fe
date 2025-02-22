import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Button, Modal, Typography } from "@mui/material";
import CustomProfileIconComp from "../profile/CustomProfileIconComp";
import { BASE_URI_SOCKET, RAND_IMG2 } from "../../config/config";
import { getChatPartnerData, modalStyle } from "../../helpers/helpers";
import CloseIcon from "@mui/icons-material/Close";
import {
  getAllChatsForCurrUser,
  getChatById,
  setSelectedChat,
} from "../../slices/chatSlice";
import { ChatState } from "../../interfaces/chats/chatInterface";
import MessageContainer from "./MessageContainer";
import { getAllMessagesByChatId } from "../../slices/messageSlice";

// const chats = [
//   { img: RAND_IMG2, name: "Dave", lastMsg: "Good" },
//   { img: RAND_IMG2, name: "Gold", lastMsg: "Hi" },
//   { img: RAND_IMG2, name: "Rick", lastMsg: "Ok" },
// ];
const MessagesComp = () => {
  const { allChats, selectedChat } = useSelector(
    (state: RootState) => state.chat
  );
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  // const [isChatOpen, setIsChatOpen] = useState(false);
  const [sendMsgModalOpen, setSendMsgModalOpen] = useState(false);

  const handleSmsOpen = () => setSendMsgModalOpen(true);
  const handleSmsClose = () => setSendMsgModalOpen(false);

  const handleChatClick = (chatId) => {
    dispatch(getChatById(chatId)).then((data) => {
      dispatch(getAllMessagesByChatId(data.payload.data.id));
    });
  };

  useEffect(() => {
    dispatch(getAllChatsForCurrUser());
  }, []);

  return (
    <div className=" w-full flex ">
      <div className="sidebar w-1/4  border-r-[1px] border-r-[var(--outliner-color)]">
        <div className="header flex  justify-between border-b-[1px] border-b-[var(--outliner-color)]  mb-6 p-7 pb-6">
          <h1 className=" text-xl">{userData.userName}</h1>
          <div className="create">
            <AddCircleOutlineIcon
              className="hover:cursor-pointer"
              onClick={handleSmsOpen}
            />
          </div>
        </div>
        <div className="header-2 px-7">
          <CustomProfileIconComp
            width="80px"
            height="80px"
            imgLink={userData.profileImg}
          />
          <span className=" text-sm text-[var(--text-light-gray)] ms-3">
            Your Note
          </span>
        </div>

        <div className="chat-sidebar flex flex-col  mt-6 ">
          {allChats?.map((chat) => (
            <div
              className={` flex gap-3 hover:bg-[var(--btn-background-color)] hover:cursor-pointer py-2 px-7 ${
                selectedChat?.id === chat?.id &&
                "bg-[var(--btn-background-color)]"
              }`}
              onClick={() => handleChatClick(chat?.id)}
            >
              <div className="img">
                <CustomProfileIconComp
                  width="50px"
                  height="50px"
                  imgLink={getChatPartnerData(chat, userData?.id)?.profileImg}
                />
              </div>
              <div className="chat-details flex flex-col">
                <span>
                  {getChatPartnerData(chat, userData?.id)?.firstName +
                    " " +
                    getChatPartnerData(chat, userData?.id)?.lastName}
                </span>
                <span className="text-sm text-[var(--text-light-gray)]">
                  {chat?.messages?.[0]?.content}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="message-container w-3/4  ">
        {selectedChat?.id > 0 ? (
          <MessageContainer />
        ) : (
          <div className="alt-temp flex flex-col  justify-center items-center gap-2 min-h-screen ">
            <svg
              aria-label=""
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              height="96"
              role="img"
              viewBox="0 0 96 96"
              width="96"
            >
              <title></title>
              <path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path>
            </svg>
            <h1 className=" font-bold  text-lg">Your messages</h1>
            <p className=" text-sm mb-2">Send a message to start a chat.</p>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "initial" }}
              onClick={handleSmsOpen}
            >
              Send message
            </Button>
          </div>
        )}
      </div>

      {sendMsgModalOpen && (
        <Modal
          open={sendMsgModalOpen}
          onClose={handleSmsClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div className="headmodal flex justify-between p-3 font-bold">
              <h1 className="text-lg">New message</h1>
              <span>
                <CloseIcon
                  onClick={handleSmsClose}
                  className="hover:cursor-pointer"
                />
              </span>
            </div>
            <div className="font-medium search border-[1px] border-r-0 border-l-0 border-[var(--outliner-color)] ps-3">
              To:
              <input
                type="text"
                className="ms-3 bg-transparent focus:outline-none px-3 py-2 w-[500px]"
              />
            </div>
            <div className="suggestions h-[200px] p-4 text-[var(--text-light-gray)]">
              No account found
            </div>

            <div className="flex justify-center my-4">
              <Button
                variant="contained"
                sx={{ textTransform: "initial", width: "95%" }}
              >
                Chat
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default MessagesComp;
