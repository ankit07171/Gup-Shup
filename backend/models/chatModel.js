import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    default: [],
  }]
},
{timestamps:true}
);

const chat = mongoose.model("chat",chatSchema);
export default chat;
