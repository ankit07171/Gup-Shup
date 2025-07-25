import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversation from "../../zustand/useConversation";

const Home = () => {
	const { selectedConversation } = useConversation();

	return (
		<div className="flex h-screen sm:h-[450px] md:h-[550px] w-full m-15 rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg">
			 <div className={`w-full sm:w-[30%] ${selectedConversation ? "hidden sm:block" : "block"}`}>
				<Sidebar />
			</div>

			 <div className={`w-full sm:w-[70%] ${selectedConversation ? "block" : "hidden sm:block"}`}>
				<MessageContainer />
			</div>
		</div>
	);
};

export default Home;
