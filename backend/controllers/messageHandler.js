import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverID } = req.params;
    const senderID = req.user._id;

    let chat = await Chat.findOne({
      participants: { $all: [senderID, receiverID] },
    });
    if (!chat) {
      chat = await Chat.create({
        participants: [senderID, receiverID],
      });
    }

    const newMessage = await new Message({
      senderID,
      receiverID,
      message,
    }).save();

    if (newMessage) {
      chat.messages.push(newMessage._id);
    }
    await chat.save();

    const receiverSocketId = getReceiverSocketId(receiverID);
     
if (receiverSocketId) {
  io.to(receiverSocketId).emit("newMessage", newMessage);
}

res.status(201).json(newMessage);

  } catch (error) {
    res.status(500).json({ "Error is send Msg": error });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderID = req.user._id;

    const conversation = await Chat.findOne({
      participants: { $all: [senderID, userToChatId] },
    }).populate({
  path: "messages",
  options: { sort: { createdAt: -1 }, limit: 50 } // only latest 50 messages
})
.lean();


    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("❌ Error in getMessages controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
