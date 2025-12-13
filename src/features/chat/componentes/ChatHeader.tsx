import React from 'react'

/**
 * icons
 */
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const ChatHeader = () => {
    return (
        <div className="flex items-center justify-between px-6 py-3 border-b border-border-light bg-surface-light/80/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-3">
                <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 shadow-sm" data-alt="Portrait of a young woman with glasses smiling" style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxTsgul7wL3rc83AmKyY1wZl3nRUPpH6BQKzk3TZma53kpn0nWjEM00eSSMe9y1HYtrW3Fi0MLOJmV5iULwt7Ae0wH4bzbdMpOYGkQyQbLmph9iJgN_RVk1e40rP_fNBkmKhJ2lkkB6Bjlx2hysGxZ-fke3wT3QXi2vo9AxRuYYbb0YSKpF_97Gfe1jL15cXRRYIRugaiWMOVzRY0w5vG82eW-EiL0OuyMgXmenc12KEd76uzvW3OG7ZOV39rfkrDRaGIRPzpaf9yf")'
                }}></div>
                <div>
                    <h3 className="text-[#0d171b] text-base font-bold leading-none">Alice Writer</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                        <div className="size-2 rounded-full bg-green-500"></div>
                        <span className="text-[#4c809a] text-xs">Online</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-1 text-[#4c809a]">
                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" title="Start Call">
                    <span className="material-symbols-outlined"><PhoneOutlinedIcon /></span>
                </button>
                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" title="Video Call">
                    <span className="material-symbols-outlined"><VideoCallOutlinedIcon /></span>
                </button>
                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" title="More Options">
                    <span className="material-symbols-outlined"><MoreVertOutlinedIcon /></span>
                </button>
            </div>
        </div>
    )
}

export default ChatHeader
