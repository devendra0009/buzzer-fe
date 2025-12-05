import Stomp, { Client } from "stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { BASE_URI_SOCKET } from "../config/config";

const useVideoCall = ({ groupId, userId }) => {
  const stompRef = useRef<Client | null>(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);

  const [inVideoCall, setInVideoCall] = useState(false);

  const [incomingOffer, setIncomingOffer] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const [localStream, setLocalStream] = useState(null); // <-- added for local preview
  const pendingCandidatesRef = useRef([]);

  const handleSignal = async (payload) => {
    // console.log("payload: " + JSON.parse(payload));

    switch (payload.type) {
      case "OFFER":
        setIncomingOffer(payload);
        break;

      case "ANSWER":
        await pcRef.current?.setRemoteDescription(
          new RTCSessionDescription(payload.answer)
        );

        pendingCandidatesRef.current.forEach((c) =>
          pcRef.current.addIceCandidate(c)
        );
        pendingCandidatesRef.current = [];
        break;

      case "ICE":
        if (payload.candidate) {
          // await pcRef.current?.addIceCandidate(payload.candidate);

          const pc = pcRef.current;

          if (!pc || !pc.remoteDescription) {
            console.log("Queueing ICE candidate");
            pendingCandidatesRef.current.push(payload.candidate);
          } else {
            console.log("Adding ICE candidate immediately");
            await pc.addIceCandidate(payload.candidate);
          }
        }
        break;

      case "END":
        endCallLocal();
        break;

      default:
        break;
    }
  };

  // open a socket connection
  useEffect(() => {
    const socket = new SockJS(BASE_URI_SOCKET);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log("Connected to signaling");

      // Subscribe to server queue: /calling/{groupId}
      stompClient.subscribe(`/calling/video${groupId}`, (msg) => {
        const payload = JSON.parse(msg.body);
        console.log("SIGNALING RECEIVED:", payload);
        handleSignal(payload);
      });
    });

    stompRef.current = stompClient;

    return () => {
      stompRef.current?.disconnect();
      cleanup();
    };
    // eslint-disable-next-line
  }, [groupId]);

  const getLocalStream = async () => {
    if (localStreamRef.current) return localStreamRef.current;

    console.log(navigator.mediaDevices, "nvg");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support audio capture!");
      return null;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      localStreamRef.current = stream;
      setLocalStream(stream);
      return stream;
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone. Check permissions.");
      return null;
    }
  };

  // send the signal to websocket for receivers to receive
  const signalServer = (payload) => {
    stompRef?.current.send(
      `/app/call/video/${groupId}`,
      {},
      JSON.stringify(payload)
    );
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        // {
        //   urls: "turn:192.168.0.103:3478",
        //   username: "testuser",
        //   credential: "testpass",
        // },
      ],
    });

    // Send ICE candidates to peer
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        signalServer({
          type: "ICE",
          from: userId,
          candidate: event.candidate,
        });
      }
    };

    // When remote audio arrives
    pc.ontrack = (event) => {
      console.log("REMOTE STREAM RECEIVED");
      setRemoteStream(event.streams?.[0]);
    };

    return pc;
  };

  const startVideoCall = async (peerUserId) => {
    // debugger
    const stream = await getLocalStream();
    pcRef.current = createPeerConnection();

    stream.getTracks().forEach((t) => pcRef.current.addTrack(t, stream));

    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);

    signalServer({
      type: "OFFER",
      from: userId,
      to: peerUserId,
      offer,
    });

    setInVideoCall(true);
  };

  const acceptCall = async () => {
    if (!incomingOffer) return;

    const stream = await getLocalStream();
    pcRef.current = createPeerConnection();

    stream.getTracks().forEach((t) => pcRef.current.addTrack(t, stream));

    await pcRef.current.setRemoteDescription(
      new RTCSessionDescription(incomingOffer.offer)
    );

    pendingCandidatesRef.current.forEach((c) =>
      pcRef.current.addIceCandidate(c)
    );
    pendingCandidatesRef.current = [];

    const answer = await pcRef.current.createAnswer();
    await pcRef.current.setLocalDescription(answer);

    signalServer({
      type: "ANSWER",
      from: userId,
      to: incomingOffer.from,
      answer,
    });

    setIncomingOffer(null);
    setInVideoCall(true);
  };

  const rejectCall = () => {
    // setIncomingOffer(null);
    endCall();
  };

  const endCall = () => {
    signalServer({ type: "END", from: userId });
    endCallLocal();
  };

  const endCallLocal = () => {
    cleanup();
    setInVideoCall(false);
    setIncomingOffer(null);
  };

  const cleanup = () => {
    try {
      pcRef.current?.close();
    } catch {}
    pcRef.current = null;

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }

    setRemoteStream(null);
    setLocalStream(null);
  };

  return {
    inVideoCall,
    incomingOffer,
    remoteStream,
    localStream,

    startVideoCall,
    acceptCall,
    rejectCall,
    endCall,
  };
};

export default useVideoCall;
