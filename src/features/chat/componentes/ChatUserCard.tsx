import { ChatUserInfo } from '../types/chat';
import { timeAgo } from '../../../utils/dateUtils';
import { useChat } from '../../../context/chatcontext/ChatContext';
import { useNavigate } from 'react-router-dom';

interface ChatUserCardProps {
    chat: ChatUserInfo;
}

const ChatUserCard = ({ chat }: ChatUserCardProps) => {

    const navigate = useNavigate();

    const { setChatSelected } = useChat();

    // to link and get message then
    const handleClick = () => {
        setChatSelected(chat);
        navigate(`/chat/${chat.chatId}`);
    };

    return (
        <div onClick={handleClick}>
            <div className="cursor-pointer border-l-[3px] border-primary bg-blue-500/5 transition-colors">
                <div className="flex items-center gap-4 px-4 py-3 justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="relative shrink-0">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12" data-alt="Portrait of a young woman with glasses smiling"
                                style={{
                                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxTsgul7wL3rc83AmKyY1wZl3nRUPpH6BQKzk3TZma53kpn0nWjEM00eSSMe9y1HYtrW3Fi0MLOJmV5iULwt7Ae0wH4bzbdMpOYGkQyQbLmph9iJgN_RVk1e40rP_fNBkmKhJ2lkkB6Bjlx2hysGxZ-fke3wT3QXi2vo9AxRuYYbb0YSKpF_97Gfe1jL15cXRRYIRugaiWMOVzRY0w5vG82eW-EiL0OuyMgXmenc12KEd76uzvW3OG7ZOV39rfkrDRaGIRPzpaf9yf")'
                                }}
                            ></div>
                            <div className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-surface-light dark:border-surface-dark"></div>
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                            <p className="text-[#0d171b] text-sm font-semibold leading-tight truncate">{chat.name}</p>
                            <p className="text-blue-500 text-xs font-medium leading-normal truncate">{chat.lastMessage}</p>
                        </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                        <p className="text-[#4c809a] text-xs font-normal">{chat.lastMessageTime ? timeAgo(chat.lastMessageTime) : "No messages"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatUserCard
