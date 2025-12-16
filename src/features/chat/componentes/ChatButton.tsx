
/**
 * icons
 */
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';

const ChatButton = () => {

    const navigate = useNavigate();

    return (
        <div
            className='p-4 hover:bg-slate-100 rounded-full cursor-pointer'
            onClick={() => navigate(`/chat`)}
        >
            <ChatBubbleOutlineIcon />
        </div>
    )
}


export default ChatButton
