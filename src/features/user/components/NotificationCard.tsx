import React from 'react'
import { NotificationReceivedI } from '../types/user'
import { timeAgo } from '../../../utils/dateUtils'

const NotificationCard : React.FC<NotificationReceivedI>= (notification) => {
    return (
        <div className="flex cursor-pointer items-center gap-4 p-4 min-h-[72px] justify-between transition-colors hover:bg-blue-500 hover:text-white">
            <div className="flex items-center gap-4">
                <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 shrink-0"
                    style={{
                        backgroundImage: `url(${notification?.notificationUserInfo?.profileImage ? notification?.notificationUserInfo?.profileImage : '/avatar.png'})`
                    }}
                ></div>

                <div className="flex flex-col justify-center">
                    <p className="text-sm font-medium leading-normal line-clamp-1">{notification.notificationType}</p>
                    <p className="text-sm font-normal leading-normal line-clamp-2">
                        {notification.content}
                    </p>
                </div>
            </div>

            <div className="shrink-0 text-right">
                <p className=" text-xs font-normal leading-normal">
                    {timeAgo(notification.createdAt)}
                </p>
            </div>
        </div>
    )
}

export default NotificationCard
