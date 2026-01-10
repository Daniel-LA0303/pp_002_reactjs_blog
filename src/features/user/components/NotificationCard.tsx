import React from 'react'
import { NotificationReceivedI } from '../types/user'
import { timeAgo } from '../../../utils/dateUtils'

interface NotificationCardProps {
    notification: NotificationReceivedI;
    onClickNotification: (notification: NotificationReceivedI) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onClickNotification }) => {

    // const { getIcon, getClass, getLink } = useNotificationHelpers(notification);

    return (
        <div
            onClick={() => onClickNotification(notification)} 
            className={`${notification?.read ? "bg-white text-black hover:bg-slate-100" : "bg-blue-500 text-white hover:bg-blue-400"} flex cursor-pointer items-center gap-4 p-4  justify-between transition-colors `}>
            <div className="flex items-center gap-4">
                <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 shrink-0"
                    style={{
                        backgroundImage: `url(${notification?.notificationUserInfo?.profileImage ? notification?.notificationUserInfo?.profileImage : '/avatar.png'})`
                    }}
                ></div>

                <div className="flex flex-col justify-center">
                    <p className="text-sm font-medium leading-normal line-clamp-1">{notification?.notificationType}</p>
                    <p className="text-sm font-normal leading-normal line-clamp-2">
                        {notification?.content}
                    </p>
                </div>
            </div>

            <div className="shrink-0 text-right">
                <p className=" text-xs font-normal leading-normal">
                    {timeAgo(notification?.createdAt)}
                </p>
            </div>
        </div>
    )
}

export default NotificationCard;
