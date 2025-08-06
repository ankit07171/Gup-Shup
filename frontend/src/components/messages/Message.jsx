import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();

	if (!authUser) return null;

	const fromMe = message.senderID === authUser._id;
	const formattedTime = extractTime(message.createdAt);

	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe
		? authUser.profilePic
		: selectedConversation?.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

	const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-700";
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img src={profilePic} alt="profile" />
				</div>
			</div>

			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
				{typeof message.message === "string"
					? message.message
					: JSON.stringify(message.message)}
			</div>

			<div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
				{formattedTime}
			</div>
		</div>
	);
};

export default Message;
