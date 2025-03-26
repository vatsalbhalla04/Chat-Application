import { useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSocket } from '../../socket';
import { VIDEO_CALL_STARTED, VIDEO_CALL_ENDED } from '../../constants/events';

const VideoCall = () => {
  const { chatId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const socket = getSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const members = JSON.parse(localStorage.getItem(`chat_${chatId}_members`) || '[]');
    socket.emit(VIDEO_CALL_STARTED, { chatId, members });

    return () => {
      const members = JSON.parse(localStorage.getItem(`chat_${chatId}_members`) || '[]');
      socket.emit(VIDEO_CALL_ENDED, { chatId, members });
    };
  }, [chatId, socket]);

  const myMeeting = async (element) => {
    const appID = 1775416645;
    const serverSecret = "52cc068648cd00af9c50f84b6560c5b9";
    
    const roomID = chatId;
    const userID = user?._id || "guest";
    const userName = user?.name || "Guest";
    
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Copy Link',
          url: `${window.location.origin}/chat/${chatId}/call`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showScreenSharingButton: true,
      showPreJoinView: true,
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 10,
      layout: "Gallery",
      showLayoutButton: true,
      onLeaveRoom: () => {
        window.close();
      }
    });
  };

  return (
    <div
      ref={myMeeting}
      style={{ 
        width: '100%', 
        height: '100vh',
        backgroundColor: '#1a1a1a'
      }}
    />
  );
};

export default VideoCall; 