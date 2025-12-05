import React, { useEffect, useRef } from "react";
import useVideoCall from "../../hook/useVideoCall";
import { MdOutlineVideoCall } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Box, Modal, Typography } from "@mui/material";

const VideoCallUI = ({ groupId, fromUser, toUser }) => {
  const {
    inVideoCall,
    incomingOffer,
    remoteStream,
    startVideoCall,
    acceptCall,
    rejectCall,
    endCall,
    localStream,
  } = useVideoCall({ groupId, userId: fromUser });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  console.log(incomingOffer, "inc");

  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);

  useEffect(() => {
    console.log(remoteStream, "remaudref2inscheck");
    console.log(remoteVideoRef.current, "remaudref2inscheck");
    console.log(remoteStream && remoteVideoRef.current, "remaudref2inscheck");

    if (remoteStream && remoteVideoRef.current) {
      console.log(remoteStream, "remaudref2ins");
      console.log(remoteVideoRef.current.srcObject, "remaudref1insbef");

      remoteVideoRef.current.srcObject = remoteStream;
      console.log(remoteVideoRef.current.srcObject, "remaudref1insaft");
    }
  }, [remoteStream]);
  console.log(remoteVideoRef, "remaudref1");
  console.log(remoteStream, "remaudref2");

  // Optional: show local video preview
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);
  return (
    <div>
      {!inVideoCall && !incomingOffer && (
        <MdOutlineVideoCall
          size={25}
          onClick={() => startVideoCall(toUser)}
          className=" cursor-pointer"
        />
      )}

      {/* Incoming Call */}
      {incomingOffer && incomingOffer?.from != fromUser && (
        <div className=" absolute top-[30%] left-[30%] bg-black p-6 rounded-md flex flex-col gap-4 animate-fadeIn">
          <p className=" text-center text-white">
            <b>Incoming Video Call...</b>
          </p>
          <div className=" flex justify-center items-center gap-4">
            <IoIosCall
              size={35}
              onClick={acceptCall}
              className=" bg-green-500 rounded-full p-2 cursor-pointer"
            />
            <RxCross2
              size={35}
              onClick={rejectCall}
              className=" bg-red-500 rounded-full p-2 cursor-pointer"
            />
          </div>
        </div>
      )}

      <div
        style={{
          display: inVideoCall ? "flex" : "none",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{
            width: "150px",
            height: "120px",
            backgroundColor: "#000",
          }}
        />
        <video
          ref={localVideoRef}
          autoPlay
          muted // mute local video to avoid echo
          playsInline
          style={{
            width: "150px",
            height: "120px",
            backgroundColor: "red",
          }}
        />
      </div>

      {/* During call */}
      {inVideoCall && (
        <div className="bg-black p-6 rounded-md flex flex-col gap-4 animate-fadeIn justify-center  items-center">
          <p className="text-center text-white">
            <b>Call in progress</b>
          </p>
          <RxCross2
            size={35}
            onClick={endCall}
            className=" bg-red-500 rounded-lg p-2 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default VideoCallUI;
