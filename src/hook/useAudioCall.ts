import Stomp, { Client } from "stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { BASE_URI_SOCKET } from "../config/config";

const useAudioCall = ({ groupId, userId }) => {
  const stompRef = useRef<Client | null>(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);

  const [inCall, setInCall] = useState(false);

  const [incomingOffer, setIncomingOffer] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const pendingCandidatesRef = useRef([]);

  console.log(pcRef, "pcref");
  console.log(localStreamRef, "localStreamRef");

  useEffect(() => {
    const socket = new SockJS(BASE_URI_SOCKET);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log("Connected to signaling");

      // Subscribe to server queue: /calling/{groupId}
      stompClient.subscribe(`/calling/audio${groupId}`, (msg) => {
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

  // ------------------------
  // Send signaling payload
  // ------------------------
  const signalServer = (payload) => {
    stompRef?.current.send(
      `/app/call/audio/${groupId}`,
      {},
      JSON.stringify(payload)
    );
  };

  // ------------------------
  // 2. Create PeerConnection
  // ------------------------
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

  const getLocalStream = async () => {
    if (localStreamRef.current) return localStreamRef.current;
    // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // localStreamRef.current = stream;
    // return stream;

    console.log(navigator.mediaDevices, "nvg");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support audio capture!");
      return null;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;
      return stream;
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone. Check permissions.");
      return null;
    }
  };

  // ------------------------
  // Handle incoming signaling messages
  // ------------------------
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

  // ------------------------
  // 3. Caller Starts Call
  // ------------------------
  const startCall = async (peerUserId) => {
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

    setInCall(true);
  };
  // ------------------------
  // 4. Receiver Accepts Call
  // ------------------------
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
    setInCall(true);
  };

  const rejectCall = () => {
    setIncomingOffer(null);
  };

  // ------------------------
  // End Call
  // ------------------------
  const endCall = () => {
    signalServer({ type: "END", from: userId });
    endCallLocal();
  };

  const endCallLocal = () => {
    cleanup();
    setInCall(false);
    setIncomingOffer(null);
  };

  // Cleanup streams + pc
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
  };

  return {
    inCall,
    incomingOffer,
    remoteStream,

    startCall,
    acceptCall,
    rejectCall,
    endCall,
  };
};

export default useAudioCall;
