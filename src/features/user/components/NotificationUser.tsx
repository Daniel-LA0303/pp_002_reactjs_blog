import React from 'react'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { NotificationReceivedI } from '../types/user';
import NotificationCard from './NotificationCard';

interface NotificationUserProps {
    notifications: NotificationReceivedI[];
}

const NotificationUser: React.FC<NotificationUserProps> = ({ notifications }) => {

    console.log(notifications);


    return (
        <div className="group relative">
            {/* Botón */}
            <button
                className="relative z-10 flex size-10 cursor-pointer items-center justify-center 
               overflow-hidden rounded-full border border-gray-300  
               bg-white text-gray-600 hover:bg-gray-100">

                <NotificationsNoneRoundedIcon fontSize='large' />

                {/* Badge → ahora sí se posiciona sobre el botón */}
                <div
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center 
                 rounded-full bg-red-600 text-[10px] font-bold text-white shadow">
                    {notifications.length}
                </div>
            </button>



            <div
                className="absolute bg-white right-0 top-full mt-2 w-80 origin-top-right scale-95 transform-gpu opacity-0 transition-all duration-200 ease-in-out group-hover:scale-100 group-hover:opacity-100 sm:w-96">

                <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-background-light shadow-lg">

                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                        <h3 className="font-semibold">Notifications</h3>
                        <a className="text-xs font-medium text-primary hover:underline" href="#">Mark all as read</a>
                    </div>

                    <div className="flex flex-col divide-y divide-gray-200">

                        {
                            notifications.map((n, index) => (
                                <NotificationCard
                                    key={n.notificationId ?? index}
                                    {...n}
                                />
                            ))
                        }
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 px-4 py-2 text-center">
                        <a className="w-full text-sm font-semibold text-primary hover:underline" href="#">
                            View All Notifications
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NotificationUser
