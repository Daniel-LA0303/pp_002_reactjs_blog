import { createContext, ReactNode, useContext, useRef, useState } from "react";
import apiAuthClient from "../../services/config-client/apiAuthClient";
import { ChatUserInfo } from "../../features/chat/types/chat";
import { MessageResponseDTO } from "../../features/chat/types/message";

interface ChatProviderProps {
    children: ReactNode;
}

const ChatContext = createContext<any>(null);

const ChatProvider = ({ children }: ChatProviderProps) => {

    // states
    const [loading, setLoading] = useState<boolean>(false);

    // chats by user
    const [chatsByUser, setChatsByUser] = useState<ChatUserInfo[]>([]);

    const [chatsSearch, setChatsSearch] = useState<ChatUserInfo[]>([]);

    // messages chat active
    const [messages, setMessages] = useState<MessageResponseDTO[]>([]);

    // ref to chat active
    const activeChatIdRef = useRef<string | null>(null);

    /**
     * TODO: this can be deleted
     */
    // chat selected
    const [chatSelected, setChatSelected] = useState<ChatUserInfo>();

    // uodate state messages
    const onIncomingMessage = (message: MessageResponseDTO) => {
        setMessages(prev => {
            if (prev.some(m => m.id === message.id)) return prev;
            return [...prev, message];
        });
    };

    // to get active chat
    const setActiveChat = (chatId: string | null) => {
        activeChatIdRef.current = chatId;
    };


    const handleNotification = (notification: any) => {

        // return if there is no a notification
        if (!notification) return;

        // extract data
        const {
            chatId,
            type,
            messageType,
            content,
            senderId,
            receiverId,
            media,
            chatName
        } = notification;

        // get chat to show notification in messages or card user
        const isActiveChat = activeChatIdRef.current === chatId;

        // if chat is active with chatid, then we pdate messages
        if (isActiveChat) {
            if (type === 'MESSAGE') {
                const message = {
                    senderId,
                    receiverId,
                    content,
                    type: messageType,
                    media,
                    createdAt: new Date().toISOString()
                };

                // update list of messages
                setMessages((prev: any) => [...prev, message]);

                // update data if message type is image
                setChatsByUser(prev =>
                    prev.map(c =>
                        c.chatId === chatId
                            ? {
                                ...c,
                                lastMessage: messageType === 'IMAGE' ? 'Attachment' : content,
                                lastMessageTime: new Date().toISOString(),
                                unreadCount: 0
                            }
                            : c
                    )
                );
            }

            return;
        }

        // if chat is not active
        setChatsByUser(prev => {

            // find chat
            const chatIndex = prev.findIndex(c => c.chatId === chatId);

            // update last message only if is IMAGE
            if (chatIndex !== -1 && type === 'MESSAGE') {
                const updated = [...prev];
                const chat = updated[chatIndex];

                updated[chatIndex] = {
                    ...chat,
                    lastMessage: messageType === 'IMAGE' ? 'Attachment' : content,
                    lastMessageTime: new Date().toISOString(),
                    unreadCount: (chat.unreadCount || 0) + 1
                };

                return updated;
            }

            // update last message
            if (type === 'MESSAGE') {
                return [
                    {
                        chatId,
                        senderId,
                        receiverId,
                        lastMessage: content,
                        name: chatName,
                        unreadCount: 1,
                        lastMessageTime: new Date().toISOString(),
                        recipientOnline: false
                    },
                    ...prev
                ];
            }

            return prev;
        });
    };




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
                setChatSelected,
                chatsSearch,
                setChatsSearch,
                setMessages,
                messages,
                onIncomingMessage,
                handleNotification,
                setActiveChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export { ChatProvider };
export default ChatContext;
export const useChat = () => useContext(ChatContext);