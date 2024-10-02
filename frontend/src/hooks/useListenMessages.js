import { useEffect } from "react";
import useConversation from "../zustand/useConversation.js";
import { useSocketContext } from "../context/SocketContext";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const audio = new Audio(notificationSound);
      audio.play();
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
