import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessageHandler = async (req, res) => {
  try {
    const { message } = req.body;
    const { userId: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      sender_id: senderId,
      receiver_id: receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Socket IO

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(200).json({ message: newMessage });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMessagesHandler = async (req, res) => {
  try {
    const { userId } = req.params; // User ID of the other user
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userId],
      },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
