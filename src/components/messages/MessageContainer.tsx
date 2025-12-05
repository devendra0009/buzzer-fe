import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  getChatPartnerData,
  isAudio,
  isImage,
  isVideo,
  modalStyle,
  timeDiff,
} from "../../helpers/helpers";
import CustomProfileIconComp from "../profile/CustomProfileIconComp";
import InfoIcon from "@mui/icons-material/Info";
import CustomImageComp from "../reusableComp/CustomImageComp";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { createMessageForChat } from "../../slices/messageSlice";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";
import { BASE_URI_SOCKET } from "../../config/config";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CustomControlledVideoComp from "../reusableComp/CustomControlledVideoComp";
import {
  createMessageForChatFromApi,
  getAllMessagesByChatIdFromApi,
} from "../../apis/messages/messageApi";
import { ChatState } from "../../interfaces/chats/chatInterface";
import { getChatByIdFromApi } from "../../apis/chat/chatApis";
import { MessageState } from "../../interfaces/messages/messageInterface";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import AudioCallUI from "../audioCall/AudioCallUI";
import VideoCallUI from "../videoCall/VideoCallUI";

const MessageContainer = ({ selectedChatId }) => {
  const dispatch = useDispatch();
  // const { selectedChat } = useSelector((state: RootState) => state.chat);
  const { userData, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  let chunks = [];
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [msgAudio, setMsgAudio] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [msgPage, setMsgPage] = useState(0);
  const [msgSize, setMsgSize] = useState(5);
  const [selectedChat, setSelectedChat] = useState<ChatState>({} as ChatState);
  const [allMessages, setAllMessages] = useState<MessageState[]>([]);
  const [msg, setMsg] = useState("");
  const [msgImg, setMsgImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [previewImg2, setPreviewImg2] = useState<string | null>(null);
  const [previewImgModalOpen, setPreviewImgModalOpen] =
    useState<boolean>(false);
  const [previewImgModalOpen2, setPreviewImgModalOpen2] =
    useState<boolean>(false);
  const stompClient = useRef<Client | null>(null);
  // const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessageDirectly = (text) => {
    const data = {
      content: text,
      chatId: selectedChat?.id,
      image: null,
      audio: null,
    };
    createMessageForChatFromApi({ data }).then((response) => {
      // dispatch(appendMessageInSelectedChat(response.data));
      // sending message through websocket -> getting triggered multiple times bug
      console.log(response);

      sendMsgToServer(response.data);
    });
  };
  const handleSendMessage = () => {
    if (msg === "" && !msgImg && !audioURL) return;
    const data = {
      content: msg,
      chatId: selectedChat?.id,
      image: msgImg,
      audio: msgAudio,
    };
    createMessageForChatFromApi({ data }).then((response) => {
      // dispatch(appendMessageInSelectedChat(response.data));
      // sending message through websocket -> getting triggered multiple times bug
      console.log(response);

      sendMsgToServer(response.data);
    });

    // dispatch(createMessageForChat({ data, sendMsgToServer }));
    setMsg("");
    setMsgImg(null);
    setPreviewImg(null);
    setAudioURL(null);
    setMsgAudio(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMsgImg(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handlePreviewImgInModal = (sentImg: string) => {
    if (sentImg) {
      setPreviewImgModalOpen2(true);
      setPreviewImg2(sentImg);
    } else {
      setPreviewImgModalOpen(true);
    }
  };
  const handlePreviewImgInModalClose = () => {
    setPreviewImgModalOpen(false);
  };
  const handlePreviewImgInModalClose2 = () => {
    setPreviewImgModalOpen2(false);
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    scrollToBottom();
  }, [allMessages]);

  const getSelectedChat = async (chatId: number) => {
    // fetch selected chat from all chats in store

    const res = await getChatByIdFromApi(chatId);
    if (!res.success) return;

    console.log(res);

    setSelectedChat(res.data);
  };

  useEffect(() => {
    getSelectedChat(selectedChatId);
  }, []);

  const getSelectedChatMessages = async (chatId: number) => {
    // fetch selected chat from all chats in store

    const res = await getAllMessagesByChatIdFromApi(chatId, msgPage, msgSize);
    if (!res.success) return;

    console.log(res);

    setAllMessages(res.data);
  };

  useEffect(() => {
    getSelectedChatMessages(selectedChatId);
  }, []);

  // socket connection
  const onConnect = (stomp) => {
    const subscription = stompClient.current?.subscribe(
      `/user/${selectedChat?.id?.toString()}/private`,
      onMessageReceive
    );
    console.log(subscription, `subscribed to /user/${selectedChat.id}/private`);
  };

  const onError = (e) => {
    setIsConnected(false);
    console.log("socket err", e);
  };

  const onMessageReceive = (message) => {
    console.log("msg received", JSON.parse(message.body));

    setAllMessages((prevMessages) => [
      JSON.parse(message.body),
      ...prevMessages,
    ]);

    // setAllMessages((prevMessages) => [
    //   JSON.parse(message.body),
    //   ...prevMessages,
    // ]);
    // dispatch(appendMessageInSelectedChat(JSON.parse(message.body)));
  };

  const sendMsgToServer = (newMsg) => {
    if (stompClient && newMsg) {
      console.log(newMsg, "newMsg");
      stompClient.current?.send(
        `/app/chat/${selectedChat?.id?.toString()}`,
        {},
        JSON.stringify(newMsg)
      );
    }
  };

  useEffect(() => {
    const sock = new SockJS(BASE_URI_SOCKET);
    const stomp = Stomp.over(sock);

    stomp.connect({}, onConnect, onError);
    stompClient.current = stomp;
  }, [selectedChat?.id]);

  const loadMoreMessages = async () => {
    if (!selectedChat || !selectedChat.id) return;
    const res = await getAllMessagesByChatIdFromApi(
      selectedChat.id,
      msgPage + 1,
      msgSize
    );
    if (!res.success) return;

    setMsgPage((prevPage) => prevPage + 1);
    setAllMessages((prevMessages) => [...prevMessages, ...res.data]);
  };

  const startRecording = async () => {
    console.log("start recording");

    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.start();
    setMediaRecorder(recorder);

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const file = new File([blob], "audio.webm");

      // Send to parent for uploading
      // onSend(file);
      setMsgAudio(file);
      console.log(blob, file, "blob file");

      setAudioURL(URL.createObjectURL(blob));
      chunks = [];
    };
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  console.log(navigator.geolocation, "navigator.onLine");

  return (
    <div className="   min-h-screen   relative ">
      <div className="headers p-6 flex justify-between border-b-[1px] border-b-[var(--outliner-color)]">
        {Object.keys(selectedChat).length > 0 && (
          <div className="dets flex items-center gap-4">
            <CustomProfileIconComp
              width="50px"
              height="50px"
              imgLink={
                getChatPartnerData(selectedChat, userData?.id)?.profileImg
              }
            />
            <span className=" capitalize font-bold text-xl">
              {getChatPartnerData(selectedChat, userData?.id)?.firstName +
                " " +
                getChatPartnerData(selectedChat, userData?.id)?.lastName}
            </span>
          </div>
        )}
        <div className="info">
          <InfoIcon />
        </div>
      </div>
      <div className="calling-container flex gap-4  justify-center items-center py-6">
        <div className="calling ">
          <AudioCallUI
            groupId={selectedChatId}
            fromUser={userData?.id}
            toUser={getChatPartnerData(selectedChat, userData?.id)?.id}
          />
        </div>
        <div className="calling ">
          <VideoCallUI
            groupId={selectedChatId}
            fromUser={userData?.id}
            toUser={getChatPartnerData(selectedChat, userData?.id)?.id}
          />
        </div>
      </div>
      <div className="inputClass bg-black  border-t-[1px] border-t-[var(--outliner-color)]   ps-4 pe-8  w-full flex  items-center gap-4">
        {previewImg && (
          <div className="preview p-4" onClick={handlePreviewImgInModal}>
            <CustomImageComp imgLink={previewImg} />
          </div>
        )}
        <InsertEmoticonIcon />
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Message..."
          type="text"
          className="w-full px-6 py-3 bg-black rounded-[1.5rem] text-md focus:outline-none  border-[2px] border-[var(--outliner-color)] "
        />
        {isRecording ? (
          <StopCircleIcon onClick={stopRecording} className=" cursor-pointer" />
        ) : (
          <KeyboardVoiceIcon
            onClick={startRecording}
            className=" cursor-pointer"
          />
        )}
        {audioURL && <audio controls src={audioURL}></audio>}
        <label
          className="submit font-bold hover:cursor-pointer"
          htmlFor="msg-image"
        >
          <AddPhotoAlternateIcon />
        </label>

        <span
          className="submit text-blue-500 font-bold hover:cursor-pointer"
          onClick={handleSendMessage}
        >
          Send
        </span>
      </div>
      <div className="messages p-4 flex flex-col gap-2  h-[calc(100vh-150px)]  overflow-y-scroll">
        <div ref={messageEndRef} />
        {Object.keys(selectedChat).length > 0 &&
          allMessages?.map((msg) => {
            return (
              <span
                className={` px-4 py-2 ${
                  msg?.user?.id === userData?.id
                    ? " bg-blue-500"
                    : " bg-gray-600"
                } rounded-lg self-start flex flex-col`}
              >
                <span className=" user-det text-[0.7rem] flex gap-2 text-[var(--text-light-gray)]">
                  <span className="name capitalize">
                    {msg?.user?.firstName}
                  </span>
                  <span className="timeAgo">{timeDiff(msg?.createdAt)}</span>
                </span>

                <span className="contnt flex flex-col gap-2 pb-2">
                  <span> {msg?.content}</span>
                  {msg?.image && msg?.image !== "" && (
                    <span className="received-media ">
                      {isImage(msg?.image) ? (
                        <span
                          className="received-img"
                          onClick={() => handlePreviewImgInModal(msg?.image)}
                        >
                          <CustomImageComp
                            imgLink={msg?.image}
                            width="200px"
                            height="200px"
                          />
                        </span>
                      ) : isVideo(msg?.image) ? (
                        <span>
                          <CustomControlledVideoComp
                            videoSrc={msg?.image}
                            width={"200px"}
                            height={"200px"}
                          />
                        </span>
                      ) : (
                        <span>Unsupported media type</span>
                      )}
                    </span>
                  )}
                  {msg?.audio && msg?.audio !== "" && (
                    <span className="received-media ">
                      {isAudio(msg?.audio) ? (
                        <audio
                          controls
                          src={msg?.audio}
                          // onEnded={() => {
                          //   console.log("ended");
                          //   handleSendMessageDirectly(
                          //     "Audio played completely with id " + msg?.id
                          //   );
                          // }}
                        ></audio>
                      ) : (
                        <span>Unsupported audio type</span>
                      )}
                    </span>
                  )}
                </span>
              </span>
            );
          })}
        {/* <button className="bg-green-500" onClick={loadMoreMessages}>Load more V</button> */}
        <ExpandCircleDownIcon
          onClick={loadMoreMessages}
          className=" text-blue-500 cursor-pointer hover:scale-110 mt-4"
        />
      </div>

      <span
        className="scrollToBottomIcon absolute right-[5%] bottom-[100px] rounded-full bg-[var(--outliner-color)] p-2 cursor-pointer"
        onClick={scrollToBottom}
      >
        <ArrowDownwardIcon />
      </span>

      <input
        type="file"
        className=" hidden"
        id="msg-image"
        onChange={handleImageChange}
      />
      {previewImgModalOpen && (
        <Modal
          open={previewImgModalOpen}
          onClose={handlePreviewImgInModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div className="headmodal flex justify-between p-3 font-bold">
              <h1 className="text-lg">Preview selected media</h1>
              <span>
                <CloseIcon
                  onClick={handlePreviewImgInModalClose}
                  className="hover:cursor-pointer"
                />
              </span>
            </div>
            <div className="p-4">
              {isImage(previewImg) ? (
                <CustomImageComp
                  imgLink={previewImg}
                  width="500px"
                  height="500px"
                  style={{ objectFit: "contain" }}
                />
              ) : isVideo(previewImg) ? (
                <video
                  width="200px"
                  height="200px"
                  style={{ objectFit: "contain" }}
                >
                  <source src={previewImg} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <span>Unsupported media type</span>
              )}
            </div>
          </Box>
        </Modal>
      )}
      {previewImgModalOpen2 && (
        <Modal
          open={previewImgModalOpen2}
          onClose={handlePreviewImgInModalClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div className="headmodal flex justify-between p-3 font-bold">
              <h1 className="text-lg">Preview selected media</h1>
              <span>
                <CloseIcon
                  onClick={handlePreviewImgInModalClose2}
                  className="hover:cursor-pointer"
                />
              </span>
            </div>
            <div className="p-4">
              <CustomImageComp
                imgLink={previewImg2}
                width="500px"
                height="500px"
                style={{ objectFit: "contain" }}
              />
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default MessageContainer;
