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

    // chats by user
    const [chatsByUser, setChatsByUser] = useState<ChatUserInfo[]>([]);

    /**
     * TODO: this can be deleted
     */
    // chat selected
    const [chatSelected, setChatSelected] = useState<ChatUserInfo>(); 


    const getChatsByUser = async () => {

        try {
            setLoading(true);
            const res = await apiAuthClient.get(`/v1/chats`);

            const response: ChatUserInfo[] = res.data.map((chat: any) => ({
                chatId: chat.id,
                lastMessage: chat.lastMessage,
                lastMessageTime: chat.lastMessageTime,
                name: chat.name,
                receiverId: chat.receiverId,
                senderId: chat.senderId,
                recipientOnline: chat.isRecipientOnline,
                unreadCount: chat.unreadCount
            }));

            // Usar response
            setChatsByUser(response);
            console.log(res);

        } catch (error) {
            console.log(error);
        } finally {
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
                setChatsByUser,
                chatSelected,
                setChatSelected

            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export { ChatProvider };
export default ChatContext;
export const useChat = () => useContext(ChatContext);