import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
	if (!authUser?._id) return;  
	const socket = io("http://localhost:1145", {
		query: {
			userId: authUser._id,
		},
	});

	setSocket(socket);

	socket.on("getOnlineUsers", (users) => {
		setOnlineUsers(users);
	});

	return () => socket.close();
}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
