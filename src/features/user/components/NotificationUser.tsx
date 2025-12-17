import React, { useEffect, useRef, useState } from 'react'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { NotifcationsSSEResponseI, NotificationReceivedI } from '../types/user';
import NotificationCard from './NotificationCard';
import apiAuthClient from '../../../services/config-client/apiAuthClient';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getLink } from '../hooks/functions';

const NotificationUser: React.FC<{ notificationsResponse: NotifcationsSSEResponseI | undefined }> = ({ notificationsResponse }) => {

    const userIdAuth = useSelector((state: RootState) => state.auth.userId);
    const [localNotifications, setLocalNotifications] = useState<NotificationReceivedI[]>(notificationsResponse?.notifications ?? []);
    const [numberNotifications, setNumberNotifications] = useState<number>(notificationsResponse?.numberNotifications ?? 0);
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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
        try {
            await apiAuthClient.post(`/notification/mark-all-notification-read`, {
                userId: userIdAuth
            });
            setNumberNotifications(0);
            setLocalNotifications(prev =>
                prev.map(n => ({ ...n, read: true }))
            );
        } catch (error) {
            console.error(error);
        }
    }

    // click outside space notifications
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    useEffect(() => {
        if (notificationsResponse?.numberNotifications) {
            setNumberNotifications(notificationsResponse?.numberNotifications);
        }

        if (notificationsResponse?.notifications) {
            setLocalNotifications(notificationsResponse.notifications);
        }
    }, [notificationsResponse]);

    const toggle = () => setOpen((prev: any) => !prev);

    return (
        <div
            ref={menuRef} 
            className="relative bg-white text-gray-600 ">
            <button
                onClick={toggle}
                className="relative rounded-full p-2 hover:bg-slate-100"
            >
                <NotificationsNoneOutlinedIcon sx={{ fontSize: 28 }} />
                {numberNotifications !== 0 && (
                    <div className="absolute z-20 top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow">
                        {notificationsResponse?.numberNotifications}
                    </div>
                )}
            </button>

            {/** Dropdown */}
            <div
                className={`
                    absolute right-0 top-12 z-10
                    min-w-[20rem]
                    rounded-md border bg-white
                    transition-all duration-200 ease-out
                    ${open
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }
                `}
            >
                <div className="flex flex-col overflow-hidden border border-gray-200 bg-background-light shadow-lg">
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                        <h3 className="font-semibold">Notifications</h3>
                        <button
                            className="text-xs font-medium text-primary hover:underline"
                            onClick={handleMarkAllNotificationsAsRead}
                        >
                            Mark all as read
                        </button>
                    </div>

                    <div className="flex flex-col divide-y divide-gray-200">
                        {localNotifications?.map((n, index) => (
                            <NotificationCard
                                key={n.notificationId ?? index}
                                notification={n}
                                onClickNotification={handleNotificationClick}
                            />
                        ))}
                    </div>

                    <div className="border-t border-gray-200 px-4 py-2 text-center">
                        <Link
                            to={`/notifications/${userIdAuth}`}
                            className="w-full text-sm font-semibold text-primary hover:underline"
                        >
                            View All Notifications
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationUser;
