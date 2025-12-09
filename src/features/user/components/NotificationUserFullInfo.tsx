import React from 'react'

/**
 * icons
 */
import { NotificationReceivedI } from '../types/user';
import { timeAgo } from '../../../utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import apiAuthClient from '../../../services/config-client/apiAuthClient';
import { useNotificationHelpers } from '../hooks/useNotificationHelpers';


const NotificationUserFullInfo: React.FC<NotificationReceivedI> = (notification) => {

    // const userIdAuth = useSelector((state: RootState) => state.auth.userId);
    const { getIcon, getClass, getLink } = useNotificationHelpers(notification);

    const navigate = useNavigate();

    const markAsReadNotification = async () => {
        try {

            const response = await apiAuthClient.post(`/notification/mark-read-notification`,
                {
                    "notificationId": notification.notificationId
                }
            );
            console.log(response);
            navigate(getLink(notification.notificationType, notification.targetId));

        } catch (error) {

        }
    }

    return (
        <div
            onClick={() => markAsReadNotification()}
            className="my-5 block shadow-lg">
            <div className={`
                ${notification.read ? 'bg-white/50' : 'bg-blue-500 text-white'}
                flex w-full cursor-pointer items-start gap-4 rounded-lg p-4 shadow-sm ring-1 ring-gray-200 transition-colors duration-200`}>
                <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getClass(notification.notificationType)}`}>
                    <span className="material-symbols-outlined">
                        {getIcon(notification.notificationType)}
                    </span>
                    <img
                        src={notification.notificationUserInfo?.profileImage || "/avatar.png"}
                        alt="avatar"
                        className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full shadow-sm"
                    />
                </div>

                <div className="flex-grow">
                    <p className="text-sm">
                        {notification.content}
                    </p>
                    <p className={`text-xs mt-1 ${notification.read ? 'text-gray-500' : 'text-white/50'}`}>{timeAgo(notification.createdAt)}</p>
                </div>
                <div className="shrink-0 pt-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                </div>
            </div>
        </div>
    )
}

export default NotificationUserFullInfo
