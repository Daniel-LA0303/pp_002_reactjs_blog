

import { useChat } from '../../../context/chatcontext/ChatContext';
import apiAuthClient from '../../../services/config-client/apiAuthClient';
import { ChatUserInfo, UserSearchChatDTO } from '../types/chat';
import { useNavigate } from 'react-router-dom';

interface UserToChatCardProps {
    user: UserSearchChatDTO;
    onClick: () => void;
}

const ChatUserToSearch = ({ user, onClick }: UserToChatCardProps) => {
    const navigate = useNavigate();

    const { setChatsByUser, chatsByUser } = useChat();

    const handleClick = async () => {
        try {
            const res = await apiAuthClient.post(`/v1/chats?receiver-id=${user.userId}`);
            const newChat: ChatUserInfo = res.data;

            console.log("Respuesta del backend:", newChat);

            // Esperar un momento si es necesario
            await new Promise(resolve => setTimeout(resolve, 50));

            const chatId = res.data.id;

            // Actualizar lista
            const chatExists = chatsByUser.some((chat: any) => chat.chatId === chatId);
            if (!chatExists && chatId) {
                setChatsByUser((prev: any) => [{ ...newChat, chatId: chatId }, ...prev]);
            }

            // Navegar
            navigate(`/chat/${chatId}`);
            onClick();

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
        >
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {user.profileImage ? (
                        <img src={user.profileImage} alt={user.username} className="w-full h-full rounded-full" />
                    ) : (
                        user.username?.charAt(0) || 'U'
                    )}
                </div>
                <div className="ml-3">
                    <h3 className="font-medium">{user.username}</h3>
                    {/* <h3 className="font-medium">{user.username}</h3> */}
                    <p className="text-sm text-gray-500">Start a conversation</p>
                </div>
            </div>
        </div>
    );
}

export default ChatUserToSearch
