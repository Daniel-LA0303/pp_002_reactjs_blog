
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export const useNotificationHelpers = (notification: { read: boolean }) => {

    const getIcon = (value: string) => {
        switch (value) {
            case 'LIKE':
                return <FavoriteBorderIcon />;
            case 'FOLLOW':
                return <PersonAddAltOutlinedIcon />;
            case 'COMMENT':
            case 'REPLY':
                return <ChatBubbleOutlineIcon />;
            default:
                return <NotificationsNoneIcon />;
        }
    };

    const getClass = (value: string) => {
        const isRead = notification.read;

        switch (value) {
            case 'LIKE':
                return isRead ? 'bg-red-50 text-red-500' : 'bg-red-400';
            case 'FOLLOW':
            case 'COMMENT':
            case 'REPLY':
                return isRead ? 'bg-blue-50 text-blue-500' : 'bg-blue-400';
            default:
                return "";
        }
    };

    const getLink = (value: string, id: number) => {
        switch (value) {
            case 'LIKE':
            case 'COMMENT':
            case 'REPLY':
                return `/view-blog/${id}`;
            case 'FOLLOW':
                return `/profile/${id}`;
            default:
                return "/";
        }
    };

    return { getIcon, getClass, getLink };
};
