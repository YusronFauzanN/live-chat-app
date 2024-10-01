import {
  getMessagesHandler,
  sendMessageHandler,
} from "../services/message.service.js";

export const sendMessage = async (req, res) => {
  await sendMessageHandler(req, res);
};

export const getMessages = async (req, res) => {
  await getMessagesHandler(req, res);
};
