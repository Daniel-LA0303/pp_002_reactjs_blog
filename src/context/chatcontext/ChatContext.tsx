import { createContext, ReactNode, useContext, useState } from "react";
import apiAuthClient from "../../services/config-client/apiAuthClient";
import { ChatUserInfo } from "../../features/chat/types/chat";

interface ChatProviderProps {
    children: ReactNode;
}

const ChatContext = createContext<any>(null);

const ChatProvider = ({ children }: ChatProviderProps) => {

    // states
    const [loading, setLoading] = useState<boolean>(false);
    const [chatsByUser, setChatsByUser] = useState<ChatUserInfo[]>([]);


    const getChatsByUser = async () => {

        try {
            setLoading(true);
            const res = await apiAuthClient.get(`/v1/chats`);
            setChatsByUser(res.data);
            console.log(res);
            
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }

    }


    return (
        <ChatContext.Provider
            value={{
                loading,
                setLoading,
                getChatsByUser,
                chatsByUser,
                setChatsByUser
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export { ChatProvider };
export default ChatContext;
export const useChat = () => useContext(ChatContext);