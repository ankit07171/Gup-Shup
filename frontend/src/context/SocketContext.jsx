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

  const socket = io("https://gup-shup-n120zrt1u-ankit07171s-projects.vercel.app/", {
    query: {
      userId: authUser._id,
    },
  });

  setSocket(socket);

  socket.on("getOnlineUsers", (users) => {
    setOnlineUsers(users);
  }); 

  return () => socket.disconnect();
}, [authUser]);

return (
  <SocketContext.Provider value={{ socket, onlineUsers }}>
    {children}
  </SocketContext.Provider>
);
}

