import React from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { convertTime } from "../../utils/convertTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const isMe = message.sender_id === authUser._id;
  const chatClassName = isMe ? "chat-end" : "chat-start";
  const profilePic = isMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = isMe ? "bg-blue-500" : "";
  const formattedTime = convertTime(message.createdAt);
  const isShake = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounderd-full">
          <img src={profilePic} alt="" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${isShake} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
