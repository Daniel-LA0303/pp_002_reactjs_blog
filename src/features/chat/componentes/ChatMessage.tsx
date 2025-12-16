import { MessageResponseDTO } from './../types/message';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { DoneAllOutlined } from '@mui/icons-material';

interface ChatMessageProps {
    message: MessageResponseDTO;
}
// componete message
const ChatMessage = ({ message }: ChatMessageProps) => {

    const userIdAuth = useSelector((state: RootState) => state.auth.userId);
    const isSelfMessage = message.senderId === userIdAuth;

    return (

        <div className={`flex gap-3 max-w-[80%] ${isSelfMessage ? 'self-end flex-row-reverse' : ''}`}>
            {!isSelfMessage && (
                <div className="bg-center bg-no-repeat bg-cover rounded-full h-8 w-8 self-end mb-1" data-alt="Portrait of a young woman with glasses smiling" style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxTsgul7wL3rc83AmKyY1wZl3nRUPpH6BQKzk3TZma53kpn0nWjEM00eSSMe9y1HYtrW3Fi0MLOJmV5iULwt7Ae0wH4bzbdMpOYGkQyQbLmph9iJgN_RVk1e40rP_fNBkmKhJ2lkkB6Bjlx2hysGxZ-fke3wT3QXi2vo9AxRuYYbb0YSKpF_97Gfe1jL15cXRRYIRugaiWMOVzRY0w5vG82eW-EiL0OuyMgXmenc12KEd76uzvW3OG7ZOV39rfkrDRaGIRPzpaf9yf")'
                }}></div>
            )}

            <div className={`flex flex-col gap-1 ${isSelfMessage ? 'items-end' : ''}`}>
                <div className={`
                    p-4 rounded-2xl shadow-sm border border-transparent
                    ${isSelfMessage
                                    ? 'bg-blue-500 text-white rounded-br-sm'
                                    : 'bg-white text-[#0d171b] rounded-bl-sm'
                                }
                    `}
                >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <div className={`flex items-center gap-1 ${isSelfMessage ? 'pr-1 flex-row-reverse' : 'pl-1'}`}>
                    <span className="text-[#4c809a] text-[10px]">
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {isSelfMessage && (
                        <span className="material-symbols-outlined text-[14px] text-blue-500">
                            {message.state === 'SEEN' ? <DoneAllOutlined fontSize='small'/> : <DoneAllOutlined fontSize='small'/>}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatMessage
