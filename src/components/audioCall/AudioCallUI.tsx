import React, { useEffect } from "react";
import useAudioCall from "../../hook/useAudioCall";
import { MdAddCall } from "react-icons/md";

const AudioCallUI = ({ groupId, fromUser, toUser }) => {
  const {
    inCall,
    incomingOffer,
    remoteStream,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
  } = useAudioCall({ groupId, userId: fromUser });

  console.log(incomingOffer, "inc");

  const remoteAudioRef = React.useRef(null);

  useEffect(() => {
    console.log(remoteStream, "remaudref2inscheck");
    console.log(remoteAudioRef.current, "remaudref2inscheck");
    console.log(remoteStream && remoteAudioRef.current, "remaudref2inscheck");

    if (remoteStream && remoteAudioRef.current) {
      console.log(remoteStream, "remaudref2ins");
      console.log(remoteAudioRef.current.srcObject, "remaudref1insbef");

      remoteAudioRef.current.srcObject = remoteStream;
      console.log(remoteAudioRef.current.srcObject, "remaudref1insaft");
    }
  }, [remoteStream]);
  console.log(remoteAudioRef, "remaudref1");
  console.log(remoteStream, "remaudref2");

  return (
    <div>
      {!inCall && !incomingOffer && (
        <MdAddCall
          size={23}
          onClick={() => startCall(toUser)}
          className=" cursor-pointer"
        />
      )}

      {/* Incoming Call */}
      {incomingOffer && incomingOffer?.from != fromUser && (
        <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-gray-100 shadow-md w-full max-w-xs">
          <p className="text-lg font-semibold text-gray-800">
            Incoming Call...
          </p>

          <div className="flex gap-4">
            <button
              onClick={acceptCall}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Accept
            </button>

            <button
              onClick={rejectCall}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      <audio
        ref={remoteAudioRef}
        autoPlay
        playsInline
        // srcObject={remoteStream}
        // hidden={!remoteStream}
        style={{ display: "none" }}
      />

      {/* During call */}
      {inCall && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center animate-fadeIn">
            <p className="text-lg font-semibold mb-4 text-gray-800">
              Call in Progress
            </p>

            <button
              onClick={endCall}
              className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioCallUI;
