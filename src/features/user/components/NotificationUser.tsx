import React, { useEffect, useState } from 'react'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { NotifcationsSSEResponseI, NotificationReceivedI } from '../types/user';
import NotificationCard from './NotificationCard';
import apiAuthClient from '../../../services/config-client/apiAuthClient';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getLink } from '../hooks/functions';

const NotificationUser: React.FC<{ notificationsResponse: NotifcationsSSEResponseI | undefined }> = ({ notificationsResponse }) => {

    // console.log(notifications);
    const userIdAuth = useSelector((state: RootState) => state.auth.userId);
    const [localNotifications, setLocalNotifications] = useState<NotificationReceivedI[]>(notificationsResponse?.notifications ?? []);
    const [numberNotifications, setNumberNotifications] = useState<number>(notificationsResponse?.numberNotifications ?? 0);

    const navigate = useNavigate();

    // const [notificationNotRead, setNotificationsNotRead] = useState
    const handleNotificationClick = async (notification: NotificationReceivedI) => {
        try {
            await apiAuthClient.post(`/notification/mark-read-notification`, {
                notificationId: notification.notificationId,
            });
            setNumberNotifications(prev => (prev ?? 0) - 1);
            navigate(getLink(notification.notificationType, notification.targetId));
        } catch (error) {
            console.error(error);
        }
    };


    const handleMarkAllNotificationsAsRead = async () => {
        console.log("click noti");

        try {
            await apiAuthClient.post(`/notification/mark-all-notification-read`, {
                userId: userIdAuth
            });
            setNumberNotifications(0);
            setLocalNotifications(prev =>
                prev.map(n => ({ ...n, read: true }))
            );
        } catch (error) {
        }
    }
    useEffect(() => {
        if(notificationsResponse?.numberNotifications){ setNumberNotifications(notificationsResponse?.numberNotifications);}
        
        if (notificationsResponse?.notifications) {
            setLocalNotifications(notificationsResponse.notifications);
        }
    }, [notificationsResponse]);

    return (
        <div className="group relative">

            <button
                className="relative z-10 flex size-12 cursor-pointer items-center justify-center 
               overflow-hidden rounded-full  
               bg-white text-gray-600 hover:bg-gray-100">

                <NotificationsNoneRoundedIcon fontSize='large' />

                {numberNotifications === 0 ? null :
                    <div
                        className="absolute z-20 top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow">
                        {notificationsResponse?.numberNotifications}
                    </div>
                }
            </button>


            <div
                className="absolute bg-white right-0 top-full mt-2 w-80 origin-top-right scale-95 transform-gpu opacity-0 transition-all duration-200 ease-in-out group-hover:scale-100 group-hover:opacity-100 sm:w-96">

                <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-background-light shadow-lg">

                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                        <h3 className="font-semibold">Notifications</h3>
                        <button
                            className="text-xs font-medium text-primary hover:underline"
                            onClick={() => handleMarkAllNotificationsAsRead()}
                        >Mark all as read</button>
                    </div>

                    <div className="flex flex-col divide-y divide-gray-200">

                        {
                            localNotifications?.map((n, index) => (
                                <NotificationCard
                                    key={n.notificationId ?? index}
                                    notification={n}
                                    onClickNotification={handleNotificationClick}
                                />
                            ))
                        }
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 px-4 py-2 text-center">
                        <Link
                            to={`/notifications/${userIdAuth}`}
                            className="w-full text-sm font-semibold text-primary hover:underline">
                            View All Notifications
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NotificationUser
