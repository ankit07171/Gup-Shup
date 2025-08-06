import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages(); 
	
	useListenMessages();
	const lastMessageRef = useRef(null);

	useEffect(() => {
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<div className='px-4 py-2 flex-1 overflow-auto space-y-2'>
			{loading &&
				[...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!loading && messages.length === 0 && (
				<p className='text-center text-gray-400'>
					Send a message to start the conversation
				</p>
			)}

			{!loading &&
				messages.map((message, idx) => {
					const isLast = idx === messages.length - 1;
					return (
						<div 
						key={message._id} 
						ref={isLast ? lastMessageRef : null}>
							<Message message={message} />
						</div>
					);
				})}
		</div>
	);
};

export default Messages;
