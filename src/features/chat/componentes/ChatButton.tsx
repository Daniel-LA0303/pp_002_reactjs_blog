
/**
 * icons
 */
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';

const ChatButton = () => {

    const navigate = useNavigate();

    return (
        <div
            className='p-4 hover:bg-slate-100 rounded-full cursor-pointer h-10 w-10 flex justify-center items-center'
            onClick={() => navigate(`/chat`)}
        >
            <ChatBubbleOutlineIcon sx={{ fontSize: 22 }}/>
        </div>
    )
}


export default ChatButton
