import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation, clearConversation } = useConversation();
	const { authUser } = useAuthContext();

	useEffect(() => {
		// Clean up selected conversation on unmount
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='flex flex-col w-full h-screen sm:h-full'>
 
			{selectedConversation && (
				<div className='sm:hidden p-2 bg-slate-700'>
					<button onClick={clearConversation} className='text-blue-400 font-semibold text-sm'>
						← Back to chats
					</button>
				</div>
			)}
 
			{!selectedConversation ? (
				<NoChatSelected authUser={authUser} />
			) : (
				<>
					{/* Chat Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
 
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};

export default MessageContainer;

// 🧊 Empty chat view
const NoChatSelected = ({ authUser }) => (
	<div className='flex items-center justify-center w-full h-full'>
		<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
			<p>Welcome 👋 {authUser?.fullName} ❄</p>
			<p>Select a chat to start messaging</p>
			<TiMessages className='text-3xl md:text-6xl text-center' />
		</div>
	</div>
);
